import React from 'react'
import { useAuth } from '../context/AuthContext'
import Dashboard from '../pages/Dashboard'
import { Navigate } from 'react-router-dom'

const ChecksUser = () => {

    const { user } = useAuth()

  return user.type === "SELLER" ? <Dashboard /> : <Navigate to="/account" replace/>
  
}

export default ChecksUser