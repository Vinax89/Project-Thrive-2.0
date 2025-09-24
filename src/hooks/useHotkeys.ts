import { useEffect } from 'react';
export default function useHotkeys(bindings: [string, ()=>void][]) {
  useEffect(()=>{
    function onKey(e: KeyboardEvent){
      const combo = `${e.ctrlKey?'ctrl+':''}${e.metaKey?'meta+':''}${e.shiftKey?'shift+':''}${e.key.toLowerCase()}`;
      bindings.forEach(([k,fn])=>{ if(k===combo){ e.preventDefault(); fn(); } });
    }
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [bindings]);
}
