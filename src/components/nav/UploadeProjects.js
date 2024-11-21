import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UploadeProjects = () => {
  //change title of the page
  useEffect(()=>{
    document.title = 'Upload Projects'
  },[])
  const [title, setTitle] = useState('')
  const [pageUrl, setUrl] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [loading, setloading] = useState(false)
  const [error,setError] = useState('')
  const [msg,setMsg] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState(null)
  const navigate = useNavigate()

  const fileHandler = (e)=>{
    setThumbnail(e.target.files[0])
    setThumbnailUrl(URL.createObjectURL(e.target.files[0]))
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    setloading(true)
    // console.log(title,pageUrl,thumbnail)
    const formData = new FormData()
    formData.append('title',title)
    formData.append('pageUrl',pageUrl)
    formData.append('thumbnail',thumbnail)

    axios.post('https://dashboard-project-3sys.onrender.com/projects/upload',formData,{
      headers:{
        Authorization:'Bearer '+localStorage.getItem('token')
      }
    })
    .then(res=>{
      setloading(false)
      console.log(res.data)
      setMsg('Uploaded....')
      navigate('/dashboard/myprojects')
    })
    .catch(err=>{
      console.log(err)
      setloading(false)
      setError(err.response.data.error)
    })
  }
  return (
    <div className='uploadContainer'>
      <h1>Upload your project</h1>
      <form onSubmit={submitHandler} className="upload-form">
        <div className="col-1">
          <div className="title">
        <label>Title:</label>
        <input onChange={(e)=>{setTitle(e.target.value)}} type="text"  placeholder='Title' required/>
          </div>
          <div className="pageUrl">
        <label>Project's Url:</label>
        <input onChange={(e)=>{setUrl(e.target.value)}} type="text" placeholder='Page Url' required/>
         </div>
         <button type='submit'>{loading && <i className="fa-solid fa-circle-notch fa-spin loading"></i>}Upload</button>
        </div>
        <div className='col-2'>
          <label>Thumbnail:</label>
          <div className='upload-thumbnail-icon'>
          <label htmlFor="upload-thumbnail"><i className="fa-solid fa-file-import"></i>Add thumbnail</label>
          <input onChange={fileHandler} type="file" id='upload-thumbnail' className='hidden'/>
          </div>
          {thumbnailUrl && <img src={thumbnailUrl} alt="thumbnail preview" className='thumbnail'/>}
        </div>
      </form>
      <p className="upload-error">{error}</p>
      <p className="msg">{msg}</p>
    </div>
  )
}

export default UploadeProjects
