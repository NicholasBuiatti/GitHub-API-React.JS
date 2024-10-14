import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// IMPORTO PRIMA BOOTSTRAP E POI IL CSS BASE PER EVITARE CONFLITTI
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
