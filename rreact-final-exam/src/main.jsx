import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Provider } from 'react-redux'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './store.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
       <Provider  store={store}> 
    <BrowserRouter>
         <App />
    </BrowserRouter>
       </Provider>
  </StrictMode>
)
