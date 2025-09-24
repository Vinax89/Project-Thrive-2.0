import type { PayoffStep } from '../types';
export function evaluateBadges(step: PayoffStep, unlocked: Set<string>){
  const newOnes:string[] = [];
  if(step.balanceAfter < 10000 && !unlocked.has('Sub-10k')) { unlocked.add('Sub-10k'); newOnes.push('Sub-10k'); }
  if(step.month % 12 === 0 && !unlocked.has('One Year')) { unlocked.add('One Year'); newOnes.push('One Year'); }
  return newOnes;
}
