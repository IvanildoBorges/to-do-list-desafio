import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Global from './styles/Global.tsx';
import "./styles/imports.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global />
    <App />
  </StrictMode>,
)
