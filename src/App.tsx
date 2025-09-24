import React, { useMemo, useState } from 'react';
import Button from './components/Button';
import ThemeToggle from './components/ThemeToggle';
import CommandPalette from './components/CommandPalette';
import useHotkeys from './hooks/useHotkeys';
import BudgetTracker from './components/BudgetTracker';
import CashFlowProjection from './components/CashFlowProjection';
import BNPLTrackerModal from './components/BNPLTrackerModal';
import ShiftImpactModal from './components/ShiftImpactModal';
import DebtScheduleViewer from './components/DebtScheduleViewer';
import ManageDebtsModal from './components/modals/ManageDebtsModal';
import ManageGoalsModal from './components/modals/ManageGoalsModal';
import ManageObligationsModal from './components/modals/ManageObligationsModal';
import { payoff } from './logic/debt';
import { evaluateBadges } from './logic/badges';
import { SEEDED } from './utils/constants';
import { exportJSON, exportCSVBudgets, exportPDF } from './utils/export';
import toast from 'react-hot-toast';
import DebtVelocityChart from './components/reports/DebtVelocityChart';
import SpendingHeatmap from './components/reports/SpendingHeatmap';
import GoalWaterfall from './components/reports/GoalWaterfall';
import SankeyFlow from './components/reports/SankeyFlow';
import type { Budget, Goal, RecurringTransaction, Obligation, Debt } from './types';

type Tab = 'dashboard' | 'budgets' | 'projection' | 'reports';

