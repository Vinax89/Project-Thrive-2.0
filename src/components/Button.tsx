import React from 'react';
export default function Button({children, variant='primary', ...props}:{children:React.ReactNode, variant?:'primary'|'secondary'|'danger'} & React.ButtonHTMLAttributes<HTMLButtonElement>){
  const base = 'px-3 py-2 rounded-md text-sm font-medium';
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }[variant];
  return <button className={`${base} ${styles}`} {...props}>{children}</button>
}
