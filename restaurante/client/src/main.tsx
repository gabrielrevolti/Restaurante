import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./global.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home.tsx'
import RegisterProduct from './pages/register.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element={<App/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="register"element={<RegisterProduct/>}/>
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
