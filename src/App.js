import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import MyProjects from "./components/nav/MyProjects";
import UploadProject from "./components/nav/UploadeProjects";
import Home from "./components/nav/Projects";


function App() {
  const myRoutes = createBrowserRouter([
    {path:'', Component:Signup},
    {path:'/signup', Component:Signup},
    {path:'/login', Component:Login},
    {path:'/dashboard', Component:Dashboard, children:[
      {path:'', Component:Home},
      {path:'myprojects', Component:MyProjects},
      {path:'home', Component:Home},
      {path:'upload', Component:UploadProject}
    ]}
  ])
  return (
      <div>
        <RouterProvider router={myRoutes}></RouterProvider>
      </div>
  )
};

export default App;
