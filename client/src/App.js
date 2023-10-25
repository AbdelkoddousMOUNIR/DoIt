import React from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './pages/ProtectedRoute'
import TasksPage from './pages/TasksPage'
import PageNotFound from './pages/PageNotFound'

export default function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
              <Route path="/" element={<HomePage />} ></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<TasksPage />}></Route>
              </Route> 
              <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </Router>
      </div>
  )
}
