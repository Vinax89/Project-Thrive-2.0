import React from 'react';
import type { RecurringTransaction } from '../types';
export default function CashFlowProjection({currentBalance, recurring, months=12}:{currentBalance:number; recurring:RecurringTransaction[]; months?:number}){
  const rows = Array.from({length:months}, (_,i)=>{
    const delta = recurring.reduce((s,r)=> s + (r.type==='income'? r.amount : -Math.abs(r.amount)), 0);
    currentBalance += delta;
    return { month:i+1, balance: currentBalance };
  });
  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead><tr className="text-left border-b"><th className="py-2 pr-4">Month</th><th className="py-2 pr-4">Projected Balance</th></tr></thead>
        <tbody>{rows.map(r=>(<tr key={r.month} className="border-b"><td className="py-2 pr-4">M{r.month}</td><td className="py-2 pr-4">${r.balance.toFixed(2)}</td></tr>))}</tbody>
      </table>
    </div>
  );
}
