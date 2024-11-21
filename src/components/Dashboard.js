import React, {useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
  return (
    <div className='container'>
        
        <nav className={menuOpen ? 'open-nav' : ''}>
            <div className={menuOpen ? 'profile center': 'profile'}>
                <div className={menuOpen ? 'center': ''}>
                <img src={localStorage.getItem('logoUrl')} alt="logo" className={menuOpen ? 'open-nav-logo user-logo' : 'mobile-user-logo user-logo'}/>
                <h2 className={menuOpen ? 'open-nav-userName' : 'userName'}>{localStorage.getItem('userName')}</h2>
                </div>
                <button className={menuOpen ? 'nav-btn hide' : 'nav-btn show'} onClick={()=>{setMenuOpen(!menuOpen);}}><i className="fa-solid fa-bars"></i></button>
            </div>
                <div className={menuOpen ? 'links open' : 'links'}>
                <Link to= '/dashboard/home' className={location.pathname === '/dashboard/home'? 'active-nav-link': 'nav-link' }><i className="fa-solid fa-house"></i> Home</Link>  
                <Link to= '/dashboard/myprojects' className={location.pathname === '/dashboard/projects'? 'active-nav-link': 'nav-link'}><i className="fa-solid fa-bars-progress"></i> My Projects</Link>  
                <Link to= '/dashboard/upload' className={location.pathname === '/dashboard/upload'? 'active-nav-link': 'nav-link'}><i className="fa-solid fa-upload"></i> Upload Project</Link>  
                <Link to= '/login' className='nav-link'><i className="fa-solid fa-right-from-bracket"></i> Log out</Link>  
            <button className="nav-btn" onClick={()=>{setMenuOpen(!menuOpen);}}><i className="fa-solid fa-xmark"></i></button>
            </div>
            </nav>
            <div className="main-container">
                <Outlet/>
            </div>
    </div>
  )
}

export default Dashboard
