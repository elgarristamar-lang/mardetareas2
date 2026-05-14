export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { pdfBase64, apiKey } = req.body;

    // Debug: devolver info de la key para diagnosticar
    const keyInfo = {
      received: !!apiKey,
      length: apiKey ? apiKey.length : 0,
      first10: apiKey ? apiKey.substring(0, 10) : 'none',
      last4: apiKey ? apiKey.substring(apiKey.length - 4) : 'none',
      hasSpaces: apiKey ? /\s/.test(apiKey) : false,
    };

    if (!pdfBase64 || !apiKey) {
      return res.status(400).json({ error: 'Faltan parámetros', keyInfo });
    }

    const cleanKey = apiKey.trim().replace(/\s+/g, '');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': cleanKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: [
            { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } },
            { type: 'text', text: `Analiza este informe de proyectos mardetareas y extrae TODAS las tareas. Responde SOLO con un JSON válido, sin texto extra, sin backticks: {"projectName":"nombre del proyecto","tasks":[{"text":"nombre tarea","status":"completada|en-curso|bloqueado|backlog","priority":"alta|media|baja","completedAt":"YYYY-MM-DD o null","deadline":"YYYY-MM-DD o null","blockReason":"motivo o null"}]} Reglas: completadas llevan status=completada y completedAt con fecha. Bloqueadas llevan blockReason. Extrae TODAS las tareas visibles.` }
          ]
        }]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ ...data, keyInfo });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
