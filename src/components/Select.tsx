import React from 'react';
export default function Select({label, children, ...props}:{label?:string} & React.SelectHTMLAttributes<HTMLSelectElement>){
  return (
    <label className="block text-sm">
      {label && <span className="text-gray-600">{label}</span>}
      <select className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" {...props}>
        {children}
      </select>
    </label>
  );
}
