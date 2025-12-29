import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from './redux/store.js'
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
/*
  <StrictMode>
*/
      <BrowserRouter>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
                <ToastContainer autoClose={3000}/>
            </PersistGate>
          </Provider>
      </BrowserRouter>
/*
  </StrictMode>,
*/
)
