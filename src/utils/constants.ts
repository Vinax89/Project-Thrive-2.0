import type { Budget, Goal, Debt, RecurringTransaction } from '../types';
export const SEEDED = {
  budgets: [
    { id:'b1', category:'Housing', allocated: 2000, spent: 2000 },
    { id:'b2', category:'Power', allocated: 200, spent: 180 },
    { id:'b3', category:'Internet', allocated: 80, spent: 80 },
    { id:'b4', category:'Groceries', allocated: 600, spent: 520 },
    { id:'b5', category:'Dining', allocated: 300, spent: 290 },
    { id:'b6', category:'Debt', allocated: 1500, spent: 1500 },
  ] as Budget[],
  goals: [
    { id:'g1', name:'Emergency Fund', target: 10000, current: 3500 },
    { id:'g2', name:'Down Payment', target: 50000, current: 12000, due:'2027-06-01' },
  ] as Goal[],
  debts: [
    { id:'d1', name:'Visa', balance: 5200, apr: 19.99, minPayment: 75 },
    { id:'d2', name:'Auto Loan', balance: 14200, apr: 6.5, minPayment: 280 },
    { id:'d3', name:'Student Loan', balance: 22000, apr: 5.2, minPayment: 190 },
  ] as Debt[],
  recurring: [
    { id:'r1', name:'Paycheck', amount: 5200, type:'income', cadence:'monthly' },
    { id:'r2', name:'Rent', amount: -2000, type:'expense', cadence:'monthly' },
  ] as RecurringTransaction[],
  bnpl: []
};
