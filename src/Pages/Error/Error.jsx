import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router'

const Error = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center space-y-3'>
      <img src={assets.Error} alt="Error" />
      <h4 className='text-2xl'>Error 404</h4>

      <Link to="/" className='bg-primary py-4 px-9 rounded-full font-semibold'>Back to home</Link>
    </div>
  )
}

export default Error
