import React from 'react';
import type { PayoffPlan } from '../types';
export default function DebtScheduleViewer({plan}:{plan:PayoffPlan}){
  return (
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-full text-sm">
        <thead><tr className="text-left border-b"><th className="py-2 px-3">Month</th><th className="py-2 px-3">Interest</th><th className="py-2 px-3">Balance After</th></tr></thead>
        <tbody>
          {plan.steps.slice(0,120).map(s=>(
            <tr key={s.month} className="border-b">
              <td className="py-2 px-3">M{s.month}</td>
              <td className="py-2 px-3">${s.interest.toFixed(2)}</td>
              <td className="py-2 px-3">${Math.max(0,s.balanceAfter).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
