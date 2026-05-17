import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App.jsx'

// REDUX
import { Provider } from 'react-redux'

import {Store} from './redux/Store.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <Provider store={Store}>

      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </Provider>

  </StrictMode>,
)