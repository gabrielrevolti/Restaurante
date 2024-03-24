import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RegisterProduct from './pages/register.tsx'
import Index from './pages/home/index.tsx'
import Product from './pages/product.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element={<App/>}/>
      <Route path="/" element={<Index/>}/>
      <Route path="register"element={<RegisterProduct/>}/>
      <Route path="product" element={<Product/>}/>
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)