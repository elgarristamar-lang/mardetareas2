import { useState } from "react";

const COLORS = [
  { bg: "#FF6B6B", light: "#2A1515", accent: "#FF6B6B", text: "#FF9999" },
  { bg: "#4ECDC4", light: "#0F2422", accent: "#4ECDC4", text: "#7EEEE8" },
  { bg: "#FFD93D", light: "#262010", accent: "#FFD93D", text: "#FFE878" },
  { bg: "#6BCB77", light: "#0F2215", accent: "#6BCB77", text: "#96E09F" },
  { bg: "#C3A6FF", light: "#1A1228", accent: "#C3A6FF", text: "#D9C4FF" },
  { bg: "#FF9F43", light: "#251A0D", accent: "#FF9F43", text: "#FFBE7A" },
  { bg: "#74B9FF", light: "#0D1E35", accent: "#74B9FF", text: "#A8D4FF" },
  { bg: "#FD79A8", light: "#2A0D1A", accent: "#FD79A8", text: "#FFB3CE" },
];

const PRIORITY = {
  alta:  { label: "Alta",  color: "#FF6B6B", bg: "#2A1515", dot: "🔴" },
  media: { label: "Media", color: "#FFD93D", bg: "#262010", dot: "🟡" },
  baja:  { label: "Baja",  color: "#6BCB77", bg: "#0F2215", dot: "🟢" },
};

const MEETING_STATES = ["Pendiente", "En curso", "Completada", "Cancelada", "Bloqueada"];
const MEETING_STATE_COLORS = {
  "Pendiente":   { color: "#FFD93D", bg: "#262010" },
  "En curso":    { color: "#74B9FF", bg: "#0D1E35" },
  "Completada":  { color: "#6BCB77", bg: "#0F2215" },
  "Cancelada":   { color: "#FF6B6B", bg: "#2A1515" },
  "Bloqueada":   { color: "#FD79A8", bg: "#2A0D1A" },
};

const DAYS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const ICONS = ["💼","🏠","🎯","📚","🌱","🛒","🧠","🎨","💡","🔧","⚡","🤝","👥","📊","🗓️","👤"];

function genId() { return Math.random().toString(36).substr(2, 9); }
function today() { return new Date().toISOString().split("T")[0]; }
function fmt(d) {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("es-ES", { day:"2-digit", month:"short", year:"numeric" });
}
function deadlineStatus(deadline) {
  if (!deadline) return null;
  const now = new Date(); now.setHours(0,0,0,0);
  const dl = new Date(deadline + "T00:00:00");
  const diff = Math.round((dl - now) / 86400000);
  if (diff < 0) return { label: `Vencida hace ${Math.abs(diff)}d`, color: "#FF6B6B", urgent: true };
  if (diff === 0) return { label: "Vence hoy", color: "#FF9F43", urgent: true };
  if (diff <= 3) return { label: `${diff}d`, color: "#FFD93D", urgent: false };
  return { label: `${diff}d`, color: "#6BCB77", urgent: false };
}

function mkTask(text) {
  return { id: genId(), text, done: false, priority: "media", createdAt: today(), deadline: null, completedAt: null, jiraUrl: "", description: "", checklist: [], contacts: [] };
}

function mkMeeting() {
  return { id: genId(), meetingId: `M-${Date.now().toString(36).toUpperCase()}`, day: "Lunes", date: today(), state: "Pendiente", action: "", notes: "", done: false, createdAt: today(), completedAt: null };
}

const INITIAL = [
  { id:"c1", name:"Estratégica", icon:"🎯", colorIdx:0, type:"tasks", tasks: [
    "Informe mensual","Comité trimestral C-Level","Seguimiento estandarización",
    "LLICÀ: Volumen E2","LLICÀ: Pantallas cota 140","LLICÀ: Mejora gestión expediciones",
    "BD Mango: Integración WCS (TGW, Macrolet, Vanderlande)","BD Mango: Integración Microsoft Lists","BD Mango: Gobernanza datos",
    "Hackathon: 1 tipología pallet","Hackathon: Reducción tipología cajas","Hackathon: Optimización carga camiones",
  ].map(mkTask)},
  { id:"c2", name:"Transversal", icon:"🤝", colorIdx:2, type:"tasks", tasks: ["TSA España: Evaluar necesidad 4 salidas semanales"].map(mkTask)},
  { id:"c3", name:"Equipo", icon:"👥", colorIdx:3, type:"tasks", tasks: [
    "1:1 Con manager","1:1 Con subordinados",
    "Objetivos 2026: Definir OKRs","Objetivos 2026: Bajar a épicas","Objetivos 2026: Sprints en Jira",
    "Matriz Polivalencia: Equilibrio skills","Disponibilidad: Oficina / Teletrabajo / Vacaciones",
    "Shane – Automatización agendas","Pablo – Sobrestock 131","Pablo – Cajas cliente 131",
    "Iván – Reservas B2C","Iván – Post-mortem BF25","Pau – Entrega Grafanas",
  ].map(mkTask)},
  { id:"c4", name:"Data & Operación", icon:"⚡", colorIdx:5, type:"tasks", tasks: [
    "Influx + Grafana (real time)","PL/SQL producción","Databricks + Radar (histórico)",
    "Reporting producción no cubierto","Herramientas Python → Entorno IT",
  ].map(mkTask)},
  { id:"c5", name:"121 Ferran", icon:"👤", colorIdx:6, type:"meeting", tasks: [] },
  { id:"c6", name:"121 Equipo", icon:"🗓️", colorIdx:7, type:"meeting", tasks: [] },
];

function SectionLabel({ children }) {
  return <div style={{ color:"#3A3A4E", fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginBottom:7 }}>{children}</div>;
}

