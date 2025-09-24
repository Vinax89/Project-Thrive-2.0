export type Cadence = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
export type Budget = { id: string; category: string; allocated: number; spent: number };
export type Goal = { id: string; name: string; target: number; current: number; due?: string };
export type Debt = { id: string; name: string; balance: number; apr: number; minPayment: number };
export type RecurringTransaction = { id: string; name: string; amount: number; type: 'income'|'expense'; cadence: Cadence };
export type Obligation = { id: string; name: string; amount: number; cadence: Cadence; dueDate?: string };
export type PayoffStep = { month: number; allocations: { id: string; name: string; amount: number }[]; interest: number; balanceAfter: number };
export type PayoffPlan = { months: number; totalInterest: number; steps: PayoffStep[] };
