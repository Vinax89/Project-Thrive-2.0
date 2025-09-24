import React from 'react';
export default function SankeyFlow({flows}:{flows:{source:string;target:string;amount:number}[]}){
  const total = flows.reduce((s,f)=>s+f.amount,0) || 1;
  return (
    <div className="space-y-1">
      {flows.map((f,i)=>(
        <div key={i} className="flex items-center gap-2">
          <div className="w-28 text-xs text-gray-600">{f.source} → {f.target}</div>
          <div className="h-3 bg-blue-100 rounded w-full">
            <div className="h-3 bg-blue-600 rounded" style={{width: `${Math.round((f.amount/total)*100)}%`}} />
          </div>
          <div className="w-20 text-right text-xs">${f.amount.toFixed(0)}</div>
        </div>
      ))}
    </div>
  );
}
