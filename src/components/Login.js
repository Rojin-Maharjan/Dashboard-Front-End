import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../App.css'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  useEffect(()=>{
    document.title = 'Login'
  },[])
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e)=>{
    e.preventDefault();
    setLoading(true)
    setError('')

    axios.post('https://dashboard-project-3sys.onrender.com/user/login',{
      email:email,
      password:password
    })
    .then(res=>{
      setLoading(false)
      console.log(res.data)
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('userId',res.data._id)
      localStorage.setItem('userName',res.data.userName)
      localStorage.setItem('logoUrl',res.data.logoUrl)
      navigate('/dashboard')
    })
    .catch(err=>{
      setLoading(false)
      const error = err.response.data.error
      console.log(err.response.data.error)
      setError(error)
    })
  }

  return (
    <div className='main-wrapper'>
      <div className='wrapper-header'>
        <img src={require('../assets/logo.png')} alt="logo" className='logo'/>
        <h2>LOGIN</h2>
        </div>
         <form className='form-wrapper' onSubmit={submitHandler}>
          <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Email' required/>
          <input onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Password' required/>
          <p className='error'>{error}</p>
          <button type='submit'>{isLoading && <i className="fa-solid fa-circle-notch fa-spin loading"></i>}Login</button>
          <Link to='/signup' className = "link">Sign up</Link>
         </form>
    </div>
  )
}

export default Login
