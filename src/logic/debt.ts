import type { Debt, PayoffPlan } from '../types';

export function payoff(debts: Debt[], monthlyBudget: number, method: 'avalanche'|'snowball', maxMonths=600, onStep?: (s:any)=>void): PayoffPlan {
  const order = debts.slice().sort((a,b)=> method==='avalanche' ? b.apr - a.apr : a.balance - b.balance );
  const state = order.map(d=>({ ...d }));
  const steps = [];
  let month = 0; let totalInterest = 0;
  while(month < maxMonths && state.some(d=>d.balance>0)){
    month++;
    let budget = monthlyBudget;
    let interestThisMonth = 0;
    // accrue interest
    for(const d of state){
      if(d.balance<=0) continue;
      const i = d.balance * (d.apr/100) / 12;
      interestThisMonth += i;
      d.balance += i;
    }
    // pay min
    for(const d of state){
      if(d.balance<=0) continue;
      const pay = Math.min(d.minPayment, d.balance);
      d.balance -= pay; budget -= pay;
    }
    // snowball extra into first eligible
    for(const d of state){
      if(budget<=0) break;
      if(d.balance<=0) continue;
      const pay = Math.min(budget, d.balance);
      d.balance -= pay; budget -= pay;
    }
    totalInterest += interestThisMonth;
    const balanceAfter = state.reduce((s,d)=>s+Math.max(0,d.balance),0);
    const allocations = state.map(d=>({ id:d.id, name:d.name, amount: Math.max(0, d.minPayment) }));
    const step = { month, allocations, interest: interestThisMonth, balanceAfter };
    steps.push(step);
    onStep?.(step);
  }
  return { months: month, totalInterest, steps };
}
