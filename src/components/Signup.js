import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../App.css'
import {Link, useNavigate } from 'react-router-dom'
const Signup = () => {

  useEffect(()=>{
    document.title = 'Signup'
  })
  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')
  const [position,setPosition] = useState('')
  const [logo,setLogo] = useState(null)
  const [imageUrl,setImageUrl] = useState('')
  const [error,setError] = useState('')
  const [isLoading,setLoading] = useState(false)
  const navigate = useNavigate()


  const fileHandler = (e)=>{
    console.log(e.target.files[0])
    setLogo(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    setLoading(true)
    setError('')
    const formData = new FormData();
    formData.append('userName',userName)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('phone',phone)
    formData.append('position',position)
    formData.append('logo',logo)

    axios.post('https://dashboard-project-3sys.onrender.com/user/signup',formData)
    .then(res=>{
      setLoading(false)
      navigate('/login')
      console.log(res.data)
    })
    .catch(err=>{
      setLoading(false)
      const error = err.response.data.error
      setError(error)
      console.log(err.response.data.error)
    })
  }

  return (
    <div className='main-wrapper'>
      <div className='wrapper-header'>
        <img src={require('../assets/logo.png')} alt="logo" className='logo'/>
        <h2>SIGNUP</h2>
        </div>
         <form className='form-wrapper' onSubmit={submitHandler}>
         <input onChange={(e)=>{setUserName(e.target.value)}} type='text' placeholder='User name' required/>
          <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Email' required/>
          <input onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Password' required/>
          <input onChange={(e)=>{setPhone(e.target.value)}} type='text' placeholder='Phone' required/>
          <input onChange={(e)=>{setPosition(e.target.value)}} type="text" placeholder='Position'required/>
          <div className='upload-logo-icon'>
          <i className="fa-solid fa-plus"></i>
          <label htmlFor="upload-logo">Add logo</label>
          <input onChange={fileHandler} type="file" id='upload-logo' className='hidden'/>
          </div>
          {imageUrl && <img className='preview-image' src={imageUrl} alt="logo-user" required/>}
          <p className="error">{error}</p>
          <button type='submit'>{isLoading && <i className="fa-solid fa-circle-notch fa-spin loading"></i>}Submit</button>
          <Link to='/login' className = "link">Login</Link>

         </form>
    </div>
  )
}

export default Signup
