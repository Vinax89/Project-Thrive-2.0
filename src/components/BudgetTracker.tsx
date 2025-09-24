import React from 'react';
import Button from './Button';
import Input from './Input';
import type { Budget } from '../types';
import { fmt } from '../utils/currency';

export default function BudgetTracker({budgets, onAdd, onUpdate, onDelete}:{budgets:Budget[]; onAdd:(b:Budget)=>void; onUpdate:(b:Budget)=>void; onDelete:(id:string)=>void}){
  const [draft, setDraft] = React.useState<Budget>({ id: crypto.randomUUID(), category:'', allocated:0, spent:0 });
  return (
    <div className="space-y-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-4">Category</th><th className="py-2 pr-4">Allocated</th><th className="py-2 pr-4">Spent</th><th className="py-2 pr-4"></th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(b=>(
            <tr key={b.id} className="border-b">
              <td className="py-2 pr-4">{b.category}</td>
              <td className="py-2 pr-4">{fmt(b.allocated)}</td>
              <td className="py-2 pr-4">{fmt(b.spent)}</td>
              <td className="py-2 pr-4"><Button variant="danger" onClick={()=>onDelete(b.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <Input placeholder="Category" value={draft.category} onChange={e=>setDraft({...draft, category:e.target.value})} />
        <Input placeholder="Allocated" type="number" value={draft.allocated} onChange={e=>setDraft({...draft, allocated: parseFloat(e.target.value)||0})} />
        <Input placeholder="Spent" type="number" value={draft.spent} onChange={e=>setDraft({...draft, spent: parseFloat(e.target.value)||0})} />
        <Button onClick={()=>{ if(!draft.category) return; onAdd(draft); setDraft({ id: crypto.randomUUID(), category:'', allocated:0, spent:0 }); }}>Add</Button>
      </div>
    </div>
  );
}
