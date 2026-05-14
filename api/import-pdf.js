export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { pdfBase64, apiKey } = await req.json();
    if (!pdfBase64 || !apiKey) {
      return new Response(JSON.stringify({ error: 'Faltan parámetros' }), { status: 400 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: [
            { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } },
            { type: 'text', text: `Analiza este informe de proyectos mardetareas y extrae TODAS las tareas.
Responde SOLO con un JSON válido, sin texto extra, sin backticks:
{"projectName":"nombre del proyecto","tasks":[{"text":"nombre tarea","status":"completada|en-curso|bloqueado|backlog","priority":"alta|media|baja","completedAt":"YYYY-MM-DD o null","deadline":"YYYY-MM-DD o null","blockReason":"motivo o null"}]}
Reglas: completadas llevan status=completada y completedAt con fecha. Bloqueadas llevan blockReason. Extrae TODAS las tareas visibles.` }
          ]
        }]
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
