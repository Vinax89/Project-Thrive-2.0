import React from 'react';
export default function SpendingHeatmap({matrix}:{matrix:number[][]}){
  return (
    <div className="grid grid-cols-12 gap-1">
      {matrix.flatMap((row, r)=>
        row.map((v,c)=>{
          const g = Math.min(255, Math.max(40, 40 + v % 215));
          return <div key={`${r}-${c}`} title={String(v)} style={{height:16}} className="rounded" 
            style={{height:16, background:`rgb(${255-g},${255-g},255)`}} />;
        })
      )}
    </div>
  );
}
