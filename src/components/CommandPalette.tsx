import React from 'react';
export default function CommandPalette({open, onClose, commands}:{open:boolean; onClose:()=>void; commands:{id:string; label:string; action:()=>void}[]}){
  const [q, setQ] = React.useState('');
  const list = commands.filter(c=>c.label.toLowerCase().includes(q.toLowerCase()));
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-4" onClick={e=>e.stopPropagation()}>
        <input autoFocus placeholder="Type a command..." value={q} onChange={e=>setQ(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3" />
        <ul className="max-h-80 overflow-auto divide-y">
          {list.map(c=>(
            <li key={c.id} className="py-2 cursor-pointer hover:bg-gray-50 px-2 rounded" onClick={()=>{c.action(); onClose();}}>{c.label}</li>
          ))}
          {!list.length && <li className="py-2 text-sm text-gray-500 px-2">No matches</li>}
        </ul>
      </div>
    </div>
  );
}
