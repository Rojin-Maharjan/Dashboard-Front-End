import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Projects = () => {
  const [projects, setProjects] = useState([])
  useEffect(()=>{
    getProjects()
  },[])
  const getProjects = ()=>{
    axios.get('https://dashboard-project-3sys.onrender.com/projects/allprojects',{
      headers:{
        Authorization:'Bearer '+localStorage.getItem('token')
      }
    }
    )
    .then((res) => {
      console.log(res.data.Projects)
      setProjects(res.data.Projects.reverse())
    })
    .catch((err) => {
      console.log(err)
    });
  }
  return (
    <div>
      <h1>Projects</h1>
      <div className='projects'>
      {projects && projects.map((projects) => (
            <div className='project-card'>
            <a key={projects._id}  href={projects.pageUrl} target='blank'><img src={projects.thumbnailUrl} alt='thumbnail' className='project-thumbnail' /></a>
              <div className='projectInfo'>
              <div className="logoBox"><img className = "projects-user-logo" key={projects._id} src={projects.user_id.logoUrl} alt="user-logo" /></div>
              <div className='projectDetail'>
                <a key={projects._id}  href={projects.pageUrl} target='blank'>{projects.title}</a>
          <p key={projects._id}>{projects.user_id.userName}</p>
          <p key={projects._id}>{projects.createdAt.split("T")[0]}</p>
          </div>
          </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Projects