// ── Checklist ─────────────────────────────────────────────────
function Checklist({ items, color, onChange }) {
  const [newItem, setNewItem] = useState("");
  const done = items.filter(i=>i.done).length;
  const add = () => { if(!newItem.trim())return; onChange([...items,{id:genId(),text:newItem.trim(),done:false}]); setNewItem(""); };
  return (
    <div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7 }}>
        <SectionLabel>Checklist</SectionLabel>
        {items.length>0&&<span style={{ fontSize:10,color:done===items.length?"#6BCB77":"#3A3A4E" }}>{done}/{items.length}</span>}
      </div>
      {items.length>0&&<div style={{ height:3,background:"#1A1A24",borderRadius:99,marginBottom:9 }}><div style={{ height:3,borderRadius:99,background:done===items.length?"#6BCB77":color.accent,width:`${(done/items.length)*100}%`,transition:"width 0.3s" }}/></div>}
      {items.map(item=>(
        <div key={item.id} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:5 }}>
          <div onClick={()=>onChange(items.map(i=>i.id===item.id?{...i,done:!i.done}:i))} style={{ width:15,height:15,borderRadius:4,flexShrink:0,cursor:"pointer",border:item.done?"none":`1.5px solid ${color.accent}55`,background:item.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#000" }}>{item.done&&"✓"}</div>
          <input value={item.text} onChange={e=>onChange(items.map(i=>i.id===item.id?{...i,text:e.target.value}:i))} style={{ flex:1,background:"transparent",border:"none",outline:"none",color:item.done?"#3A3A4E":"#AAA",fontSize:12,textDecoration:item.done?"line-through":"none" }}/>
          <span onClick={()=>onChange(items.filter(i=>i.id!==item.id))} style={{ color:"#22222E",cursor:"pointer",fontSize:12 }}>✕</span>
        </div>
      ))}
      <div style={{ display:"flex",gap:6,marginTop:6 }}>
        <input value={newItem} onChange={e=>setNewItem(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Añadir punto..." style={{ flex:1,background:"#0A0A0F",border:"1px solid #22222E",borderRadius:7,padding:"5px 9px",color:"#888",fontSize:12,outline:"none" }}/>
        <button onClick={add} style={{ padding:"5px 11px",borderRadius:7,background:color.light,border:`1px solid ${color.accent}44`,color:color.text,fontSize:12,cursor:"pointer" }}>＋</button>
      </div>
    </div>
  );
}

