import React from 'react';
export default function ThemeToggle(){
  const [dark, setDark] = React.useState(()=>window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  React.useEffect(()=>{ document.documentElement.classList.toggle('dark', dark); }, [dark]);
  return <button className="px-2 py-1 text-sm rounded border" onClick={()=>setDark(d=>!d)}>{dark?'Light':'Dark'}</button>;
}
