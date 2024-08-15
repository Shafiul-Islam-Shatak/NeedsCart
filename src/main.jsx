import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router.jsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './Provider/Authprovider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster></Toaster>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </StrictMode>,
)
