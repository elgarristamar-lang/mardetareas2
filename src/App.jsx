import { useState } from "react";

// ── Theme ──────────────────────────────────────────────────────
const DARK={bg:"#09090E",surface:"#13131C",surface2:"#11111A",sidebar:"#0B0B12",border:"#22222E",border2:"#1A1A24",border3:"#14141C",text:"#EEEEF8",text2:"#D8D8E8",text3:"#888",text4:"#555",text5:"#3A3A4E",text6:"#2E2E3E",inputBg:"#0A0A0F",cardBg:"#11111A",rowBg:"#13131C",rowDone:"#0E0E14",subBg:"#0D0D14",sectionLabel:"#3A3A4E"};
const LIGHT={bg:"#F5F5FA",surface:"#FFFFFF",surface2:"#F8F8FC",sidebar:"#FFFFFF",border:"#E0E0EC",border2:"#EAEAF4",border3:"#EBEBF5",text:"#111118",text2:"#2A2A38",text3:"#666",text4:"#888",text5:"#9999AA",text6:"#BBBBCC",inputBg:"#F8F8FC",cardBg:"#FFFFFF",rowBg:"#FFFFFF",rowDone:"#F2F2F8",subBg:"#F5F5FA",sectionLabel:"#9999AA"};

const COLORS=[
  {bg:"#FF6B6B",lightD:"#2A1515",lightL:"#FFF0F0",accent:"#FF6B6B",text:"#FF9999",textL:"#CC2222"},
  {bg:"#4ECDC4",lightD:"#0F2422",lightL:"#E8FAFA",accent:"#4ECDC4",text:"#7EEEE8",textL:"#1A8A84"},
  {bg:"#FFD93D",lightD:"#262010",lightL:"#FFFBE0",accent:"#FFD93D",text:"#FFE878",textL:"#AA8800"},
  {bg:"#6BCB77",lightD:"#0F2215",lightL:"#EDFAEF",accent:"#6BCB77",text:"#96E09F",textL:"#2A7A34"},
  {bg:"#C3A6FF",lightD:"#1A1228",lightL:"#F5F0FF",accent:"#C3A6FF",text:"#D9C4FF",textL:"#6633CC"},
  {bg:"#FF9F43",lightD:"#251A0D",lightL:"#FFF5E8",accent:"#FF9F43",text:"#FFBE7A",textL:"#CC6600"},
  {bg:"#74B9FF",lightD:"#0D1E35",lightL:"#EBF4FF",accent:"#74B9FF",text:"#A8D4FF",textL:"#1155CC"},
  {bg:"#FD79A8",lightD:"#2A0D1A",lightL:"#FFF0F6",accent:"#FD79A8",text:"#FFB3CE",textL:"#CC1166"},
];
function gc(c,dark){return{...c,light:dark?c.lightD:c.lightL,tc:dark?c.text:c.textL};}

const PRIORITY={alta:{label:"Alta",cD:"#FF6B6B",bD:"#2A1515",cL:"#CC2222",bL:"#FFF0F0",dot:"🔴"},media:{label:"Media",cD:"#FFD93D",bD:"#262010",cL:"#AA8800",bL:"#FFFBE0",dot:"🟡"},baja:{label:"Baja",cD:"#6BCB77",bD:"#0F2215",cL:"#2A7A34",bL:"#EDFAEF",dot:"🟢"}};
function ps(k,active,dark){const p=PRIORITY[k];return{color:active?(dark?p.cD:p.cL):(dark?"#444":"#999"),background:active?(dark?p.bD:p.bL):"transparent",border:`1.5px solid ${active?(dark?p.cD:p.cL):(dark?"#22222E":"#DDD")}`};}

const CHK_STATES=["Pendiente","En curso","Completada","Bloqueada"];
const CHK_STYLE={"Pendiente":{cD:"#FFD93D",bD:"#26200F",cL:"#AA8800",bL:"#FFFBE0",icon:"○"},"En curso":{cD:"#74B9FF",bD:"#0D1835",cL:"#1155CC",bL:"#EBF4FF",icon:"◐"},"Completada":{cD:"#6BCB77",bD:"#0F2215",cL:"#2A7A34",bL:"#EDFAEF",icon:"✓"},"Bloqueada":{cD:"#FD79A8",bD:"#2A0D1A",cL:"#CC1166",bL:"#FFF0F6",icon:"⊘"}};
function cst(s,dark){const c=CHK_STYLE[s]||CHK_STYLE["Pendiente"];return{color:dark?c.cD:c.cL,background:dark?c.bD:c.bL,icon:c.icon};}

const MTG_STATES=["Pendiente","En curso","Completada","Cancelada","Bloqueada"];
const MTG_COLORS={"Pendiente":{cD:"#FFD93D",bD:"#262010",cL:"#AA8800",bL:"#FFFBE0"},"En curso":{cD:"#74B9FF",bD:"#0D1E35",cL:"#1155CC",bL:"#EBF4FF"},"Completada":{cD:"#6BCB77",bD:"#0F2215",cL:"#2A7A34",bL:"#EDFAEF"},"Cancelada":{cD:"#FF6B6B",bD:"#2A1515",cL:"#CC2222",bL:"#FFF0F0"},"Bloqueada":{cD:"#FD79A8",bD:"#2A0D1A",cL:"#CC1166",bL:"#FFF0F6"}};
function msc(s,dark){const c=MTG_COLORS[s]||MTG_COLORS["Pendiente"];return{color:dark?c.cD:c.cL,background:dark?c.bD:c.bL};}

const DAYS=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const ICONS=["💼","🏠","🎯","📚","🌱","🛒","🧠","🎨","💡","🔧","⚡","🤝","👥","📊","🗓️","👤"];

function genId(){return Math.random().toString(36).substr(2,9);}
function today(){return new Date().toISOString().split("T")[0];}
function fmt(d){if(!d)return"—";return new Date(d+"T00:00:00").toLocaleDateString("es-ES",{day:"2-digit",month:"short",year:"numeric"});}
function dlStatus(dl){
  if(!dl)return null;
  const now=new Date();now.setHours(0,0,0,0);
  const d=new Date(dl+"T00:00:00");const diff=Math.round((d-now)/86400000);
  if(diff<0)return{label:"Vencida",color:"#FF6B6B",urgent:true};
  if(diff===0)return{label:"Hoy",color:"#FF9F43",urgent:true};
  if(diff<=3)return{label:`${diff}d`,color:"#FFD93D",urgent:false};
  return{label:`${diff}d`,color:"#6BCB77",urgent:false};
}

function mkTask(text){return{id:genId(),text,done:false,priority:"media",createdAt:today(),deadline:null,completedAt:null,jiraUrl:"",description:"",checklist:[],contacts:[]};}
function mkChkItem(text="",collab=""){return{id:genId(),text,state:"Pendiente",deadline:null,collaborator:collab};}

// 121 Manager: multi-point meeting, carries pending forward
function mkMeeting(inheritItems=[]){
  return{id:genId(),meetingId:`M-${Date.now().toString(36).toUpperCase()}`,day:"Lunes",date:today(),state:"Pendiente",notes:"",done:false,createdAt:today(),completedAt:null,
    checklist:inheritItems.map(i=>({...mkChkItem(i.text),carriedFrom:true}))};
}

// 121 Equipo: 1 meeting = 1 collaborator, carries pending forward per collaborator
function mkTeamMeeting(collaborator="",inheritItems=[]){
  return{id:genId(),meetingId:`E-${Date.now().toString(36).toUpperCase()}`,collaborator,day:"Lunes",date:today(),state:"Pendiente",notes:"",done:false,createdAt:today(),completedAt:null,
    checklist:inheritItems.map(i=>({...mkChkItem(i.text,collaborator),carriedFrom:true}))};
}

const INITIAL=[
  {id:"c1",name:"Estratégica",icon:"🎯",colorIdx:0,type:"tasks",tasks:["Informe mensual","Comité trimestral C-Level","Seguimiento estandarización","LLICÀ: Volumen E2","LLICÀ: Pantallas cota 140","LLICÀ: Mejora gestión expediciones","BD Mango: Integración WCS","BD Mango: Integración Microsoft Lists","BD Mango: Gobernanza datos","Hackathon: 1 tipología pallet","Hackathon: Reducción tipología cajas","Hackathon: Optimización carga camiones"].map(mkTask)},
  {id:"c2",name:"Transversal",icon:"🤝",colorIdx:2,type:"tasks",tasks:["TSA España: Evaluar necesidad 4 salidas semanales"].map(mkTask)},
  {id:"c3",name:"Equipo",icon:"👥",colorIdx:3,type:"tasks",tasks:["1:1 Con manager","1:1 Con subordinados","Objetivos 2026: Definir OKRs","Objetivos 2026: Bajar a épicas","Objetivos 2026: Sprints en Jira","Matriz Polivalencia: Equilibrio skills","Disponibilidad: Oficina / Teletrabajo / Vacaciones","Shane – Automatización agendas","Pablo – Sobrestock 131","Pablo – Cajas cliente 131","Iván – Reservas B2C","Iván – Post-mortem BF25","Pau – Entrega Grafanas"].map(mkTask)},
  {id:"c4",name:"Data & Operación",icon:"⚡",colorIdx:5,type:"tasks",tasks:["Influx + Grafana (real time)","PL/SQL producción","Databricks + Radar (histórico)","Reporting producción no cubierto","Herramientas Python → Entorno IT"].map(mkTask)},
  {id:"c5",name:"121 Manager",icon:"👤",colorIdx:6,type:"meeting",tasks:[]},
  {id:"c6",name:"121 Equipo",icon:"🗓️",colorIdx:7,type:"meeting121eq",tasks:[]},
];

