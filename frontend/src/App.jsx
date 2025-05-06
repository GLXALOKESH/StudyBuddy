import { useState } from 'react'

import './App.css'
import LandingPage from './pages/Landing'
import LoginPage from '@/pages/Login.jsx'
import RegisterPage from '@/pages/Register.jsx'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload.jsx'
import Notes from './pages/Notes.jsx'


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
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/notes",
    element: <Notes />,
  },
])
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
