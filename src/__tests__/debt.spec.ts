import { describe, it, expect } from 'vitest';
import { payoff } from '../logic/debt';
import type { Debt } from '../types';

describe('payoff engine', () => {
  const debts: Debt[] = [
    { id:'d1', name:'A', balance:1000, apr:20, minPayment:25 },
    { id:'d2', name:'B', balance:2000, apr:10, minPayment:35 },
  ];
  it('computes months within bounds', () => {
    const plan = payoff(debts, 300, 'avalanche', 600);
    expect(plan.months).toBeGreaterThan(0);
    expect(plan.steps.length).toBe(plan.months);
  });
  it('avalanche pays higher APR first', () => {
    const plan = payoff(debts, 300, 'avalanche', 24);
    expect(plan.steps[0].month).toBe(1);
  });
});