// ── Contacts ──────────────────────────────────────────────────
function Contacts({ items=[], color, onChange }) {
  const [showForm,setShowForm]=useState(false);
  const [nn,setNn]=useState(""); const [ne,setNe]=useState(""); const [no,setNo]=useState("");
  const add=()=>{ if(!nn.trim()&&!ne.trim())return; onChange([...items,{id:genId(),name:nn.trim(),email:ne.trim(),note:no.trim()}]); setNn("");setNe("");setNo("");setShowForm(false); };
  return (
    <div>
      <SectionLabel>Contactos / Emails relacionados</SectionLabel>
      {items.map(c=>(
        <div key={c.id} style={{ display:"flex",alignItems:"flex-start",gap:9,padding:"8px 10px",borderRadius:8,background:"#0D0D14",border:"1px solid #1A1A24",marginBottom:6 }}>
          <div style={{ width:28,height:28,borderRadius:99,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:color.text,fontWeight:700,flexShrink:0 }}>{(c.name||c.email||"?")[0].toUpperCase()}</div>
          <div style={{ flex:1,minWidth:0 }}>
            <input value={c.name} onChange={e=>onChange(items.map(i=>i.id===c.id?{...i,name:e.target.value}:i))} placeholder="Nombre..." style={{ background:"transparent",border:"none",outline:"none",color:"#CCC",fontSize:12,fontWeight:600,width:"100%",marginBottom:2 }}/>
            <div style={{ display:"flex",alignItems:"center",gap:6 }}>
              <input value={c.email} onChange={e=>onChange(items.map(i=>i.id===c.id?{...i,email:e.target.value}:i))} placeholder="email@empresa.com" style={{ background:"transparent",border:"none",outline:"none",color:"#5E9EFF",fontSize:11,flex:1,minWidth:0 }}/>
              {c.email&&<a href={`mailto:${c.email}`} style={{ fontSize:10,color:color.text,background:color.light,padding:"1px 7px",borderRadius:4,textDecoration:"none",flexShrink:0 }}>✉ Enviar</a>}
            </div>
            <input value={c.note} onChange={e=>onChange(items.map(i=>i.id===c.id?{...i,note:e.target.value}:i))} placeholder="Nota..." style={{ background:"transparent",border:"none",outline:"none",color:"#3A3A4E",fontSize:11,width:"100%",marginTop:2 }}/>
          </div>
          <span onClick={()=>onChange(items.filter(i=>i.id!==c.id))} style={{ color:"#22222E",cursor:"pointer",fontSize:12,flexShrink:0,paddingTop:2 }}>✕</span>
        </div>
      ))}
      {showForm?(
        <div style={{ background:"#0D0D14",border:"1px solid #22222E",borderRadius:9,padding:10,display:"flex",flexDirection:"column",gap:7 }}>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
            <input autoFocus value={nn} onChange={e=>setNn(e.target.value)} placeholder="Nombre..." style={{ flex:1,minWidth:100,background:"#09090E",border:"1px solid #22222E",borderRadius:6,padding:"5px 8px",color:"#EEE",fontSize:12,outline:"none" }}/>
            <input value={ne} onChange={e=>setNe(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="email@empresa.com" style={{ flex:2,minWidth:150,background:"#09090E",border:"1px solid #22222E",borderRadius:6,padding:"5px 8px",color:"#5E9EFF",fontSize:12,outline:"none" }}/>
          </div>
          <input value={no} onChange={e=>setNo(e.target.value)} placeholder="Nota..." style={{ background:"#09090E",border:"1px solid #22222E",borderRadius:6,padding:"5px 8px",color:"#888",fontSize:11,outline:"none" }}/>
          <div style={{ display:"flex",gap:6 }}>
            <button onClick={add} style={{ flex:1,padding:"5px 0",borderRadius:7,background:color.bg,border:"none",color:"#000",fontWeight:800,fontSize:12,cursor:"pointer" }}>Añadir</button>
            <button onClick={()=>setShowForm(false)} style={{ flex:1,padding:"5px 0",borderRadius:7,background:"#22222E",border:"none",color:"#555",fontSize:12,cursor:"pointer" }}>Cancelar</button>
          </div>
        </div>
      ):(
        <button onClick={()=>setShowForm(true)} style={{ width:"100%",padding:"6px 0",borderRadius:8,border:"1.5px dashed #1E1E28",background:"transparent",color:"#2E2E3E",fontSize:11.5,cursor:"pointer" }}>＋ Añadir contacto</button>
      )}
    </div>
  );
}

// ── Normal Task Row ────────────────────────────────────────────
function TaskRow({ task, color, onToggle, onDelete, onUpdate }) {
  const [expanded,setExpanded]=useState(false);
  const [editingTitle,setEditingTitle]=useState(false);
  const dl = deadlineStatus(task.deadline);
  const p = PRIORITY[task.priority];
  const chkDone=(task.checklist||[]).filter(i=>i.done).length;
  const chkTotal=(task.checklist||[]).length;

  return (
    <div style={{ background:task.done?"#0E0E14":"#13131C",borderRadius:12,marginBottom:8,border:`1px solid ${task.done?"#18181F":(dl?.urgent?dl.color+"44":"#22222E")}`,opacity:task.done?0.5:1,transition:"all 0.2s" }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"11px 13px",cursor:task.done?"default":"pointer" }} onClick={()=>!task.done&&!editingTitle&&setExpanded(e=>!e)}>
        <div onClick={e=>{e.stopPropagation();onToggle();}} style={{ width:19,height:19,borderRadius:99,flexShrink:0,cursor:"pointer",border:task.done?"none":`2px solid ${color.accent}`,background:task.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",transition:"all 0.2s" }}>{task.done&&"✓"}</div>
        <span style={{ fontSize:10,flexShrink:0 }}>{p.dot}</span>
        {editingTitle&&!task.done?(
          <input autoFocus value={task.text} onChange={e=>onUpdate({text:e.target.value})} onBlur={()=>setEditingTitle(false)} onKeyDown={e=>{if(e.key==="Enter"||e.key==="Escape")setEditingTitle(false);}} onClick={e=>e.stopPropagation()} style={{ flex:1,background:"#0A0A0F",border:`1px solid ${color.accent}66`,borderRadius:6,padding:"2px 8px",color:"#EEE",fontSize:13.5,outline:"none" }}/>
        ):(
          <span onDoubleClick={e=>{e.stopPropagation();if(!task.done)setEditingTitle(true);}} title={task.done?"":"Doble clic para editar"} style={{ flex:1,fontSize:13.5,color:task.done?"#444":"#D8D8E8",textDecoration:task.done?"line-through":"none",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{task.text}</span>
        )}
        {!task.done&&!editingTitle&&<span onClick={e=>{e.stopPropagation();setEditingTitle(true);}} style={{ color:"#2A2A38",cursor:"pointer",fontSize:11,flexShrink:0 }} title="Editar nombre">✎</span>}
        {task.jiraUrl&&!task.done&&<a href={task.jiraUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{ fontSize:10,fontWeight:700,color:"#5E9EFF",background:"#0D1E35",padding:"2px 7px",borderRadius:5,border:"1px solid #1A3A6A",textDecoration:"none",flexShrink:0 }}>JIRA ↗</a>}
        {(task.contacts||[]).length>0&&!task.done&&<span style={{ fontSize:10,color:"#888",flexShrink:0 }}>👤 {task.contacts.length}</span>}
        {chkTotal>0&&!task.done&&<span style={{ fontSize:10,color:chkDone===chkTotal?"#6BCB77":"#3A3A4E",flexShrink:0 }}>☑ {chkDone}/{chkTotal}</span>}
        {dl&&!task.done&&<span style={{ fontSize:11,fontWeight:700,color:dl.color,background:dl.color+"22",padding:"2px 8px",borderRadius:99,flexShrink:0 }}>{dl.label}</span>}
        {!task.done&&<span style={{ color:"#333",fontSize:11,flexShrink:0,transform:expanded?"rotate(180deg)":"none",transition:"transform 0.2s" }}>▾</span>}
        <span onClick={e=>{e.stopPropagation();onDelete();}} style={{ color:"#2E2E3E",cursor:"pointer",fontSize:13,flexShrink:0 }}>✕</span>
      </div>
      {expanded&&!task.done&&(
        <div style={{ borderTop:"1px solid #1A1A24",padding:14 }}>
          <div style={{ display:"flex",gap:12,flexWrap:"wrap",marginBottom:14 }}>
            <div style={{ flex:1,minWidth:140 }}>
              <SectionLabel>Prioridad</SectionLabel>
              <div style={{ display:"flex",gap:5 }}>
                {Object.entries(PRIORITY).map(([k,v])=>(<button key={k} onClick={()=>onUpdate({priority:k})} style={{ padding:"3px 10px",borderRadius:99,fontSize:11.5,cursor:"pointer",border:`1.5px solid ${task.priority===k?v.color:"#22222E"}`,background:task.priority===k?v.bg:"transparent",color:task.priority===k?v.color:"#444",fontWeight:task.priority===k?700:400 }}>{v.label}</button>))}
              </div>
            </div>
            <div style={{ flex:1,minWidth:150 }}>
              <SectionLabel>Deadline</SectionLabel>
              <input type="date" value={task.deadline||""} onChange={e=>onUpdate({deadline:e.target.value||null})} style={{ background:"#0A0A0F",border:"1px solid #22222E",borderRadius:7,padding:"5px 9px",color:"#AAA",fontSize:12,outline:"none",colorScheme:"dark" }}/>
            </div>
          </div>
          <div style={{ marginBottom:14 }}>
            <SectionLabel>Ticket Jira</SectionLabel>
            <div style={{ display:"flex",gap:7,alignItems:"center" }}>
              <input value={task.jiraUrl||""} onChange={e=>onUpdate({jiraUrl:e.target.value})} placeholder="https://jira.empresa.com/browse/PROJ-123" style={{ flex:1,background:"#0A0A0F",border:"1px solid #22222E",borderRadius:7,padding:"6px 10px",color:"#AAA",fontSize:12,outline:"none",fontFamily:"monospace" }}/>
              {task.jiraUrl&&<a href={task.jiraUrl} target="_blank" rel="noreferrer" style={{ padding:"6px 12px",borderRadius:7,background:"#0D1E35",border:"1px solid #1A3A6A",color:"#5E9EFF",fontSize:12,textDecoration:"none",fontWeight:700,flexShrink:0 }}>Abrir ↗</a>}
            </div>
          </div>
          <div style={{ marginBottom:14 }}>
            <SectionLabel>Descripción</SectionLabel>
            <textarea value={task.description||""} onChange={e=>onUpdate({description:e.target.value})} placeholder="Añade contexto, notas o detalles..." rows={3} style={{ width:"100%",boxSizing:"border-box",background:"#0A0A0F",border:"1px solid #22222E",borderRadius:7,padding:"8px 10px",color:"#AAA",fontSize:12,outline:"none",resize:"vertical",lineHeight:1.6,fontFamily:"inherit" }}/>
          </div>
          <div style={{ marginBottom:14 }}><Checklist items={task.checklist||[]} color={color} onChange={checklist=>onUpdate({checklist})}/></div>
          <div style={{ marginBottom:12 }}><Contacts items={task.contacts||[]} color={color} onChange={contacts=>onUpdate({contacts})}/></div>
          <div style={{ display:"flex",gap:16,flexWrap:"wrap",paddingTop:10,borderTop:"1px solid #1A1A24" }}>
            <span style={{ color:"#2E2E3E",fontSize:10 }}>📅 Creada: <span style={{ color:"#444" }}>{fmt(task.createdAt)}</span></span>
            {task.deadline&&<span style={{ color:"#2E2E3E",fontSize:10 }}>⏱ Deadline: <span style={{ color:"#444" }}>{fmt(task.deadline)}</span></span>}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Meeting Row (121) ─────────────────────────────────────────
function MeetingRow({ meeting, color, onUpdate, onDelete, onToggle }) {
  const [expanded,setExpanded]=useState(false);
  const sc = MEETING_STATE_COLORS[meeting.state]||MEETING_STATE_COLORS["Pendiente"];

  return (
    <div style={{ background:meeting.done?"#0E0E14":"#13131C",borderRadius:12,marginBottom:8,border:`1px solid ${meeting.done?"#18181F":"#22222E"}`,opacity:meeting.done?0.55:1,transition:"all 0.2s" }}>
      {/* Header */}
      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"11px 13px",cursor:"pointer" }} onClick={()=>!meeting.done&&setExpanded(e=>!e)}>
        <div onClick={e=>{e.stopPropagation();onToggle();}} style={{ width:19,height:19,borderRadius:99,flexShrink:0,cursor:"pointer",border:meeting.done?"none":`2px solid ${color.accent}`,background:meeting.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",transition:"all 0.2s" }}>{meeting.done&&"✓"}</div>

        {/* ID badge */}
        <span style={{ fontSize:10,fontFamily:"monospace",color:color.text,background:color.light,padding:"1px 6px",borderRadius:4,flexShrink:0,letterSpacing:0.5 }}>{meeting.meetingId}</span>

        {/* Action summary */}
        <span style={{ flex:1,fontSize:13,color:meeting.done?"#444":"#D8D8E8",textDecoration:meeting.done?"line-through":"none",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>
          {meeting.action||<span style={{ color:"#2E2E3E",fontStyle:"italic" }}>Sin acción acordada</span>}
        </span>

        {/* Day badge */}
        <span style={{ fontSize:10,color:"#888",background:"#18181F",padding:"2px 7px",borderRadius:4,flexShrink:0 }}>{meeting.day}</span>

        {/* Date */}
        <span style={{ fontSize:10,color:"#555",flexShrink:0 }}>{fmt(meeting.date)}</span>

        {/* State badge */}
        <span style={{ fontSize:10,fontWeight:700,color:sc.color,background:sc.bg,padding:"2px 8px",borderRadius:99,flexShrink:0 }}>{meeting.state}</span>

        {!meeting.done&&<span style={{ color:"#333",fontSize:11,flexShrink:0,transform:expanded?"rotate(180deg)":"none",transition:"transform 0.2s" }}>▾</span>}
        <span onClick={e=>{e.stopPropagation();onDelete();}} style={{ color:"#2E2E3E",cursor:"pointer",fontSize:13,flexShrink:0 }}>✕</span>
      </div>

      {/* Expanded */}
      {expanded&&!meeting.done&&(
        <div style={{ borderTop:"1px solid #1A1A24",padding:14,display:"flex",flexDirection:"column",gap:12 }}>
          <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
            {/* ID (readonly) */}
            <div style={{ flex:1,minWidth:120 }}>
              <SectionLabel>ID reunión</SectionLabel>
              <input value={meeting.meetingId} onChange={e=>onUpdate({meetingId:e.target.value})} style={{ background:"#0A0A0F",border:"1px solid #22222E",borderRadius:7,padding:"6px 10px",color:color.text,fontSize:12,outline:"none",fontFamily:"monospace",width:"100%",boxSizing:"border-box" }}/>
            </div>
            {/* Day */}
            <div style={{ flex:1,minWidth:120 }}>
              <SectionLabel>Día de la semana</SectionLabel>
              <select value={meeting.day} onChange={e=>onUpdate({day:e.target.value})} style={{ background:"#0A0A0F",border:"1px solid #22222E",borderRadius:7,padding:"6px 10px",color:"#AAA",fontSize:12,outline:"none",width:"100%",boxSizing:"border-box",colorScheme:"dark" }}>
                {DAYS.map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            {/* Date */}
            <div style={{ flex:1,minWidth:140 }}>
              <SectionLabel>Fecha de reunión</SectionLabel>
              <input type="date" value={meeting.date||""} onChange={e=>onUpdate({date:e.target.value})} style={{ background:"#0A0A0F",border:"1px solid #22222E",borderRadius:7,padding:"6px 10px",color:"#AAA",fontSize:12,outline:"none",width:"100%",boxSizing:"border-box",colorScheme:"dark" }}/>
            </div>
          </div>

          {/* State */}
          <div>
            <SectionLabel>Estado</SectionLabel>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
              {MEETING_STATES.map(s=>{
                const sc2=MEETING_STATE_COLORS[s];
                return (<button key={s} onClick={()=>onUpdate({state:s})} style={{ padding:"4px 12px",borderRadius:99,fontSize:12,cursor:"pointer",border:`1.5px solid ${meeting.state===s?sc2.color:"#22222E"}`,background:meeting.state===s?sc2.bg:"transparent",color:meeting.state===s?sc2.color:"#444",fontWeight:meeting.state===s?700:400 }}>{s}</button>);
              })}
            </div>
          </div>

          {/* Action */}
          <div>
            <SectionLabel>Acción acordada</SectionLabel>
            <textarea value={meeting.action||""} onChange={e=>onUpdate({action:e.target.value})} placeholder="¿Qué se acordó hacer en esta reunión?" rows={3} style={{ width:"100%",boxSizing:"border-box",background:"#0A0A0F",border:"1px solid #22222E",borderRadius:7,padding:"8px 10px",color:"#CCC",fontSize:13,outline:"none",resize:"vertical",lineHeight:1.6,fontFamily:"inherit" }}/>
          </div>

          {/* Notes */}
          <div>
            <SectionLabel>Notas adicionales</SectionLabel>
            <textarea value={meeting.notes||""} onChange={e=>onUpdate({notes:e.target.value})} placeholder="Contexto, observaciones, próximos pasos..." rows={2} style={{ width:"100%",boxSizing:"border-box",background:"#0A0A0F",border:"1px solid #22222E",borderRadius:7,padding:"8px 10px",color:"#AAA",fontSize:12,outline:"none",resize:"vertical",lineHeight:1.6,fontFamily:"inherit" }}/>
          </div>

          {/* Meta */}
          <div style={{ display:"flex",gap:16,paddingTop:10,borderTop:"1px solid #1A1A24" }}>
            <span style={{ color:"#2E2E3E",fontSize:10 }}>📅 Creada: <span style={{ color:"#444" }}>{fmt(meeting.createdAt)}</span></span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Excel export ──────────────────────────────────────────────
function exportToExcel(doneTasks) {
  // Build CSV content
  const headers = ["Tarea","Categoría","Fecha Inicio","Fecha Fin","Deadline","Prioridad"];
  const rows = doneTasks.map(t => [
    `"${(t.text||"").replace(/"/g,'""')}"`,
    `"${(t.catName||"").replace(/"/g,'""')}"`,
    t.createdAt||"",
    t.completedAt||"",
    t.deadline||"",
    t.priority||"",
  ]);

  const csv = [headers.join(","), ...rows.map(r=>r.join(","))].join("\n");
  const BOM = "\uFEFF"; // UTF-8 BOM for Excel
  const blob = new Blob([BOM + csv], { type:"text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `historial_tareas_${today()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Main App ───────────────────────────────────────────────────
export default function App() {
  const [categories, setCategories] = useState(INITIAL);
  const [activeTab, setActiveTab] = useState("overview");
  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("📊");
  const [newCatColor, setNewCatColor] = useState(0);
  const [showNewCat, setShowNewCat] = useState(false);
  const [newText, setNewText] = useState({});
  const [newDeadline, setNewDeadline] = useState({});
  const [newPriority, setNewPriority] = useState({});
  const [sortBy, setSortBy] = useState("priority");

  const allTasks = categories.flatMap(c => c.tasks.map(t => ({...t, catId:c.id, catName:c.name, catIcon:c.icon, catColor:COLORS[c.colorIdx], catType:c.type})));
  const doneTasks = allTasks.filter(t=>t.done).sort((a,b)=>(b.completedAt||"").localeCompare(a.completedAt||""));
  const totalAll = allTasks.length;
  const totalDone = doneTasks.length;

  const updateTask = (catId, taskId, patch) =>
    setCategories(cs=>cs.map(c=>c.id!==catId?c:{...c,tasks:c.tasks.map(t=>t.id!==taskId?t:{...t,...patch})}));

  const toggleTask = (catId, taskId) =>
    setCategories(cs=>cs.map(c=>c.id!==catId?c:{...c,tasks:c.tasks.map(t=>t.id!==taskId?t:{...t,done:!t.done,completedAt:!t.done?today():null})}));

  const deleteTask = (catId, taskId) =>
    setCategories(cs=>cs.map(c=>c.id!==catId?c:{...c,tasks:c.tasks.filter(t=>t.id!==taskId)}));

  const addTask = (catId) => {
    const text = newText[catId]?.trim();
    if (!text) return;
    setCategories(cs=>cs.map(c=>c.id!==catId?c:{...c,tasks:[...c.tasks,{id:genId(),text,done:false,priority:newPriority[catId]||"media",createdAt:today(),deadline:newDeadline[catId]||null,completedAt:null,jiraUrl:"",description:"",checklist:[],contacts:[]}]}));
    setNewText(p=>({...p,[catId]:""}));
    setNewDeadline(p=>({...p,[catId]:""}));
  };

  const addMeeting = (catId) => {
    setCategories(cs=>cs.map(c=>c.id!==catId?c:{...c,tasks:[mkMeeting(),...c.tasks]}));
  };

  const addCategory = () => {
    if (!newCatName.trim()) return;
    setCategories(cs=>[...cs,{id:genId(),name:newCatName.trim(),icon:newCatIcon,colorIdx:newCatColor,type:"tasks",tasks:[]}]);
    setNewCatName(""); setShowNewCat(false);
  };

  const deleteCategory = (catId) => {
    setCategories(cs=>cs.filter(c=>c.id!==catId));
    if (activeTab===catId) setActiveTab("overview");
  };

  const PORD = {alta:0,media:1,baja:2};
  const sortTasks = (tasks) => {
    const pending = [...tasks.filter(t=>!t.done)].sort((a,b)=>{
      if(sortBy==="priority") return PORD[a.priority]-PORD[b.priority];
      if(sortBy==="deadline"){if(!a.deadline&&!b.deadline)return 0;if(!a.deadline)return 1;if(!b.deadline)return -1;return a.deadline.localeCompare(b.deadline);}
      return(a.createdAt||"").localeCompare(b.createdAt||"");
    });
    return [...pending,...tasks.filter(t=>t.done)];
  };

  const selectedCat = categories.find(c=>c.id===activeTab);

  return (
    <div style={{ minHeight:"100vh",background:"#09090E",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",display:"flex",flexDirection:"column" }}>
      {/* Header */}
      <div style={{ padding:"20px 26px 16px",borderBottom:"1px solid #14141C",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
        <div>
          <h1 style={{ margin:0,fontSize:21,fontWeight:800,color:"#EEEEF8",letterSpacing:-0.5 }}>Panel de Tareas</h1>
          <p style={{ margin:"3px 0 0",color:"#3A3A4E",fontSize:11 }}>{totalAll-totalDone} pendientes · {totalDone} completadas</p>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ height:4,width:130,background:"#18181F",borderRadius:99 }}>
            <div style={{ height:4,borderRadius:99,transition:"width 0.5s",width:totalAll?`${(totalDone/totalAll)*100}%`:"0%",background:"linear-gradient(90deg,#4ECDC4,#6BCB77)" }}/>
          </div>
          <span style={{ color:"#4ECDC4",fontWeight:800,fontSize:12 }}>{totalAll?Math.round((totalDone/totalAll)*100):0}%</span>
        </div>
      </div>

      <div style={{ display:"flex",flex:1,overflow:"hidden" }}>
        {/* SIDEBAR */}
        <div style={{ width:215,minWidth:215,borderRight:"1px solid #14141C",display:"flex",flexDirection:"column",overflowY:"auto" }}>
          <div style={{ padding:"16px 10px 10px" }}>
            <p style={{ margin:"0 0 8px 6px",color:"#2E2E3E",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase" }}>Navegación</p>
            {[{id:"overview",label:"Vista General",icon:"◫"},{id:"history",label:"Historial",icon:"✓"}].map(item=>{
              const isActive=activeTab===item.id;
              return (<button key={item.id} onClick={()=>setActiveTab(item.id)} style={{ width:"100%",display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:10,border:"none",cursor:"pointer",background:isActive?"#1A1A24":"transparent",color:isActive?"#CCC":"#3A3A4E",fontSize:12.5,fontWeight:isActive?700:400,marginBottom:2,textAlign:"left",borderLeft:isActive?"2px solid #4ECDC4":"2px solid transparent",transition:"all 0.15s" }}>
                <span style={{ fontSize:12 }}>{item.icon}</span>{item.label}
                {item.id==="history"&&totalDone>0&&<span style={{ marginLeft:"auto",background:"#1E2E1E",color:"#6BCB77",fontSize:10,fontWeight:800,borderRadius:99,padding:"1px 6px" }}>{totalDone}</span>}
              </button>);
            })}
            <div style={{ height:1,background:"#14141C",margin:"10px 4px" }}/>
            <p style={{ margin:"0 0 8px 6px",color:"#2E2E3E",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase" }}>Categorías</p>
            {categories.map(cat=>{
              const color=COLORS[cat.colorIdx];
              const pending=cat.tasks.filter(t=>!t.done).length;
              const isActive=activeTab===cat.id;
              return (
                <div key={cat.id} style={{ display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:10,cursor:"pointer",background:isActive?color.light:"transparent",borderLeft:isActive?`2px solid ${color.accent}`:"2px solid transparent",marginBottom:2,transition:"all 0.15s",position:"relative" }}
                  onClick={()=>setActiveTab(cat.id)}
                  onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background="#14141C";}}
                  onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background="transparent";}}>
                  <span style={{ fontSize:16 }}>{cat.icon}</span>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontSize:12.5,fontWeight:isActive?700:400,color:isActive?color.text:"#888",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{cat.name}</div>
                    <div style={{ fontSize:10,color:isActive?color.text+"88":"#2E2E3E" }}>{pending} pendiente{pending!==1?"s":""}</div>
                  </div>
                  {pending>0&&<span style={{ background:color.accent,color:"#000",fontSize:10,fontWeight:800,borderRadius:99,padding:"1px 6px",flexShrink:0 }}>{pending}</span>}
                  <span onClick={e=>{e.stopPropagation();deleteCategory(cat.id);}} style={{ position:"absolute",top:5,right:5,color:"#22222E",cursor:"pointer",fontSize:12,opacity:0,transition:"opacity 0.15s" }} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0"}>✕</span>
                </div>
              );
            })}
            {!showNewCat?(
              <button onClick={()=>setShowNewCat(true)} style={{ width:"100%",marginTop:6,padding:"8px 10px",borderRadius:10,border:"1.5px dashed #1E1E28",background:"transparent",color:"#2E2E3E",fontSize:12,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:8 }}>
                <span style={{ fontSize:14 }}>＋</span> Nueva categoría
              </button>
            ):(
              <div style={{ background:"#14141C",borderRadius:12,padding:11,border:"1px solid #22222E",marginTop:6,display:"flex",flexDirection:"column",gap:8 }}>
                <div style={{ display:"flex",gap:4,flexWrap:"wrap" }}>{ICONS.map(ic=><span key={ic} onClick={()=>setNewCatIcon(ic)} style={{ fontSize:16,cursor:"pointer",padding:3,borderRadius:6,background:newCatIcon===ic?"#22222E":"transparent" }}>{ic}</span>)}</div>
                <input autoFocus value={newCatName} onChange={e=>setNewCatName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCategory()} placeholder="Nombre..." style={{ background:"#09090E",border:"1px solid #22222E",borderRadius:8,padding:"6px 9px",color:"#EEE",fontSize:12,outline:"none" }}/>
                <div style={{ display:"flex",gap:5 }}>{COLORS.map((c,i)=><div key={i} onClick={()=>setNewCatColor(i)} style={{ width:18,height:18,borderRadius:99,background:c.bg,cursor:"pointer",border:newCatColor===i?"2px solid #FFF":"2px solid transparent" }}/>)}</div>
                <div style={{ display:"flex",gap:6 }}>
                  <button onClick={addCategory} style={{ flex:1,padding:"6px 0",borderRadius:8,background:COLORS[newCatColor].bg,border:"none",color:"#000",fontWeight:800,fontSize:12,cursor:"pointer" }}>Crear</button>
                  <button onClick={()=>setShowNewCat(false)} style={{ flex:1,padding:"6px 0",borderRadius:8,background:"#22222E",border:"none",color:"#555",fontSize:12,cursor:"pointer" }}>✕</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex:1,overflowY:"auto",padding:"24px 28px" }}>

          {/* OVERVIEW */}
          {activeTab==="overview"&&(
            <div>
              <h2 style={{ margin:"0 0 18px",color:"#EEF",fontSize:17,fontWeight:800 }}>Vista General</h2>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:12,marginBottom:28 }}>
                {categories.map(cat=>{
                  const color=COLORS[cat.colorIdx];
                  const pending=cat.tasks.filter(t=>!t.done);
                  const done=cat.tasks.filter(t=>t.done).length;
                  const total=cat.tasks.length;
                  const urgent=pending.filter(t=>deadlineStatus(t.deadline)?.urgent).length;
                  const hi=pending.filter(t=>t.priority==="alta").length;
                  return (
                    <div key={cat.id} onClick={()=>setActiveTab(cat.id)} style={{ background:"#11111A",border:"1px solid #1A1A24",borderRadius:14,padding:15,cursor:"pointer",transition:"all 0.18s",position:"relative" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=color.accent+"55";e.currentTarget.style.transform="translateY(-2px)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="#1A1A24";e.currentTarget.style.transform="none";}}>
                      {cat.type==="meeting"&&<span style={{ position:"absolute",top:10,right:10,fontSize:9,color:color.text,background:color.light,padding:"1px 6px",borderRadius:4,letterSpacing:0.5 }}>1:1</span>}
                      <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:11 }}>
                        <div style={{ width:36,height:36,borderRadius:10,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>{cat.icon}</div>
                        <div>
                          <div style={{ color:"#EEE",fontWeight:700,fontSize:13 }}>{cat.name}</div>
                          <div style={{ color:"#3A3A4E",fontSize:11 }}>{total} {cat.type==="meeting"?"reuniones":"tareas"}</div>
                        </div>
                      </div>
                      <div style={{ height:3,background:"#18181F",borderRadius:99,marginBottom:7 }}><div style={{ height:3,borderRadius:99,background:color.bg,width:total?`${(done/total)*100}%`:"0%",transition:"width 0.4s" }}/></div>
                      <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                        <span style={{ color:"#3A3A4E",fontSize:11 }}>{done}/{total} hechas</span>
                        {urgent>0&&<span style={{ color:"#FF6B6B",fontSize:11,fontWeight:700 }}>⚠ {urgent} urgente{urgent!==1?"s":""}</span>}
                        {hi>0&&<span style={{ color:"#FF9F43",fontSize:11 }}>🔴 {hi}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <h3 style={{ color:"#555",fontSize:12,fontWeight:700,marginBottom:10,marginTop:0 }}>Próximas a vencer</h3>
              {(()=>{
                const up=allTasks.filter(t=>!t.done&&t.deadline).sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,8);
                if(!up.length) return <p style={{ color:"#2E2E3E",fontSize:13 }}>Sin deadlines asignados todavía.</p>;
                return up.map(t=>{
                  const dl=deadlineStatus(t.deadline);
                  return (<div key={t.id} onClick={()=>setActiveTab(t.catId)} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:9,marginBottom:5,background:"#11111A",border:"1px solid #1A1A24",cursor:"pointer",transition:"border-color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.borderColor="#2A2A38"} onMouseLeave={e=>e.currentTarget.style.borderColor="#1A1A24"}>
                    <span style={{ fontSize:14 }}>{t.catIcon}</span>
                    <span style={{ flex:1,color:"#BBB",fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{t.text||t.action}</span>
                    {t.jiraUrl&&<span style={{ fontSize:10,color:"#5E9EFF",background:"#0D1E35",padding:"1px 6px",borderRadius:4,border:"1px solid #1A3A6A",flexShrink:0 }}>JIRA</span>}
                    <span style={{ fontSize:10,color:"#3A3A4E",flexShrink:0 }}>{t.catName}</span>
                    {dl&&<span style={{ fontSize:11,fontWeight:700,color:dl.color,background:dl.color+"22",padding:"2px 7px",borderRadius:99,flexShrink:0 }}>{dl.label}</span>}
                  </div>);
                });
              })()}
            </div>
          )}

          {/* CATEGORY (tasks) */}
          {selectedCat&&selectedCat.type==="tasks"&&(()=>{
            const cat=selectedCat; const color=COLORS[cat.colorIdx]; const sorted=sortTasks(cat.tasks);
            return (
              <div>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                    <div style={{ width:42,height:42,borderRadius:11,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21 }}>{cat.icon}</div>
                    <div>
                      <h2 style={{ margin:0,color:"#EEF",fontSize:19,fontWeight:800 }}>{cat.name}</h2>
                      <span style={{ color:"#3A3A4E",fontSize:11 }}>{cat.tasks.filter(t=>!t.done).length} pendientes · {cat.tasks.filter(t=>t.done).length} completadas</span>
                    </div>
                  </div>
                  <div style={{ display:"flex",gap:5 }}>
                    {[["priority","Prioridad"],["deadline","Deadline"],["createdAt","Creación"]].map(([k,l])=>(<button key={k} onClick={()=>setSortBy(k)} style={{ padding:"4px 11px",borderRadius:99,fontSize:11,cursor:"pointer",border:"none",background:sortBy===k?color.light:"#14141C",color:sortBy===k?color.text:"#3A3A4E",fontWeight:sortBy===k?700:400 }}>{l}</button>))}
                  </div>
                </div>
                <div style={{ background:"#11111A",borderRadius:12,padding:13,marginBottom:18,border:"1px solid #1A1A24" }}>
                  <div style={{ display:"flex",gap:7,marginBottom:8 }}>
                    <input value={newText[cat.id]||""} onChange={e=>setNewText(p=>({...p,[cat.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addTask(cat.id)} placeholder="Nueva tarea..." style={{ flex:1,background:"#09090E",border:"1px solid #22222E",borderRadius:8,padding:"8px 11px",color:"#EEE",fontSize:13,outline:"none" }}/>
                    <button onClick={()=>addTask(cat.id)} style={{ padding:"8px 15px",borderRadius:8,background:color.bg,border:"none",color:"#000",fontWeight:800,fontSize:13,cursor:"pointer" }}>＋</button>
                  </div>
                  <div style={{ display:"flex",gap:7,flexWrap:"wrap",alignItems:"center" }}>
                    <input type="date" value={newDeadline[cat.id]||""} onChange={e=>setNewDeadline(p=>({...p,[cat.id]:e.target.value}))} style={{ background:"#09090E",border:"1px solid #22222E",borderRadius:7,padding:"4px 8px",color:"#666",fontSize:11.5,outline:"none",colorScheme:"dark" }}/>
                    {Object.entries(PRIORITY).map(([k,v])=>(<button key={k} onClick={()=>setNewPriority(p=>({...p,[cat.id]:k}))} style={{ padding:"3px 10px",borderRadius:99,fontSize:11.5,cursor:"pointer",border:`1.5px solid ${(newPriority[cat.id]||"media")===k?v.color:"#22222E"}`,background:(newPriority[cat.id]||"media")===k?v.bg:"transparent",color:(newPriority[cat.id]||"media")===k?v.color:"#3A3A4E",fontWeight:(newPriority[cat.id]||"media")===k?700:400 }}>{v.dot} {v.label}</button>))}
                  </div>
                </div>
                {sorted.length===0&&<p style={{ color:"#2E2E3E",fontSize:13,textAlign:"center",paddingTop:28 }}>Sin tareas aún 🚀</p>}
                {sorted.map(task=>(<TaskRow key={task.id} task={task} color={color} onToggle={()=>toggleTask(cat.id,task.id)} onDelete={()=>deleteTask(cat.id,task.id)} onUpdate={patch=>updateTask(cat.id,task.id,patch)}/>))}
              </div>
            );
          })()}

          {/* CATEGORY (meeting 121) */}
          {selectedCat&&selectedCat.type==="meeting"&&(()=>{
            const cat=selectedCat; const color=COLORS[cat.colorIdx];
            const pending=cat.tasks.filter(t=>!t.done);
            const done=cat.tasks.filter(t=>t.done);
            return (
              <div>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                    <div style={{ width:42,height:42,borderRadius:11,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21 }}>{cat.icon}</div>
                    <div>
                      <h2 style={{ margin:0,color:"#EEF",fontSize:19,fontWeight:800 }}>{cat.name}</h2>
                      <span style={{ color:"#3A3A4E",fontSize:11 }}>{pending.length} activas · {done.length} cerradas</span>
                    </div>
                  </div>
                  <button onClick={()=>addMeeting(cat.id)} style={{ padding:"9px 18px",borderRadius:10,background:color.bg,border:"none",color:"#000",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:7 }}>
                    ＋ Nueva reunión
                  </button>
                </div>

                {/* Column headers */}
                {cat.tasks.length>0&&(
                  <div style={{ display:"flex",alignItems:"center",gap:10,padding:"5px 13px",marginBottom:4 }}>
                    <div style={{ width:19,flexShrink:0 }}/>
                    <span style={{ width:80,fontSize:10,color:"#2E2E3E",fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0 }}>ID</span>
                    <span style={{ flex:1,fontSize:10,color:"#2E2E3E",fontWeight:700,letterSpacing:1,textTransform:"uppercase" }}>Acción acordada</span>
                    <span style={{ width:75,fontSize:10,color:"#2E2E3E",fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0,textAlign:"center" }}>Día</span>
                    <span style={{ width:95,fontSize:10,color:"#2E2E3E",fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0,textAlign:"center" }}>Fecha</span>
                    <span style={{ width:90,fontSize:10,color:"#2E2E3E",fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0,textAlign:"center" }}>Estado</span>
                    <div style={{ width:30,flexShrink:0 }}/>
                  </div>
                )}

                {cat.tasks.length===0&&<p style={{ color:"#2E2E3E",fontSize:13,textAlign:"center",paddingTop:28 }}>Sin reuniones. Pulsa "Nueva reunión" para empezar 🗓️</p>}
                {[...pending,...done].map(meeting=>(<MeetingRow key={meeting.id} meeting={meeting} color={color} onUpdate={patch=>updateTask(cat.id,meeting.id,patch)} onDelete={()=>deleteTask(cat.id,meeting.id)} onToggle={()=>toggleTask(cat.id,meeting.id)}/>))}
              </div>
            );
          })()}

          {/* HISTORY */}
          {activeTab==="history"&&(
            <div>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5,flexWrap:"wrap",gap:10 }}>
                <div>
                  <h2 style={{ color:"#EEF",fontSize:19,fontWeight:800,margin:0 }}>Historial</h2>
                  <p style={{ color:"#3A3A4E",fontSize:11,margin:"4px 0 0" }}>{totalDone} tareas finalizadas</p>
                </div>
                {doneTasks.length>0&&(
                  <button onClick={()=>exportToExcel(doneTasks)}
                    style={{ display:"flex",alignItems:"center",gap:7,padding:"9px 16px",borderRadius:10,background:"#0F2215",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:13,fontWeight:700,cursor:"pointer" }}>
                    ⬇ Exportar Excel
                  </button>
                )}
              </div>
              <p style={{ color:"#2E2E3E",fontSize:11,marginBottom:20 }}>El archivo descargado se puede abrir directamente con Excel.</p>

              {doneTasks.length===0&&<p style={{ color:"#2E2E3E",fontSize:13,textAlign:"center",paddingTop:36 }}>Aún no hay tareas completadas.</p>}
              {doneTasks.map(t=>{
                const color=t.catColor;
                const chkDone=(t.checklist||[]).filter(i=>i.done).length;
                const chkTotal=(t.checklist||[]).length;
                return (
                  <div key={t.id} style={{ display:"flex",alignItems:"flex-start",gap:12,background:"#11111A",borderRadius:11,padding:"12px 14px",marginBottom:7,border:"1px solid #18181F" }}>
                    <div style={{ width:30,height:30,borderRadius:8,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0 }}>{t.catIcon}</div>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ color:"#555",fontSize:13,textDecoration:"line-through",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{t.text||t.action}</div>
                      <div style={{ display:"flex",gap:8,marginTop:5,flexWrap:"wrap",alignItems:"center" }}>
                        <span style={{ color:color.text,fontSize:10,background:color.light,padding:"1px 7px",borderRadius:99 }}>{t.catName}</span>
                        <span style={{ color:"#2E2E3E",fontSize:10 }}>📅 <span style={{ color:"#444" }}>{fmt(t.createdAt)}</span></span>
                        {t.completedAt&&<span style={{ color:"#2E4A32",fontSize:10 }}>✓ <span style={{ color:"#4A8C55" }}>{fmt(t.completedAt)}</span></span>}
                        {t.deadline&&<span style={{ color:"#2E2E3E",fontSize:10 }}>⏱ <span style={{ color:"#444" }}>{fmt(t.deadline)}</span></span>}
                        {t.jiraUrl&&<a href={t.jiraUrl} target="_blank" rel="noreferrer" style={{ color:"#5E9EFF",fontSize:10,background:"#0D1E35",padding:"1px 6px",borderRadius:4,border:"1px solid #1A3A6A",textDecoration:"none" }}>JIRA ↗</a>}
                        {chkTotal>0&&<span style={{ color:"#444",fontSize:10 }}>☑ {chkDone}/{chkTotal}</span>}
                      </div>
                    </div>
                    <button onClick={()=>toggleTask(t.catId,t.id)} style={{ background:"#18181F",border:"none",borderRadius:7,padding:"4px 9px",color:"#444",fontSize:11,cursor:"pointer",flexShrink:0 }}>Reabrir</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
