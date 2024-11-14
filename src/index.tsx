import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Importer BrowserRouter
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Ajouter BrowserRouter une seule fois ici */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