function SL({children,th}){return<div style={{color:th.sectionLabel,fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:7}}>{children}</div>;}
function inp(th,extra={}){return{background:th.inputBg,border:`1px solid ${th.border}`,borderRadius:7,padding:"6px 10px",color:th.text,fontSize:12,outline:"none",...extra};}

function downloadCSV(filename,rows){
  const csv=rows.map(r=>r.map(c=>`"${String(c||"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");
  a.href=url;a.download=filename;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
}
function exportHistorial(doneTasks){
  const h=["Tarea","Categoría","Fecha Inicio","Fecha Fin","Deadline","Prioridad"];
  downloadCSV(`historial_${today()}.csv`,[h,...doneTasks.map(t=>[t.text||"",t.catName||"",t.createdAt||"",t.completedAt||"",t.deadline||"",t.priority||""])]);
}
function exportMeeting(meeting,catName){
  const h=["Reunión","Categoría","Colaborador","Fecha","Día","Estado","Punto","Est.Punto","Deadline Punto","Arrastrado"];
  const rows=(meeting.checklist||[]).map(i=>[meeting.meetingId,catName,meeting.collaborator||"",meeting.date,meeting.day,meeting.state,i.text,i.state,i.deadline||"",i.carriedFrom?"Sí":"No"]);
  downloadCSV(`reunion_${meeting.meetingId}.csv`,[h,...rows]);
}
function exportAllMeetings(cats){
  const h=["Reunión","Categoría","Colaborador","Fecha","Día","Estado","Punto","Est.Punto","Deadline Punto","Arrastrado"];
  const rows=[];
  cats.filter(c=>c.type==="meeting"||c.type==="meeting121eq").forEach(cat=>{
    cat.tasks.forEach(m=>(m.checklist||[]).forEach(i=>rows.push([m.meetingId,cat.name,m.collaborator||"",m.date,m.day,m.state,i.text,i.state,i.deadline||"",i.carriedFrom?"Sí":"No"])));
  });
  downloadCSV(`todas_reuniones_${today()}.csv`,[h,...rows]);
}

// ── Checklist (normal tasks) ──────────────────────────────────
function Checklist({items,color,th,onChange}){
  const [nw,setNw]=useState("");
  const done=items.filter(i=>i.done).length;
  const add=()=>{if(!nw.trim())return;onChange([...items,{id:genId(),text:nw.trim(),done:false}]);setNw("");};
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}><SL th={th}>Checklist</SL>{items.length>0&&<span style={{fontSize:10,color:done===items.length?"#6BCB77":th.text5}}>{done}/{items.length}</span>}</div>
      {items.length>0&&<div style={{height:3,background:th.border2,borderRadius:99,marginBottom:9}}><div style={{height:3,borderRadius:99,background:done===items.length?"#6BCB77":color.accent,width:`${(done/items.length)*100}%`,transition:"width 0.3s"}}/></div>}
      {items.map(item=>(
        <div key={item.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
          <div onClick={()=>onChange(items.map(i=>i.id===item.id?{...i,done:!i.done}:i))} style={{width:15,height:15,borderRadius:4,flexShrink:0,cursor:"pointer",border:item.done?"none":`1.5px solid ${color.accent}55`,background:item.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#000"}}>{item.done&&"✓"}</div>
          <input value={item.text} onChange={e=>onChange(items.map(i=>i.id===item.id?{...i,text:e.target.value}:i))} style={{flex:1,background:"transparent",border:"none",outline:"none",color:item.done?th.text5:th.text3,fontSize:12,textDecoration:item.done?"line-through":"none"}}/>
          <span onClick={()=>onChange(items.filter(i=>i.id!==item.id))} style={{color:th.text6,cursor:"pointer",fontSize:12}}>✕</span>
        </div>
      ))}
      <div style={{display:"flex",gap:6,marginTop:6}}>
        <input value={nw} onChange={e=>setNw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Añadir punto..." style={{...inp(th),flex:1,fontSize:12,padding:"5px 9px"}}/>
        <button onClick={add} style={{padding:"5px 11px",borderRadius:7,background:color.light,border:`1px solid ${color.accent}44`,color:color.tc,fontSize:12,cursor:"pointer"}}>＋</button>
      </div>
    </div>
  );
}

// ── Meeting Checklist (states + deadlines) ────────────────────
function MeetingChecklist({items=[],color,th,onChange}){
  const [nw,setNw]=useState("");const [nDl,setNDl]=useState("");
  const dark=th.bg===DARK.bg;
  const completadas=items.filter(i=>i.state==="Completada").length;
  const pendientes=items.filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada");
  const cycleState=(id)=>onChange(items.map(i=>{if(i.id!==id)return i;const idx=CHK_STATES.indexOf(i.state);return{...i,state:CHK_STATES[(idx+1)%CHK_STATES.length]};}));
  const add=()=>{if(!nw.trim())return;onChange([...items,{...mkChkItem(nw.trim()),deadline:nDl||null}]);setNw("");setNDl("");};
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
        <SL th={th}>Puntos de la reunión</SL>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {items.length>0&&<span style={{fontSize:10,color:completadas===items.length?"#6BCB77":th.text5}}>{completadas}/{items.length}</span>}
          {pendientes.length>0&&<span style={{fontSize:10,color:"#FF9F43",fontWeight:700}}>↩ {pendientes.length} siguen</span>}
        </div>
      </div>
      {items.length>0&&<div style={{height:3,background:th.border2,borderRadius:99,marginBottom:10}}><div style={{height:3,borderRadius:99,background:completadas===items.length?"#6BCB77":color.accent,width:items.length?`${(completadas/items.length)*100}%`:"0%",transition:"width 0.3s"}}/></div>}
      {items.map(item=>{
        const s=cst(item.state,dark);const dl=dlStatus(item.deadline);
        return(
          <div key={item.id} style={{marginBottom:6,padding:"7px 9px",borderRadius:9,background:th.subBg,border:`1px solid ${item.carriedFrom?"#FF9F4333":th.border2}`}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <button onClick={()=>cycleState(item.id)} style={{flexShrink:0,padding:"2px 8px",borderRadius:99,fontSize:10,fontWeight:700,cursor:"pointer",border:`1.5px solid ${s.color}`,background:s.background,color:s.color,whiteSpace:"nowrap"}}>{s.icon} {item.state}</button>
              <input value={item.text} onChange={e=>onChange(items.map(i=>i.id===item.id?{...i,text:e.target.value}:i))} style={{flex:1,background:"transparent",border:"none",outline:"none",color:item.state==="Completada"?th.text5:th.text2,fontSize:12.5,textDecoration:item.state==="Completada"?"line-through":"none"}}/>
              {dl&&<span style={{fontSize:10,fontWeight:700,color:dl.color,background:dl.color+"22",padding:"1px 6px",borderRadius:99,flexShrink:0}}>{dl.label}</span>}
              {item.carriedFrom&&<span style={{fontSize:9,color:"#FF9F43",background:"#FF9F4322",padding:"1px 5px",borderRadius:3,flexShrink:0}}>anterior</span>}
              <span onClick={()=>onChange(items.filter(i=>i.id!==item.id))} style={{color:th.text6,cursor:"pointer",fontSize:12,flexShrink:0}}>✕</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5,paddingLeft:2}}>
              <span style={{fontSize:10,color:th.text5}}>📅</span>
              <input type="date" value={item.deadline||""} onChange={e=>onChange(items.map(i=>i.id===item.id?{...i,deadline:e.target.value||null}:i))} style={{background:"transparent",border:`1px solid ${th.border2}`,borderRadius:5,outline:"none",color:item.deadline?th.text3:th.text6,fontSize:11,padding:"2px 6px",colorScheme:dark?"dark":"light"}}/>
            </div>
          </div>
        );
      })}
      <div style={{background:th.border3,borderRadius:9,padding:"8px 10px",marginTop:8,display:"flex",flexDirection:"column",gap:7}}>
        <div style={{display:"flex",gap:6}}>
          <input value={nw} onChange={e=>setNw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Nuevo punto..." style={{...inp(th),flex:1,fontSize:12,padding:"5px 9px"}}/>
          <button onClick={add} style={{padding:"5px 12px",borderRadius:7,background:color.light,border:`1px solid ${color.accent}44`,color:color.tc,fontSize:13,fontWeight:700,cursor:"pointer"}}>＋</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:10,color:th.text5}}>📅 Deadline:</span>
          <input type="date" value={nDl} onChange={e=>setNDl(e.target.value)} style={{...inp(th,{fontSize:11,padding:"3px 6px",colorScheme:dark?"dark":"light"})}}/>
        </div>
      </div>
    </div>
  );
}

// ── Contacts ──────────────────────────────────────────────────
function Contacts({items=[],color,th,onChange}){
  const [show,setShow]=useState(false);const [nn,setNn]=useState("");const [ne,setNe]=useState("");const [no,setNo]=useState("");
  const add=()=>{if(!nn.trim()&&!ne.trim())return;onChange([...items,{id:genId(),name:nn.trim(),email:ne.trim(),note:no.trim()}]);setNn("");setNe("");setNo("");setShow(false);};
  return(
    <div>
      <SL th={th}>Contactos</SL>
      {items.map(c=>(<div key={c.id} style={{display:"flex",alignItems:"flex-start",gap:9,padding:"7px 9px",borderRadius:8,background:th.subBg,border:`1px solid ${th.border2}`,marginBottom:6}}>
        <div style={{width:26,height:26,borderRadius:99,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:color.tc,fontWeight:700,flexShrink:0}}>{(c.name||c.email||"?")[0].toUpperCase()}</div>
        <div style={{flex:1,minWidth:0}}>
          <input value={c.name} onChange={e=>onChange(items.map(i=>i.id===c.id?{...i,name:e.target.value}:i))} placeholder="Nombre..." style={{background:"transparent",border:"none",outline:"none",color:th.text,fontSize:12,fontWeight:600,width:"100%",marginBottom:2}}/>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <input value={c.email} onChange={e=>onChange(items.map(i=>i.id===c.id?{...i,email:e.target.value}:i))} placeholder="email@empresa.com" style={{background:"transparent",border:"none",outline:"none",color:"#5E9EFF",fontSize:11,flex:1,minWidth:0}}/>
            {c.email&&<a href={`mailto:${c.email}`} style={{fontSize:10,color:color.tc,background:color.light,padding:"1px 6px",borderRadius:4,textDecoration:"none",flexShrink:0}}>✉</a>}
          </div>
        </div>
        <span onClick={()=>onChange(items.filter(i=>i.id!==c.id))} style={{color:th.text6,cursor:"pointer",fontSize:12,flexShrink:0}}>✕</span>
      </div>))}
      {show?(<div style={{background:th.subBg,border:`1px solid ${th.border}`,borderRadius:9,padding:10,display:"flex",flexDirection:"column",gap:7}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><input autoFocus value={nn} onChange={e=>setNn(e.target.value)} placeholder="Nombre..." style={{...inp(th),flex:1,minWidth:100}}/><input value={ne} onChange={e=>setNe(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="email@empresa.com" style={{...inp(th),flex:2,minWidth:130,color:"#5E9EFF"}}/></div>
        <div style={{display:"flex",gap:6}}><button onClick={add} style={{flex:1,padding:"5px 0",borderRadius:7,background:color.accent,border:"none",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer"}}>Añadir</button><button onClick={()=>setShow(false)} style={{flex:1,padding:"5px 0",borderRadius:7,background:th.border,border:"none",color:th.text4,fontSize:12,cursor:"pointer"}}>Cancelar</button></div>
      </div>):(<button onClick={()=>setShow(true)} style={{width:"100%",padding:"6px 0",borderRadius:8,border:`1.5px dashed ${th.border}`,background:"transparent",color:th.text6,fontSize:11.5,cursor:"pointer"}}>＋ Añadir contacto</button>)}
    </div>
  );
}

// ── Task Row ──────────────────────────────────────────────────
function TaskRow({task,color,th,onToggle,onDelete,onUpdate}){
  const [exp,setExp]=useState(false);const [editT,setEditT]=useState(false);
  const dark=th.bg===DARK.bg;const dl=dlStatus(task.deadline);const p=PRIORITY[task.priority];
  const chkD=(task.checklist||[]).filter(i=>i.done).length;const chkT=(task.checklist||[]).length;
  return(
    <div style={{background:task.done?th.rowDone:th.rowBg,borderRadius:12,marginBottom:8,border:`1px solid ${task.done?th.border3:(dl?.urgent?dl.color+"44":th.border)}`,opacity:task.done?0.55:1,transition:"all 0.2s",boxShadow:dark?"none":"0 1px 4px #0001"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",cursor:task.done?"default":"pointer"}} onClick={()=>!task.done&&!editT&&setExp(e=>!e)}>
        <div onClick={e=>{e.stopPropagation();onToggle();}} style={{width:19,height:19,borderRadius:99,flexShrink:0,cursor:"pointer",border:task.done?"none":`2px solid ${color.accent}`,background:task.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff",transition:"all 0.2s"}}>{task.done&&"✓"}</div>
        <span style={{fontSize:10,flexShrink:0}}>{p.dot}</span>
        {editT&&!task.done?(<input autoFocus value={task.text} onChange={e=>onUpdate({text:e.target.value})} onBlur={()=>setEditT(false)} onKeyDown={e=>{if(e.key==="Enter"||e.key==="Escape")setEditT(false);}} onClick={e=>e.stopPropagation()} style={{flex:1,...inp(th,{border:`1px solid ${color.accent}66`,fontSize:13.5,padding:"2px 8px"})}}/>):(
          <span onDoubleClick={e=>{e.stopPropagation();if(!task.done)setEditT(true);}} style={{flex:1,fontSize:13.5,color:task.done?th.text4:th.text2,textDecoration:task.done?"line-through":"none",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{task.text}</span>
        )}
        {!task.done&&!editT&&<span onClick={e=>{e.stopPropagation();setEditT(true);}} style={{color:th.text6,cursor:"pointer",fontSize:11,flexShrink:0}}>✎</span>}
        {task.jiraUrl&&!task.done&&<a href={task.jiraUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:10,fontWeight:700,color:"#5E9EFF",background:dark?"#0D1E35":"#EBF4FF",padding:"2px 7px",borderRadius:5,border:"1px solid #1A3A6A",textDecoration:"none",flexShrink:0}}>JIRA ↗</a>}
        {(task.contacts||[]).length>0&&!task.done&&<span style={{fontSize:10,color:th.text4,flexShrink:0}}>👤 {task.contacts.length}</span>}
        {chkT>0&&!task.done&&<span style={{fontSize:10,color:chkD===chkT?"#6BCB77":th.text5,flexShrink:0}}>☑ {chkD}/{chkT}</span>}
        {dl&&!task.done&&<span style={{fontSize:11,fontWeight:700,color:dl.color,background:dl.color+"22",padding:"2px 8px",borderRadius:99,flexShrink:0}}>{dl.label}</span>}
        {!task.done&&<span style={{color:th.text6,fontSize:11,flexShrink:0,transform:exp?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>}
        <span onClick={e=>{e.stopPropagation();onDelete();}} style={{color:th.text6,cursor:"pointer",fontSize:13,flexShrink:0}}>✕</span>
      </div>
      {exp&&!task.done&&(<div style={{borderTop:`1px solid ${th.border2}`,padding:14}}>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
          <div style={{flex:1,minWidth:140}}><SL th={th}>Prioridad</SL><div style={{display:"flex",gap:5}}>{Object.entries(PRIORITY).map(([k])=>(<button key={k} onClick={()=>onUpdate({priority:k})} style={{padding:"3px 10px",borderRadius:99,fontSize:11.5,cursor:"pointer",...ps(k,task.priority===k,dark)}}>{PRIORITY[k].label}</button>))}</div></div>
          <div style={{flex:1,minWidth:150}}><SL th={th}>Deadline</SL><input type="date" value={task.deadline||""} onChange={e=>onUpdate({deadline:e.target.value||null})} style={{...inp(th),colorScheme:dark?"dark":"light"}}/></div>
        </div>
        <div style={{marginBottom:14}}><SL th={th}>Ticket Jira</SL><div style={{display:"flex",gap:7,alignItems:"center"}}><input value={task.jiraUrl||""} onChange={e=>onUpdate({jiraUrl:e.target.value})} placeholder="https://jira.empresa.com/browse/PROJ-123" style={{...inp(th),flex:1,fontFamily:"monospace"}}/>{task.jiraUrl&&<a href={task.jiraUrl} target="_blank" rel="noreferrer" style={{padding:"5px 10px",borderRadius:7,background:dark?"#0D1E35":"#EBF4FF",border:"1px solid #1A3A6A",color:"#5E9EFF",fontSize:12,textDecoration:"none",fontWeight:700,flexShrink:0}}>Abrir ↗</a>}</div></div>
        <div style={{marginBottom:14}}><SL th={th}>Descripción</SL><textarea value={task.description||""} onChange={e=>onUpdate({description:e.target.value})} placeholder="Contexto, notas..." rows={3} style={{width:"100%",boxSizing:"border-box",...inp(th,{resize:"vertical",lineHeight:1.6,fontFamily:"inherit"})}}/></div>
        <div style={{marginBottom:14}}><Checklist items={task.checklist||[]} color={color} th={th} onChange={cl=>onUpdate({checklist:cl})}/></div>
        <div style={{marginBottom:12}}><Contacts items={task.contacts||[]} color={color} th={th} onChange={ct=>onUpdate({contacts:ct})}/></div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap",paddingTop:10,borderTop:`1px solid ${th.border2}`}}>
          <span style={{color:th.text6,fontSize:10}}>📅 Creada: <span style={{color:th.text4}}>{fmt(task.createdAt)}</span></span>
          {task.deadline&&<span style={{color:th.text6,fontSize:10}}>⏱ Deadline: <span style={{color:th.text4}}>{fmt(task.deadline)}</span></span>}
        </div>
      </div>)}
    </div>
  );
}

// ── Meeting Row (121 Manager) ─────────────────────────────────
function MeetingRow({meeting,color,th,catName,onUpdate,onDelete,onToggle,onExport}){
  const [exp,setExp]=useState(false);
  const dark=th.bg===DARK.bg;const sc=msc(meeting.state,dark);
  const chk=meeting.checklist||[];const comp=chk.filter(i=>i.state==="Completada").length;
  const pend=chk.filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada");
  return(
    <div style={{background:meeting.done?th.rowDone:th.rowBg,borderRadius:12,marginBottom:8,border:`1px solid ${meeting.done?th.border3:th.border}`,opacity:meeting.done?0.55:1,transition:"all 0.2s",boxShadow:dark?"none":"0 1px 4px #0001"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",cursor:"pointer"}} onClick={()=>!meeting.done&&setExp(e=>!e)}>
        <div onClick={e=>{e.stopPropagation();onToggle();}} style={{width:19,height:19,borderRadius:99,flexShrink:0,cursor:"pointer",border:meeting.done?"none":`2px solid ${color.accent}`,background:meeting.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff"}}>{meeting.done&&"✓"}</div>
        <span style={{fontSize:10,fontFamily:"monospace",color:color.tc,background:color.light,padding:"1px 6px",borderRadius:4,flexShrink:0}}>{meeting.meetingId}</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:12.5,color:meeting.done?th.text4:th.text2,marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{chk.length>0?`${chk.length} punto${chk.length!==1?"s":""} · ${comp} completado${comp!==1?"s":""}`:"Sin puntos aún"}</div>
          {chk.length>0&&<div style={{height:2,background:th.border2,borderRadius:99}}><div style={{height:2,borderRadius:99,background:comp===chk.length?"#6BCB77":color.accent,width:`${(comp/chk.length)*100}%`,transition:"width 0.3s"}}/></div>}
        </div>
        {pend.length>0&&!meeting.done&&<span style={{fontSize:10,color:"#FF9F43",background:"#FF9F4322",border:"1px solid #FF9F4344",borderRadius:5,padding:"2px 6px",flexShrink:0,fontWeight:700}}>↩{pend.length}</span>}
        <span style={{fontSize:10,color:th.text4,background:th.border2,padding:"2px 6px",borderRadius:4,flexShrink:0}}>{meeting.day}</span>
        <span style={{fontSize:10,color:th.text5,flexShrink:0,minWidth:70}}>{fmt(meeting.date)}</span>
        <span style={{fontSize:10,fontWeight:700,color:sc.color,background:sc.background,padding:"2px 8px",borderRadius:99,flexShrink:0}}>{meeting.state}</span>
        {!meeting.done&&<span style={{color:th.text6,fontSize:11,flexShrink:0,transform:exp?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>}
        <span onClick={e=>{e.stopPropagation();onDelete();}} style={{color:th.text6,cursor:"pointer",fontSize:13,flexShrink:0}}>✕</span>
      </div>
      {exp&&!meeting.done&&(<div style={{borderTop:`1px solid ${th.border2}`,padding:14,display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:110}}><SL th={th}>ID</SL><input value={meeting.meetingId} onChange={e=>onUpdate({meetingId:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",fontFamily:"monospace",color:color.tc}}/></div>
          <div style={{flex:1,minWidth:110}}><SL th={th}>Día</SL><select value={meeting.day} onChange={e=>onUpdate({day:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",colorScheme:dark?"dark":"light"}}>{DAYS.map(d=><option key={d}>{d}</option>)}</select></div>
          <div style={{flex:1,minWidth:130}}><SL th={th}>Fecha</SL><input type="date" value={meeting.date||""} onChange={e=>onUpdate({date:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",colorScheme:dark?"dark":"light"}}/></div>
        </div>
        <div><SL th={th}>Estado</SL><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{MTG_STATES.map(s=>{const sc2=msc(s,dark);return(<button key={s} onClick={()=>onUpdate({state:s})} style={{padding:"4px 12px",borderRadius:99,fontSize:12,cursor:"pointer",border:`1.5px solid ${meeting.state===s?sc2.color:th.border}`,background:meeting.state===s?sc2.background:"transparent",color:meeting.state===s?sc2.color:th.text4,fontWeight:meeting.state===s?700:400}}>{s}</button>);})}</div></div>
        <MeetingChecklist items={chk} color={color} th={th} onChange={cl=>onUpdate({checklist:cl})}/>
        <div><SL th={th}>Notas</SL><textarea value={meeting.notes||""} onChange={e=>onUpdate({notes:e.target.value})} placeholder="Observaciones, próximos pasos..." rows={2} style={{width:"100%",boxSizing:"border-box",...inp(th,{resize:"vertical",lineHeight:1.6,fontFamily:"inherit"})}}/></div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:8,borderTop:`1px solid ${th.border2}`,flexWrap:"wrap",gap:8}}>
          <span style={{color:th.text6,fontSize:10}}>📅 {fmt(meeting.createdAt)}{pend.length>0&&<span style={{color:"#FF9F43"}}> · ↩ {pend.length} puntos pasarán a la siguiente</span>}</span>
          <button onClick={()=>onExport(meeting)} style={{padding:"5px 12px",borderRadius:7,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:11,fontWeight:700,cursor:"pointer"}}>⬇ Excel</button>
        </div>
      </div>)}
    </div>
  );
}

// ── Team Meeting Row (121 Equipo: 1 meeting = 1 collaborator) ─
function TeamMeetingRow({meeting,color,th,catName,onUpdate,onDelete,onToggle,onExport}){
  const [exp,setExp]=useState(false);
  const dark=th.bg===DARK.bg;const sc=msc(meeting.state,dark);
  const chk=meeting.checklist||[];const comp=chk.filter(i=>i.state==="Completada").length;
  const pend=chk.filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada");
  return(
    <div style={{background:meeting.done?th.rowDone:th.rowBg,borderRadius:12,marginBottom:8,border:`1px solid ${meeting.done?th.border3:th.border}`,opacity:meeting.done?0.55:1,transition:"all 0.2s",boxShadow:dark?"none":"0 1px 4px #0001"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",cursor:"pointer"}} onClick={()=>!meeting.done&&setExp(e=>!e)}>
        <div onClick={e=>{e.stopPropagation();onToggle();}} style={{width:19,height:19,borderRadius:99,flexShrink:0,cursor:"pointer",border:meeting.done?"none":`2px solid ${color.accent}`,background:meeting.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff"}}>{meeting.done&&"✓"}</div>
        {/* Collaborator avatar */}
        <div style={{width:28,height:28,borderRadius:99,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:color.tc,fontWeight:800,flexShrink:0}}>
          {meeting.collaborator?meeting.collaborator[0].toUpperCase():"?"}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:700,color:meeting.done?th.text4:th.text,marginBottom:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{meeting.collaborator||<span style={{color:th.text6,fontStyle:"italic",fontWeight:400}}>Sin colaborador</span>}</div>
          <div style={{fontSize:11,color:th.text5,display:"flex",gap:8,alignItems:"center"}}>
            <span>{chk.length>0?`${chk.length} punto${chk.length!==1?"s":""} · ${comp} completado${comp!==1?"s":""}` :"Sin puntos"}</span>
            {chk.length>0&&<div style={{height:2,width:60,background:th.border2,borderRadius:99,display:"inline-block"}}><div style={{height:2,borderRadius:99,background:comp===chk.length?"#6BCB77":color.accent,width:`${(comp/chk.length)*100}%`,transition:"width 0.3s"}}/></div>}
          </div>
        </div>
        {pend.length>0&&!meeting.done&&<span style={{fontSize:10,color:"#FF9F43",background:"#FF9F4322",border:"1px solid #FF9F4344",borderRadius:5,padding:"2px 6px",flexShrink:0,fontWeight:700}}>↩{pend.length}</span>}
        <span style={{fontSize:10,color:th.text4,background:th.border2,padding:"2px 6px",borderRadius:4,flexShrink:0}}>{meeting.day}</span>
        <span style={{fontSize:10,color:th.text5,flexShrink:0,minWidth:70}}>{fmt(meeting.date)}</span>
        <span style={{fontSize:10,fontWeight:700,color:sc.color,background:sc.background,padding:"2px 8px",borderRadius:99,flexShrink:0}}>{meeting.state}</span>
        {!meeting.done&&<span style={{color:th.text6,fontSize:11,flexShrink:0,transform:exp?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>}
        <span onClick={e=>{e.stopPropagation();onDelete();}} style={{color:th.text6,cursor:"pointer",fontSize:13,flexShrink:0}}>✕</span>
      </div>
      {exp&&!meeting.done&&(<div style={{borderTop:`1px solid ${th.border2}`,padding:14,display:"flex",flexDirection:"column",gap:14}}>
        {/* Collaborator field - prominent */}
        <div style={{background:color.light,borderRadius:10,padding:"10px 14px",border:`1px solid ${color.accent}33`}}>
          <SL th={th}>Colaborador</SL>
          <input value={meeting.collaborator||""} onChange={e=>onUpdate({collaborator:e.target.value})} placeholder="Nombre del colaborador..." style={{...inp(th,{fontSize:14,fontWeight:700,color:color.tc,background:"transparent",border:"none",padding:"0"}),width:"100%"}}/>
        </div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:110}}><SL th={th}>ID</SL><input value={meeting.meetingId} onChange={e=>onUpdate({meetingId:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",fontFamily:"monospace",color:color.tc}}/></div>
          <div style={{flex:1,minWidth:110}}><SL th={th}>Día</SL><select value={meeting.day} onChange={e=>onUpdate({day:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",colorScheme:dark?"dark":"light"}}>{DAYS.map(d=><option key={d}>{d}</option>)}</select></div>
          <div style={{flex:1,minWidth:130}}><SL th={th}>Fecha</SL><input type="date" value={meeting.date||""} onChange={e=>onUpdate({date:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",colorScheme:dark?"dark":"light"}}/></div>
        </div>
        <div><SL th={th}>Estado</SL><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{MTG_STATES.map(s=>{const sc2=msc(s,dark);return(<button key={s} onClick={()=>onUpdate({state:s})} style={{padding:"4px 12px",borderRadius:99,fontSize:12,cursor:"pointer",border:`1.5px solid ${meeting.state===s?sc2.color:th.border}`,background:meeting.state===s?sc2.background:"transparent",color:meeting.state===s?sc2.color:th.text4,fontWeight:meeting.state===s?700:400}}>{s}</button>);})}</div></div>
        <MeetingChecklist items={chk} color={color} th={th} onChange={cl=>onUpdate({checklist:cl})}/>
        <div><SL th={th}>Notas</SL><textarea value={meeting.notes||""} onChange={e=>onUpdate({notes:e.target.value})} placeholder="Observaciones, próximos pasos..." rows={2} style={{width:"100%",boxSizing:"border-box",...inp(th,{resize:"vertical",lineHeight:1.6,fontFamily:"inherit"})}}/></div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:8,borderTop:`1px solid ${th.border2}`,flexWrap:"wrap",gap:8}}>
          <span style={{color:th.text6,fontSize:10}}>📅 {fmt(meeting.createdAt)}{pend.length>0&&<span style={{color:"#FF9F43"}}> · ↩ {pend.length} puntos seguirán</span>}</span>
          <button onClick={()=>onExport(meeting)} style={{padding:"5px 12px",borderRadius:7,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:11,fontWeight:700,cursor:"pointer"}}>⬇ Excel</button>
        </div>
      </div>)}
    </div>
  );
}

// ── Dashboard widget ──────────────────────────────────────────
function Dashboard({cats,th,dark,onNavigate}){
  const totalDone=cats.reduce((a,c)=>a+c.tasks.filter(t=>t.done).length,0);
  const totalAll=cats.reduce((a,c)=>a+c.tasks.length,0);
  const last30=new Date();last30.setDate(last30.getDate()-30);
  const recentDone=cats.flatMap(c=>c.tasks.filter(t=>t.done&&t.completedAt&&new Date(t.completedAt)>=last30).map(t=>({...t,catName:c.name,catColorIdx:c.colorIdx})));
  // Group by category for bar chart
  const byCategory=cats.map(c=>{const done=c.tasks.filter(t=>t.done).length;const total=c.tasks.length;return{id:c.id,name:c.name,icon:c.icon,colorIdx:c.colorIdx,done,total,pct:total?Math.round((done/total)*100):0};});
  const maxDone=Math.max(...byCategory.map(c=>c.done),1);
  return(
    <div style={{marginBottom:28}}>
      <h3 style={{color:th.text,fontSize:14,fontWeight:800,marginBottom:14,marginTop:0}}>📊 Dashboard</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:18}}>
        {[
          {label:"Total completadas",value:totalDone,color:"#6BCB77"},
          {label:"Tasa completado",value:`${totalAll?Math.round((totalDone/totalAll)*100):0}%`,color:"#4ECDC4"},
          {label:"Últimos 30 días",value:recentDone.length,color:"#FFD93D"},
          {label:"Pendientes",value:totalAll-totalDone,color:"#FF9F43"},
        ].map((m,i)=>(
          <div key={i} style={{background:th.cardBg,borderRadius:12,padding:"12px 14px",border:`1px solid ${th.border2}`,boxShadow:dark?"none":"0 1px 6px #0001"}}>
            <div style={{fontSize:22,fontWeight:800,color:m.color,marginBottom:2}}>{m.value}</div>
            <div style={{fontSize:10,color:th.text5}}>{m.label}</div>
          </div>
        ))}
      </div>
      {/* Bar chart by category */}
      <div style={{background:th.cardBg,borderRadius:14,padding:16,border:`1px solid ${th.border2}`,boxShadow:dark?"none":"0 1px 6px #0001"}}>
        <div style={{fontSize:11,fontWeight:700,color:th.text4,marginBottom:14,letterSpacing:0.5}}>COMPLETADAS POR CATEGORÍA</div>
        {byCategory.map(c=>{
          const color=gc(COLORS[c.colorIdx],dark);
          return(
            <div key={c.id} onClick={()=>onNavigate(c.id)} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer"}}>
              <span style={{fontSize:14,flexShrink:0}}>{c.icon}</span>
              <div style={{width:90,fontSize:11,color:th.text3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flexShrink:0}}>{c.name}</div>
              <div style={{flex:1,height:8,background:th.border2,borderRadius:99,overflow:"hidden"}}>
                <div style={{height:8,borderRadius:99,background:color.accent,width:`${c.total?Math.round((c.done/maxDone)*100):0}%`,transition:"width 0.5s"}}/>
              </div>
              <span style={{fontSize:11,color:color.tc,minWidth:40,textAlign:"right",flexShrink:0}}>{c.done}/{c.total}</span>
              <span style={{fontSize:10,color:th.text5,minWidth:32,textAlign:"right",flexShrink:0}}>{c.pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Overview upcoming tasks (grouped) ─────────────────────────
function UpcomingGroup({title,tasks,icon,color,th,dark,defaultOpen=false,onNavigate}){
  const [open,setOpen]=useState(defaultOpen);
  if(tasks.length===0)return null;
  return(
    <div style={{marginBottom:12}}>
      <div onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:10,cursor:"pointer",background:open?color.light:th.border3,border:`1px solid ${open?color.accent+"44":th.border2}`,marginBottom:open?6:0,transition:"all 0.15s"}}>
        <span style={{fontSize:14}}>{icon}</span>
        <span style={{flex:1,fontWeight:700,fontSize:13,color:open?color.tc:th.text3}}>{title}</span>
        <span style={{fontSize:11,color:th.text5,background:th.border2,padding:"1px 8px",borderRadius:99}}>{tasks.length}</span>
        <span style={{color:th.text5,fontSize:12,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
      </div>
      {open&&tasks.map(t=>{const dl=dlStatus(t.deadline);return(
        <div key={t.id} onClick={()=>onNavigate(t.catId)} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 11px",borderRadius:9,marginBottom:4,background:th.cardBg,border:`1px solid ${th.border2}`,cursor:"pointer",boxShadow:dark?"none":"0 1px 3px #0001"}}
          onMouseEnter={e=>e.currentTarget.style.borderColor=th.border} onMouseLeave={e=>e.currentTarget.style.borderColor=th.border2}>
          <span style={{fontSize:12,flexShrink:0}}>{t.catIcon||icon}</span>
          <span style={{flex:1,color:th.text2,fontSize:12.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.text||t.action||t.meetingId}</span>
          {t.catName&&<span style={{fontSize:10,color:th.text5,flexShrink:0}}>{t.catName}</span>}
          {dl&&<span style={{fontSize:11,fontWeight:700,color:dl.color,background:dl.color+"22",padding:"2px 7px",borderRadius:99,flexShrink:0}}>{dl.label}</span>}
        </div>
      );})}
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────
export default function App(){
  const [dark,setDark]=useState(true);const th=dark?DARK:LIGHT;
  const [cats,setCats]=useState(INITIAL);
  const [tab,setTab]=useState("overview");
  const [ncName,setNcName]=useState("");const [ncIcon,setNcIcon]=useState("📊");const [ncColor,setNcColor]=useState(0);const [showNc,setShowNc]=useState(false);
  const [editCatId,setEditCatId]=useState(null);const [editCatName,setEditCatName]=useState("");
  const [nText,setNText]=useState({});const [nDl,setNDl]=useState({});const [nPri,setNPri]=useState({});
  const [sortBy,setSortBy]=useState("priority");

  const allTasks=cats.flatMap(c=>c.tasks.map(t=>({...t,catId:c.id,catName:c.name,catIcon:c.icon,catColor:gc(COLORS[c.colorIdx],dark),catType:c.type})));
  const doneTasks=allTasks.filter(t=>t.done).sort((a,b)=>(b.completedAt||"").localeCompare(a.completedAt||""));
  const totalAll=allTasks.length;const totalDone=doneTasks.length;

  const updTask=(cId,tId,patch)=>setCats(cs=>cs.map(c=>c.id!==cId?c:{...c,tasks:c.tasks.map(t=>t.id!==tId?t:{...t,...patch})}));
  const togTask=(cId,tId)=>setCats(cs=>cs.map(c=>c.id!==cId?c:{...c,tasks:c.tasks.map(t=>t.id!==tId?t:{...t,done:!t.done,completedAt:!t.done?today():null})}));
  const delTask=(cId,tId)=>setCats(cs=>cs.map(c=>c.id!==cId?c:{...c,tasks:c.tasks.filter(t=>t.id!==tId)}));

  const addTask=(cId)=>{
    const text=nText[cId]?.trim();if(!text)return;
    setCats(cs=>cs.map(c=>c.id!==cId?c:{...c,tasks:[...c.tasks,{id:genId(),text,done:false,priority:nPri[cId]||"media",createdAt:today(),deadline:nDl[cId]||null,completedAt:null,jiraUrl:"",description:"",checklist:[],contacts:[]}]}));
    setNText(p=>({...p,[cId]:""}));setNDl(p=>({...p,[cId]:""}));
  };

  // 121 Manager: carry pending items to new meeting
  const addMeeting=(cId)=>{
    setCats(cs=>cs.map(c=>{
      if(c.id!==cId)return c;
      const lastM=c.tasks.find(t=>!t.done);
      const pendItems=lastM?(lastM.checklist||[]).filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada"):[];
      return{...c,tasks:[mkMeeting(pendItems),...c.tasks]};
    }));
  };

  // 121 Equipo: new meeting for a collaborator, carry their pending items
  const addTeamMeeting=(cId)=>{
    setCats(cs=>cs.map(c=>{
      if(c.id!==cId)return c;
      // Find last meeting for same collaborator (prompt user via collaborator field after creation)
      // We create empty and let user fill collaborator; carry forward is per collaborator
      return{...c,tasks:[mkTeamMeeting(""),...c.tasks]};
    }));
  };

  const addCat=()=>{if(!ncName.trim())return;setCats(cs=>[...cs,{id:genId(),name:ncName.trim(),icon:ncIcon,colorIdx:ncColor,type:"tasks",tasks:[]}]);setNcName("");setShowNc(false);};
  const delCat=(id)=>{setCats(cs=>cs.filter(c=>c.id!==id));if(tab===id)setTab("overview");};
  const saveCatName=(id)=>{if(editCatName.trim())setCats(cs=>cs.map(c=>c.id===id?{...c,name:editCatName.trim()}:c));setEditCatId(null);};

  const PORD={alta:0,media:1,baja:2};
  const sortT=(tasks)=>{
    const pend=[...tasks.filter(t=>!t.done)].sort((a,b)=>{
      if(sortBy==="priority")return PORD[a.priority]-PORD[b.priority];
      if(sortBy==="deadline"){if(!a.deadline&&!b.deadline)return 0;if(!a.deadline)return 1;if(!b.deadline)return -1;return a.deadline.localeCompare(b.deadline);}
      return(a.createdAt||"").localeCompare(b.createdAt||"");
    });
    return[...pend,...tasks.filter(t=>t.done)];
  };

  const selCat=cats.find(c=>c.id===tab);
  const isMeeting=(t)=>t==="meeting"||t==="meeting121eq";

  const SI=({id,label,icon,cIdx,badge})=>{
    const isA=tab===id;const color=cIdx!=null?gc(COLORS[cIdx],dark):null;
    return(
      <div style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:10,cursor:"pointer",background:isA?(color?color.light:th.border2):"transparent",borderLeft:isA?`2px solid ${color?color.accent:"#4ECDC4"}`:"2px solid transparent",marginBottom:2,transition:"all 0.15s"}}
        onClick={()=>setTab(id)}
        onMouseEnter={e=>{if(!isA)e.currentTarget.style.background=th.border3;}}
        onMouseLeave={e=>{if(!isA)e.currentTarget.style.background="transparent";}}>
        <span style={{fontSize:16}}>{icon}</span>
        <div style={{flex:1,minWidth:0}}>
          {editCatId===id?(<input autoFocus value={editCatName} onChange={e=>setEditCatName(e.target.value)} onBlur={()=>saveCatName(id)} onKeyDown={e=>{if(e.key==="Enter"||e.key==="Escape")saveCatName(id);}} onClick={e=>e.stopPropagation()} style={{background:"transparent",border:`1px solid ${color?color.accent:"#4ECDC4"}`,borderRadius:5,outline:"none",color:th.text,fontSize:12.5,fontWeight:700,width:"100%",padding:"1px 4px"}}/>):(
            <div style={{fontSize:12.5,fontWeight:isA?700:400,color:isA?(color?color.tc:th.text):th.text4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{label}</div>
          )}
          {cIdx!=null&&<div style={{fontSize:10,color:isA?(color?color.tc+"88":th.text5):th.text6}}>{badge} pendiente{badge!==1?"s":""}</div>}
        </div>
        {badge>0&&cIdx!=null&&<span style={{background:color.accent,color:"#fff",fontSize:10,fontWeight:800,borderRadius:99,padding:"1px 6px",flexShrink:0}}>{badge}</span>}
        {cIdx!=null&&<span onClick={e=>{e.stopPropagation();setEditCatId(id);setEditCatName(label);}} style={{color:th.text6,cursor:"pointer",fontSize:11,flexShrink:0}}>✎</span>}
        {cIdx!=null&&<span onClick={e=>{e.stopPropagation();delCat(id);}} style={{color:th.text6,cursor:"pointer",fontSize:12,flexShrink:0}}>✕</span>}
      </div>
    );
  };

  return(
    <div style={{minHeight:"100vh",background:th.bg,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",display:"flex",flexDirection:"column",transition:"background 0.2s"}}>
      <div style={{padding:"15px 22px 12px",borderBottom:`1px solid ${th.border3}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,background:th.sidebar,boxShadow:dark?"none":"0 1px 6px #0001"}}>
        <div>
          <h1 style={{margin:0,fontSize:20,fontWeight:800,color:th.text,letterSpacing:-0.5}}>📋 MarDeTareas</h1>
          <p style={{margin:"2px 0 0",color:th.text5,fontSize:11}}>{totalAll-totalDone} pendientes · {totalDone} completadas</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{height:4,width:110,background:th.border2,borderRadius:99}}><div style={{height:4,borderRadius:99,transition:"width 0.5s",width:totalAll?`${(totalDone/totalAll)*100}%`:"0%",background:"linear-gradient(90deg,#4ECDC4,#6BCB77)"}}/></div>
          <span style={{color:"#4ECDC4",fontWeight:800,fontSize:12}}>{totalAll?Math.round((totalDone/totalAll)*100):0}%</span>
          <button onClick={()=>setDark(d=>!d)} style={{padding:"6px 12px",borderRadius:99,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,fontSize:13,cursor:"pointer"}}>{dark?"☀️":"🌙"}</button>
        </div>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* SIDEBAR */}
        <div style={{width:215,minWidth:215,borderRight:`1px solid ${th.border3}`,display:"flex",flexDirection:"column",overflowY:"auto",background:th.sidebar}}>
          <div style={{padding:"13px 10px 10px"}}>
            <p style={{margin:"0 0 7px 6px",color:th.text6,fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>Navegación</p>
            <SI id="overview" label="Vista General" icon="◫" badge={0}/>
            <SI id="history" label={`Historial (${totalDone})`} icon="✓" badge={0}/>
            <div style={{height:1,background:th.border3,margin:"9px 4px"}}/>
            <p style={{margin:"0 0 7px 6px",color:th.text6,fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>Categorías</p>
            {cats.map(c=><SI key={c.id} id={c.id} label={c.name} icon={c.icon} cIdx={c.colorIdx} badge={c.tasks.filter(t=>!t.done).length}/>)}
            {!showNc?(<button onClick={()=>setShowNc(true)} style={{width:"100%",marginTop:6,padding:"8px 10px",borderRadius:10,border:`1.5px dashed ${th.border}`,background:"transparent",color:th.text6,fontSize:12,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:8}}><span>＋</span> Nueva categoría</button>):(
              <div style={{background:th.surface,borderRadius:12,padding:11,border:`1px solid ${th.border}`,marginTop:6,display:"flex",flexDirection:"column",gap:8}}>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{ICONS.map(ic=><span key={ic} onClick={()=>setNcIcon(ic)} style={{fontSize:16,cursor:"pointer",padding:3,borderRadius:6,background:ncIcon===ic?th.border:"transparent"}}>{ic}</span>)}</div>
                <input autoFocus value={ncName} onChange={e=>setNcName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCat()} placeholder="Nombre..." style={{...inp(th)}}/>
                <div style={{display:"flex",gap:5}}>{COLORS.map((c,i)=><div key={i} onClick={()=>setNcColor(i)} style={{width:18,height:18,borderRadius:99,background:c.bg,cursor:"pointer",border:ncColor===i?"2px solid "+th.text:"2px solid transparent"}}/>)}</div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={addCat} style={{flex:1,padding:"6px 0",borderRadius:8,background:COLORS[ncColor].bg,border:"none",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer"}}>Crear</button>
                  <button onClick={()=>setShowNc(false)} style={{flex:1,padding:"6px 0",borderRadius:8,background:th.border,border:"none",color:th.text4,fontSize:12,cursor:"pointer"}}>✕</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MAIN */}
        <div style={{flex:1,overflowY:"auto",padding:"22px 26px"}}>

          {/* OVERVIEW */}
          {tab==="overview"&&(()=>{
            // Group upcoming tasks by category type
            const managerCat=cats.find(c=>c.type==="meeting");
            const equipoCat=cats.find(c=>c.type==="meeting121eq");
            const otherCats=cats.filter(c=>c.type==="tasks");
            const allUpcoming=allTasks.filter(t=>!t.done&&t.deadline).sort((a,b)=>a.deadline.localeCompare(b.deadline));
            const managerUp=managerCat?managerCat.tasks.filter(t=>!t.done&&t.date).sort((a,b)=>(a.date||"").localeCompare(b.date||"")).slice(0,5):[];
            const equipoUp=equipoCat?equipoCat.tasks.filter(t=>!t.done&&t.date).sort((a,b)=>(a.date||"").localeCompare(b.date||"")).slice(0,5):[];
            const otherUp=allUpcoming.filter(t=>{const cat=cats.find(c=>c.id===t.catId);return cat&&cat.type==="tasks";}).slice(0,8);
            return(
              <div>
                <h2 style={{margin:"0 0 16px",color:th.text,fontSize:17,fontWeight:800}}>Vista General</h2>
                {/* Dashboard */}
                <Dashboard cats={cats} th={th} dark={dark} onNavigate={setTab}/>
                {/* Category cards */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10,marginBottom:24}}>
                  {cats.map(cat=>{
                    const color=gc(COLORS[cat.colorIdx],dark);
                    const pend=cat.tasks.filter(t=>!t.done);const done=cat.tasks.filter(t=>t.done).length;const total=cat.tasks.length;
                    return(
                      <div key={cat.id} onClick={()=>setTab(cat.id)} style={{background:th.cardBg,border:`1px solid ${th.border2}`,borderRadius:13,padding:13,cursor:"pointer",transition:"all 0.18s",boxShadow:dark?"none":"0 2px 8px #0001"}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor=color.accent+"66";e.currentTarget.style.transform="translateY(-2px)";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border2;e.currentTarget.style.transform="none";}}>
                        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
                          <div style={{width:32,height:32,borderRadius:9,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{cat.icon}</div>
                          <div><div style={{color:th.text,fontWeight:700,fontSize:12.5}}>{cat.name}</div><div style={{color:th.text5,fontSize:10}}>{total} {isMeeting(cat.type)?"reuniones":"tareas"}</div></div>
                        </div>
                        <div style={{height:3,background:th.border2,borderRadius:99,marginBottom:6}}><div style={{height:3,borderRadius:99,background:color.bg,width:total?`${(done/total)*100}%`:"0%",transition:"width 0.4s"}}/></div>
                        <span style={{color:th.text5,fontSize:11}}>{done}/{total} hechas</span>
                      </div>
                    );
                  })}
                </div>
                {/* Upcoming grouped */}
                <h3 style={{color:th.text4,fontSize:12,fontWeight:700,marginBottom:12,marginTop:0}}>Próximas reuniones y vencimientos</h3>
                {managerCat&&<UpcomingGroup title={managerCat.name} tasks={managerUp.map(m=>({...m,catId:managerCat.id,catIcon:managerCat.icon,text:m.checklist?.length>0?`${m.checklist.length} puntos`:m.meetingId,deadline:m.date}))} icon={managerCat.icon} color={gc(COLORS[managerCat.colorIdx],dark)} th={th} dark={dark} defaultOpen={true} onNavigate={setTab}/>}
                {equipoCat&&<UpcomingGroup title={equipoCat.name} tasks={equipoUp.map(m=>({...m,catId:equipoCat.id,catIcon:equipoCat.icon,text:m.collaborator||m.meetingId,deadline:m.date}))} icon={equipoCat.icon} color={gc(COLORS[equipoCat.colorIdx],dark)} th={th} dark={dark} defaultOpen={true} onNavigate={setTab}/>}
                {otherUp.length>0&&<UpcomingGroup title="Resto de categorías" tasks={otherUp} icon="📌" color={gc(COLORS[0],dark)} th={th} dark={dark} defaultOpen={false} onNavigate={setTab}/>}
                {managerUp.length===0&&equipoUp.length===0&&otherUp.length===0&&<p style={{color:th.text6,fontSize:13}}>Sin deadlines próximos.</p>}
              </div>
            );
          })()}

          {/* TASKS */}
          {selCat&&selCat.type==="tasks"&&(()=>{
            const cat=selCat;const color=gc(COLORS[cat.colorIdx],dark);const sorted=sortT(cat.tasks);
            return(
              <div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:40,height:40,borderRadius:11,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat.icon}</div>
                    <div><h2 style={{margin:0,color:th.text,fontSize:18,fontWeight:800}}>{cat.name}</h2><span style={{color:th.text5,fontSize:11}}>{cat.tasks.filter(t=>!t.done).length} pendientes · {cat.tasks.filter(t=>t.done).length} completadas</span></div>
                  </div>
                  <div style={{display:"flex",gap:5}}>{[["priority","Prioridad"],["deadline","Deadline"],["createdAt","Creación"]].map(([k,l])=>(<button key={k} onClick={()=>setSortBy(k)} style={{padding:"4px 11px",borderRadius:99,fontSize:11,cursor:"pointer",border:"none",background:sortBy===k?color.light:th.border2,color:sortBy===k?color.tc:th.text5,fontWeight:sortBy===k?700:400}}>{l}</button>))}</div>
                </div>
                <div style={{background:th.surface2,borderRadius:12,padding:12,marginBottom:16,border:`1px solid ${th.border2}`}}>
                  <div style={{display:"flex",gap:7,marginBottom:8}}>
                    <input value={nText[cat.id]||""} onChange={e=>setNText(p=>({...p,[cat.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addTask(cat.id)} placeholder="Nueva tarea..." style={{...inp(th),flex:1}}/>
                    <button onClick={()=>addTask(cat.id)} style={{padding:"8px 14px",borderRadius:8,background:color.bg,border:"none",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>＋</button>
                  </div>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
                    <input type="date" value={nDl[cat.id]||""} onChange={e=>setNDl(p=>({...p,[cat.id]:e.target.value}))} style={{...inp(th,{fontSize:11.5,padding:"4px 8px",colorScheme:dark?"dark":"light"})}}/>
                    {Object.entries(PRIORITY).map(([k])=>(<button key={k} onClick={()=>setNPri(p=>({...p,[cat.id]:k}))} style={{padding:"3px 10px",borderRadius:99,fontSize:11.5,cursor:"pointer",...ps(k,(nPri[cat.id]||"media")===k,dark)}}>{PRIORITY[k].dot} {PRIORITY[k].label}</button>))}
                  </div>
                </div>
                {sorted.length===0&&<p style={{color:th.text6,fontSize:13,textAlign:"center",paddingTop:28}}>Sin tareas aún 🚀</p>}
                {sorted.map(t=>(<TaskRow key={t.id} task={t} color={color} th={th} onToggle={()=>togTask(cat.id,t.id)} onDelete={()=>delTask(cat.id,t.id)} onUpdate={p=>updTask(cat.id,t.id,p)}/>))}
              </div>
            );
          })()}

          {/* 121 MANAGER */}
          {selCat&&selCat.type==="meeting"&&(()=>{
            const cat=selCat;const color=gc(COLORS[cat.colorIdx],dark);
            const pend=cat.tasks.filter(t=>!t.done);const done=cat.tasks.filter(t=>t.done);
            const lastM=pend[0];const pendItems=lastM?(lastM.checklist||[]).filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada"):[];
            return(
              <div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:40,height:40,borderRadius:11,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat.icon}</div>
                    <div><h2 style={{margin:0,color:th.text,fontSize:18,fontWeight:800}}>{cat.name}</h2><span style={{color:th.text5,fontSize:11}}>{pend.length} activas · {done.length} cerradas</span></div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>exportAllMeetings(cats)} style={{padding:"8px 12px",borderRadius:9,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:12,fontWeight:700,cursor:"pointer"}}>⬇ Excel todo</button>
                      <button onClick={()=>addMeeting(cat.id)} style={{padding:"9px 16px",borderRadius:10,background:color.bg,border:"none",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>＋ Nueva reunión</button>
                    </div>
                    {pendItems.length>0&&<span style={{fontSize:10,color:"#FF9F43"}}>↩ Se añadirán {pendItems.length} punto{pendItems.length!==1?"s":""} pendiente{pendItems.length!==1?"s":""}</span>}
                  </div>
                </div>
                {cat.tasks.length>0&&(<div style={{display:"flex",alignItems:"center",gap:10,padding:"4px 13px",marginBottom:4}}>
                  <div style={{width:19,flexShrink:0}}/><span style={{width:95,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>ID</span>
                  <span style={{flex:1,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Puntos</span>
                  <span style={{width:60,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Día</span>
                  <span style={{width:85,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Fecha</span>
                  <span style={{width:90,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Estado</span>
                  <div style={{width:30,flexShrink:0}}/>
                </div>)}
                {cat.tasks.length===0&&<p style={{color:th.text6,fontSize:13,textAlign:"center",paddingTop:28}}>Sin reuniones. Pulsa "Nueva reunión" para empezar 🗓️</p>}
                {[...pend,...done].map(m=>(<MeetingRow key={m.id} meeting={m} color={color} th={th} catName={cat.name} onUpdate={p=>updTask(cat.id,m.id,p)} onDelete={()=>delTask(cat.id,m.id)} onToggle={()=>togTask(cat.id,m.id)} onExport={mt=>exportMeeting(mt,cat.name)}/>))}
              </div>
            );
          })()}

          {/* 121 EQUIPO */}
          {selCat&&selCat.type==="meeting121eq"&&(()=>{
            const cat=selCat;const color=gc(COLORS[cat.colorIdx],dark);
            const pend=cat.tasks.filter(t=>!t.done);const done=cat.tasks.filter(t=>t.done);
            // Group by collaborator for display
            const collabs=[...new Set(pend.map(m=>m.collaborator||""))];
            return(
              <div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:40,height:40,borderRadius:11,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat.icon}</div>
                    <div><h2 style={{margin:0,color:th.text,fontSize:18,fontWeight:800}}>{cat.name}</h2><span style={{color:th.text5,fontSize:11}}>{pend.length} activas · {done.length} cerradas · 1 reunión = 1 colaborador</span></div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>exportAllMeetings(cats)} style={{padding:"8px 12px",borderRadius:9,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:12,fontWeight:700,cursor:"pointer"}}>⬇ Excel todo</button>
                    <button onClick={()=>addTeamMeeting(cat.id)} style={{padding:"9px 16px",borderRadius:10,background:color.bg,border:"none",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>＋ Nueva reunión</button>
                  </div>
                </div>
                {/* Collaborator avatars summary */}
                {collabs.length>0&&(<div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
                  {collabs.filter(Boolean).map(collab=>{
                    const meetings=pend.filter(m=>m.collaborator===collab);
                    const totalChk=meetings.reduce((a,m)=>a+(m.checklist||[]).length,0);
                    const doneChk=meetings.reduce((a,m)=>a+(m.checklist||[]).filter(i=>i.state==="Completada").length,0);
                    return(<div key={collab} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,background:color.light,border:`1px solid ${color.accent}33`}}>
                      <div style={{width:28,height:28,borderRadius:99,background:color.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff",fontWeight:800}}>{collab[0].toUpperCase()}</div>
                      <div><div style={{fontSize:12,fontWeight:700,color:color.tc}}>{collab}</div><div style={{fontSize:10,color:color.tc+"99"}}>{totalChk>0?`${doneChk}/${totalChk} completados`:"Sin puntos"}</div></div>
                    </div>);
                  })}
                </div>)}
                {cat.tasks.length>0&&(<div style={{display:"flex",alignItems:"center",gap:10,padding:"4px 13px",marginBottom:4}}>
                  <div style={{width:19,flexShrink:0}}/><div style={{width:28,flexShrink:0}}/>
                  <span style={{flex:1,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Colaborador / Puntos</span>
                  <span style={{width:60,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Día</span>
                  <span style={{width:85,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Fecha</span>
                  <span style={{width:90,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Estado</span>
                  <div style={{width:30,flexShrink:0}}/>
                </div>)}
                {cat.tasks.length===0&&<p style={{color:th.text6,fontSize:13,textAlign:"center",paddingTop:28}}>Sin reuniones. Pulsa "Nueva reunión" para empezar 🗓️</p>}
                {[...pend,...done].map(m=>(<TeamMeetingRow key={m.id} meeting={m} color={color} th={th} catName={cat.name} onUpdate={p=>updTask(cat.id,m.id,p)} onDelete={()=>delTask(cat.id,m.id)} onToggle={()=>togTask(cat.id,m.id)} onExport={mt=>exportMeeting(mt,cat.name)}/>))}
              </div>
            );
          })()}

          {/* HISTORY */}
          {tab==="history"&&(
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5,flexWrap:"wrap",gap:10}}>
                <div><h2 style={{color:th.text,fontSize:18,fontWeight:800,margin:0}}>Historial</h2><p style={{color:th.text5,fontSize:11,margin:"3px 0 0"}}>{totalDone} tareas finalizadas</p></div>
                {doneTasks.length>0&&<button onClick={()=>exportHistorial(doneTasks)} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 14px",borderRadius:10,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:13,fontWeight:700,cursor:"pointer"}}>⬇ Exportar Excel</button>}
              </div>
              <p style={{color:th.text6,fontSize:11,marginBottom:18}}>Exporta reuniones desde cada categoría 121.</p>
              {doneTasks.length===0&&<p style={{color:th.text6,fontSize:13,textAlign:"center",paddingTop:36}}>Aún no hay tareas completadas.</p>}
              {doneTasks.map(t=>{
                const color=t.catColor;const chkD=(t.checklist||[]).filter(i=>i.done).length;const chkT=(t.checklist||[]).length;
                return(<div key={t.id} style={{display:"flex",alignItems:"flex-start",gap:12,background:th.cardBg,borderRadius:11,padding:"11px 13px",marginBottom:7,border:`1px solid ${th.border3}`,boxShadow:dark?"none":"0 1px 3px #0001"}}>
                  <div style={{width:28,height:28,borderRadius:8,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{t.catIcon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:th.text4,fontSize:13,textDecoration:"line-through",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.text||""}</div>
                    <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap",alignItems:"center"}}>
                      <span style={{color:color.tc,fontSize:10,background:color.light,padding:"1px 7px",borderRadius:99}}>{t.catName}</span>
                      <span style={{color:th.text6,fontSize:10}}>📅 <span style={{color:th.text4}}>{fmt(t.createdAt)}</span></span>
                      {t.completedAt&&<span style={{fontSize:10,color:"#6BCB77"}}>✓ {fmt(t.completedAt)}</span>}
                      {t.deadline&&<span style={{color:th.text6,fontSize:10}}>⏱ <span style={{color:th.text4}}>{fmt(t.deadline)}</span></span>}
                      {chkT>0&&<span style={{color:th.text4,fontSize:10}}>☑ {chkD}/{chkT}</span>}
                    </div>
                  </div>
                  <button onClick={()=>togTask(t.catId,t.id)} style={{background:th.border2,border:"none",borderRadius:7,padding:"4px 9px",color:th.text4,fontSize:11,cursor:"pointer",flexShrink:0}}>Reabrir</button>
                </div>);
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
