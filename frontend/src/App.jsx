import { useState } from 'react'

import './App.css'
import LandingPage from './pages/Landing'
import LoginPage from '@/pages/Login.jsx'
import RegisterPage from '@/pages/Register.jsx'
import Dashboard from './pages/Dashboard'


import { createBrowserRouter, RouterProvider } from 'react-router'

 const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
])
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
