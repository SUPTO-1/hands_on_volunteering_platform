import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './Routes/routes.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
  </AuthProvider>,
)
