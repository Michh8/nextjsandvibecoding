'use client';
import { createContext,useContext,useState,useEffect } from 'react';
export type Task={id:string;title:string;subject:string;priority:'Alta'|'Media'|'Baja';done:boolean};
export type Session={id:string;minutes:number;date:string};
type Store={tasks:Task[];sessions:Session[]};
const initial:Store={tasks:[],sessions:[]};
const Context=createContext<{store:Store;ready:boolean;notice:string;add:(task:Omit<Task,'id'|'done'>)=>void;toggle:(id:string)=>void;remove:(id:string)=>void;finish:(minutes:number)=>void}|null>(null);
function valid(value:unknown):value is Store{if(!value||typeof value!=='object')return false;const s=value as Store;return Array.isArray(s.tasks)&&Array.isArray(s.sessions)&&s.tasks.every(t=>typeof t.id==='string'&&typeof t.title==='string'&&typeof t.subject==='string'&&['Alta','Media','Baja'].includes(t.priority)&&typeof t.done==='boolean')&&s.sessions.every(t=>typeof t.id==='string'&&Number.isFinite(t.minutes)&&t.minutes>0&&typeof t.date==='string'&&!Number.isNaN(Date.parse(t.date)));}
export function StudyProvider({children}:{children:React.ReactNode}){
 const [store,setStore]=useState<Store>(initial);const [ready,setReady]=useState(false);const [notice,setNotice]=useState('');
 useEffect(()=>{try{const raw=localStorage.getItem('focuslab-v1');if(raw){const parsed:unknown=JSON.parse(raw);if(valid(parsed))setStore(parsed);else setNotice('Los datos guardados no se pudieron leer. Puedes comenzar de nuevo.');}}catch{setNotice('No pudimos leer el almacenamiento de este navegador.');}setReady(true);},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem('focuslab-v1',JSON.stringify(store));}catch{setNotice('El navegador no permite guardar. Tus cambios durarán solo esta visita.');}},[store,ready]);
 return <Context.Provider value={{store,ready,notice,add:task=>setStore(s=>({...s,tasks:[...s.tasks,{...task,id:crypto.randomUUID(),done:false}]})),toggle:id=>setStore(s=>({...s,tasks:s.tasks.map(t=>t.id===id?{...t,done:!t.done}:t)})),remove:id=>setStore(s=>({...s,tasks:s.tasks.filter(t=>t.id!==id)})),finish:minutes=>setStore(s=>({...s,sessions:[...s.sessions,{id:crypto.randomUUID(),minutes,date:new Date().toISOString()}]}))}}>{children}</Context.Provider>
}
export function useStudy(){const value=useContext(Context);if(!value)throw new Error('Missing provider');return value;}
