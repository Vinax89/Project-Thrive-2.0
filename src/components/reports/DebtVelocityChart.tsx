import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { PayoffPlan } from '../../types';
export default function DebtVelocityChart({plan}:{plan:PayoffPlan}){
  const data = plan.steps.map(s=>({ name: 'M'+s.month, balance: Math.max(0, s.balanceAfter) }));
  return (
    <div style={{width:'100%', height:300}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#2563eb" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
