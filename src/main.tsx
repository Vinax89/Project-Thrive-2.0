import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';

const el = document.getElementById('root');
if(!el) throw new Error('Missing #root');
createRoot(el).render(<><App /><Toaster position="top-right" /></>);
