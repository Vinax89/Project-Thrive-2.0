import React from 'react';
export default function GoalWaterfall({goals}:{goals:{name:string,current:number,target:number}[]}){
  return (
    <div className="space-y-2">
      {goals.map(g=>{
        const p = Math.min(100, Math.round((g.current/g.target)*100));
        return (
          <div key={g.name}>
            <div className="text-sm mb-1">{g.name} — {p}%</div>
            <div className="h-3 w-full bg-gray-200 rounded">
              <div className="h-3 bg-blue-600 rounded" style={{width:`${p}%`}} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
