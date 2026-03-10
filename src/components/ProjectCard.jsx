import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {

  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <Link to={`/project/${project._id}`}>
        Open Project
      </Link>

    </div>
  );
}