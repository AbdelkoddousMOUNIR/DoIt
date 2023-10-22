import React  from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  let isAuth = localStorage.getItem("userId")
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}