export default function App(){
  const [tab, setTab] = useState<Tab>('dashboard');
  const [strategy, setStrategy] = useState<'avalanche'|'snowball'>('avalanche');

  const [budgets, setBudgets] = useState<Budget[]>(() => SEEDED.budgets);
  const [recurring, setRecurring] = useState<RecurringTransaction[]>(() => SEEDED.recurring);
  const [goals, setGoals] = useState<Goal[]>(() => SEEDED.goals);
  const [debts, setDebts] = useState<Debt[]>(() => SEEDED.debts);
  const [obligations, setObligations] = useState<Obligation[]>([]);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showBNPL, setShowBNPL] = useState(false);
  const [showShiftImpact, setShowShiftImpact] = useState(false);
  const [showManageDebts, setShowManageDebts] = useState(false);
  const [showManageGoals, setShowManageGoals] = useState(false);
  const [showManageObligations, setShowManageObligations] = useState(false);

  const monthlyDebtBudget = useMemo(()=> budgets.find(b=>b.category==='Debt')?.allocated ?? 1500, [budgets]);

  const plan = useMemo(()=> {
    const unlocked = new Set<string>();
    return payoff(debts, monthlyDebtBudget, strategy, 600, (step)=> {
      const newly = evaluateBadges(step as any, unlocked);
      if (newly.length) toast.success('Milestone: ' + newly.join(', '));
      return newly;
    });
  }, [debts, monthlyDebtBudget, strategy]);

  const heatmap = useMemo(()=>{
    const cats = budgets.slice(0,5);
    return Array.from({length: cats.length}, (_, i) =>
      Array.from({length:12}, (_, m) => Math.max(0, Math.round((cats[i].spent + (m*13)) )))
    );
  }, [budgets]);

  const flows = useMemo(()=>{
    const income = recurring.filter(r=>r.type==='income').reduce((s,r)=>s+r.amount,0);
    const essentials = budgets.filter(b=>['Housing','Car','Groceries','Power','Internet','Insurance'].includes(b.category)).reduce((s,b)=>s+b.spent,0);
    const dining = budgets.find(b=>b.category==='Dining')?.spent ?? 0;
    const debt = budgets.find(b=>b.category==='Debt')?.spent ?? 0;
    const save = Math.max(0, income - (essentials+dining+debt));
    return [
      { source: 'Income', target: 'Essentials', amount: essentials },
      { source: 'Income', target: 'Dining', amount: dining },
      { source: 'Income', target: 'Debt', amount: debt },
      { source: 'Income', target: 'Save/Goals', amount: save },
    ];
  }, [budgets, recurring]);

  useHotkeys([
    ['meta+k', ()=> setPaletteOpen(true)],
    ['ctrl+k', ()=> setPaletteOpen(true)],
    ['shift+b', ()=> setTab('budgets')],
    ['shift+d', ()=> setShowManageDebts(true)],
    ['shift+g', ()=> setTab('dashboard')],
  ]);

  function handleExport(kind: 'json'|'csv'|'pdf') {
    const payload = { budgets, recurring, goals, debts, bnpl: SEEDED.bnpl };
    if (kind === 'json') exportJSON('chatpay-data.json', payload);
    if (kind === 'csv') exportCSVBudgets('chatpay-budgets.csv', budgets);
    if (kind === 'pdf') exportPDF('chatpay-summary.pdf',
      'ChatPay Summary\n\n' +
      'Budgets: ' + budgets.length + '\n' +
      'Recurring: ' + recurring.length + '\n' +
      'Goals: ' + goals.length + '\n' +
      'Debts: ' + debts.length + '\n' +
      'BNPL: ' + SEEDED.bnpl.length + '\n'
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/public/logo.svg" alt="logo" className="w-6 h-6" />
            <div className="font-semibold">ChatPay v6.3.0 — Project Thrive</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={tab==='dashboard'?'primary':'secondary'} onClick={()=>setTab('dashboard')}>Dashboard</Button>
            <Button variant={tab==='budgets'?'primary':'secondary'} onClick={()=>setTab('budgets')}>Budgets</Button>
            <Button variant={tab==='projection'?'primary':'secondary'} onClick={()=>setTab('projection')}>Projection</Button>
            <Button variant={tab==='reports'?'primary':'secondary'} onClick={()=>setTab('reports')}>Reports</Button>
            <Button variant="secondary" onClick={()=>setShowManageDebts(true)}>Debts</Button>
            <Button variant="secondary" onClick={()=>setShowManageGoals(true)}>Goals</Button>
            <Button variant="secondary" onClick={()=>setShowManageObligations(true)}>Obligations</Button>
            <Button variant="secondary" onClick={()=>setShowBNPL(true)}>BNPL</Button>
            <Button variant="secondary" onClick={()=>setShowShiftImpact(true)}>Shift Impact</Button>
            <Button variant="secondary" onClick={()=>handleExport('json')}>Export JSON</Button>
            <Button variant="secondary" onClick={()=>handleExport('csv')}>CSV</Button>
            <Button variant="secondary" onClick={()=>handleExport('pdf')}>PDF</Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500">Months to Payoff (Budget ${monthlyDebtBudget})</div>
                <div className="text-2xl font-semibold">{plan.months}</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500">Total Interest</div>
                <div className="text-2xl font-semibold">${plan.totalInterest.toFixed(2)}</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500">Strategy</div>
                <div className="flex items-center gap-2">
                  <button className={`px-3 py-1 rounded ${strategy==='avalanche'?'bg-blue-600 text-white':'bg-gray-200'}`} onClick={()=>setStrategy('avalanche')}>Avalanche</button>
                  <button className={`px-3 py-1 rounded ${strategy==='snowball'?'bg-blue-600 text-white':'bg-gray-200'}`} onClick={()=>setStrategy('snowball')}>Snowball</button>
                </div>
              </div>
            </div>
            <DebtScheduleViewer plan={plan} />
          </div>
        )}

        {tab === 'budgets' && (
          <BudgetTracker
            budgets={budgets}
            onAdd={b=>setBudgets(prev=>[...prev,b])}
            onUpdate={b=>setBudgets(prev=>prev.map(x=>x.id===b.id?b:x))}
            onDelete={id=>setBudgets(prev=>prev.filter(x=>x.id!==id))}
          />
        )}

        {tab === 'projection' && (
          <CashFlowProjection currentBalance={0} recurring={recurring} months={12} />
        )}

        {tab === 'reports' && (
          <div className="space-y-6">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="font-medium mb-2">Debt Velocity</div>
              <DebtVelocityChart plan={plan} />
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="font-medium mb-2">Spending Heatmap</div>
              <SpendingHeatmap matrix={Array.from({length:4},()=>Array.from({length:12},(_,m)=>m*20+10))} />
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="font-medium mb-2">Goal Waterfall</div>
              <GoalWaterfall goals={goals.map(g=>({ name:g.name, current:g.current, target:g.target }))} />
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="font-medium mb-2">Income Flow</div>
              <SankeyFlow flows={[
                { source:'Income', target:'Essentials', amount: 2500 },
                { source:'Income', target:'Dining', amount: 300 },
                { source:'Income', target:'Debt', amount: 1500 },
                { source:'Income', target:'Save/Goals', amount: 900 },
              ]} />
            </div>
          </div>
        )}
      </main>

      <CommandPalette
        open={paletteOpen}
        onClose={()=>setPaletteOpen(false)}
        commands={[
          { id: 'goto-dashboard', label: 'Go to: Dashboard', action: ()=> setTab('dashboard') },
          { id: 'goto-budgets', label: 'Go to: Budgets', action: ()=> setTab('budgets') },
          { id: 'goto-projection', label: 'Go to: Projection', action: ()=> setTab('projection') },
          { id: 'goto-reports', label: 'Go to: Reports', action: ()=> setTab('reports') },
          { id: 'open-bnpl', label: 'Open: BNPL Tracker', action: ()=> setShowBNPL(true) },
          { id: 'open-shift', label: 'Open: Shift Impact', action: ()=> setShowShiftImpact(true) },
          { id: 'open-debts', label: 'Open: Manage Debts', action: ()=> setShowManageDebts(true) },
          { id: 'open-goals', label: 'Open: Manage Goals', action: ()=> setShowManageGoals(true) },
          { id: 'open-obligations', label: 'Open: Manage Obligations', action: ()=> setShowManageObligations(true) },
        ]}
      />

      <BNPLTrackerModal open={showBNPL} onClose={()=>setShowBNPL(false)} plans={[]} />
      <ShiftImpactModal open={showShiftImpact} onClose={()=>setShowShiftImpact(false)} />
      <ManageDebtsModal open={showManageDebts} onClose={()=>setShowManageDebts(false)} debts={debts} onChange={setDebts} />
      <ManageGoalsModal open={showManageGoals} onClose={()=>setShowManageGoals(false)} goals={goals} onChange={setGoals} />
      <ManageObligationsModal open={showManageObligations} onClose={()=>setShowManageObligations(false)} obligations={obligations} onChange={setObligations} />
    </div>
  );
}
