import React from 'react';
import Modal from './Modal';
export default function BNPLTrackerModal({open,onClose,plans}:{open:boolean; onClose:()=>void; plans:any[]}){
  return (
    <Modal open={open} onClose={onClose} title="BNPL Plans">
      <div className="text-sm text-gray-600">{plans.length} plans found.</div>
    </Modal>
  );
}
