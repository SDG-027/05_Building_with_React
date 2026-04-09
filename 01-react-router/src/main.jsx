import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter aktiviert Client-Side Routing für die gesamte App */}
    {/* Für andere Router-Arten würden wir auch hier eine andere Komponente verwenden */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
