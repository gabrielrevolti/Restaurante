import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RegisterProduct from './pages/register.jsx'
import Index from './pages/home/index.jsx'
import UpdateItem from './pages/update.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element={<App/>}/>
      <Route path="/" element={<Index/>}/>
      <Route path="register"element={<RegisterProduct/>}/>
      <Route path="update/:id" element={<UpdateItem/>}/>
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)