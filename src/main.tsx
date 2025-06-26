import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppWithDatabase from './AppWithDatabase.tsx'
import './index.css'

// Toggle between test app and database app
// Set to false for basic React test, true for SQL.js database testing
const USE_DATABASE = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {USE_DATABASE ? <AppWithDatabase /> : <App />}
  </React.StrictMode>,
)