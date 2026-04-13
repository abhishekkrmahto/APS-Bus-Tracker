import React from 'react'
import { useState } from 'react'
import loginService from '../services/LoginService'

const login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
  return (
    <div>
      <input onChange={(e)=>{setemail(e.target.value)}} className='bg-black text-white p-2 rounded-2xl' type="password" name="" id="" placeholder='enter email'/>
      <input onChange={(e)=>{setpassword(e.target.value)}} className='bg-black text-white p-2 rounded-2xl' type="text" name="" id="" placeholder='enter password'/>
      <button onClick={loginService.login(email,password)} className='bg-teal-500 cursor-pointer'>SUBMIT</button>
    </div>
  )
}

export default login
