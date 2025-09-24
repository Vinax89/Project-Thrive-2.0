import { Parser } from 'json2csv';
import jsPDF from 'jspdf';

export function exportJSON(filename:string, data:any){
  const s = JSON.stringify(data, null, 2);
  const blob = new Blob([s], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
}

export function exportCSVBudgets(filename:string, budgets:{category:string,allocated:number,spent:number}[]){
  const parser = new Parser({ fields:['category','allocated','spent'] });
  const csv = parser.parse(budgets);
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
}

export function exportPDF(filename:string, text:string){
  const doc = new jsPDF(); const lines = doc.splitTextToSize(text, 180); doc.text(lines, 15, 20); doc.save(filename);
}
