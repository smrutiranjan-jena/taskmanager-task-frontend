import { useEffect, useState } from "react";
import API from "../api/api";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const loadProjects = async () => {

      const res = await API.get("/projects");

      setProjects(res.data);
    };
    loadProjects();

  }, []);

  return (
    <div className="container">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Your Projects</h1>
        <Link to="/create-project" className="create-btn" style={{
          backgroundColor:'#22c55e',
          padding:'16px',
          borderRadius:'16px',
          color:'#ffffff'
        }}>
          + Create Project
        </Link>
      </div>
      <div className="project-grid" >
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
}