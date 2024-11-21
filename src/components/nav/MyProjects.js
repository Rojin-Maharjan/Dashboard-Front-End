import React, { useEffect, useState } from "react";
import axios from "axios";


const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    document.title = "My Projects";
    getProjects();
  }, []);

  const getProjects = () => {
    axios.get("https://dashboard-project-3sys.onrender.com/projects/myprojects", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(projects);
        setProjects(res.data.Projects.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const deleteHandler = (projectId)=>{
    console.log(projectId)
    axios.delete("https://dashboard-project-3sys.onrender.com/projects/" + projectId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      window.location.reload(false);
      console.log("Success");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <div>
      <h1>My projects</h1>
      <div className="projects">
        {projects &&
          projects.map((projects) => (
            <div className="project-card">
              <a key={projects._id} href={projects.pageUrl} target="blank">
                <img
                  src={projects.thumbnailUrl}
                  alt="thumbnail"
                  className="project-thumbnail"
                />
              </a>
              <div className="projectInfo deleteProject">
                <div className="projectDetail">
                  <a key={projects._id} href={projects.pageUrl} target="blank">
                    {projects.title}
                  </a>
                  <p key={projects._id}>{projects.createdAt.split("T")[0]}</p>

                </div>
                  <div className="delete">
                    <button className="deleteButton" onClick={() => deleteHandler(projects._id)} >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button className="deleteButton" onClick={() => deleteHandler(projects._id)} >
                    <i className="fa-solid fa-pen"></i>
                    </button>
                  </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyProjects;
