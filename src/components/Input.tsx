import React from 'react';
export default function Input({label, ...props}:{label?:string} & React.InputHTMLAttributes<HTMLInputElement>){
  return (
    <label className="block text-sm">
      {label && <span className="text-gray-600">{label}</span>}
      <input className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
    </label>
  );
}
