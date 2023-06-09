import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import store from './app/store.tsx'
import { Provider } from "react-redux"

import App from './App.tsx'

import '@sweetalert2/theme-bulma/bulma.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
