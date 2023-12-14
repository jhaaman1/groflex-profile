import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Registration from '../Registration/Registration'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import Home from '../Home'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/registration' element={<Registration/>} />
      <Route path='/forgotpassword' element={<ForgotPassword/>} />
      <Route path='/' element={<Home/>} />
    </Routes>
  )
}

export default AllRoutes