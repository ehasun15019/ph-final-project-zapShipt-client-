import React from 'react'
import Logo from '../Components/Logo/Logo'
import { Outlet } from 'react-router'
import { assets } from '../assets/assets'

const AuthLayout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Logo></Logo>

      <main className='flex'>
        <div className='flex-1'>
            <Outlet></Outlet>
        </div>

        <div className='flex-1'>
            <img src={assets.authImage} alt="" />
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
