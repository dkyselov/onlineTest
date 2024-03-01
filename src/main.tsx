import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'
import {DataProvider} from "./data-context.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <DataProvider>
          <App />
      </DataProvider>
  </React.StrictMode>,
)
