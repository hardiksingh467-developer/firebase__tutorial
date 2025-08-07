import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MyState from './context/data/myState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyState>
      <App />
    </MyState>
  </StrictMode>,
)
