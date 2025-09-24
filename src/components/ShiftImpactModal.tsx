import React from 'react';
import Modal from './Modal';
export default function ShiftImpactModal({open,onClose}:{open:boolean; onClose:()=>void}){
  return (
    <Modal open={open} onClose={onClose} title="Shift Impact">
      <p className="text-sm text-gray-600">Model how extra shifts affect payoff timelines. (Coming next: slider + recompute plan)</p>
    </Modal>
  );
}
