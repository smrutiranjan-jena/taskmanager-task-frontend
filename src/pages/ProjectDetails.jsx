import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

export default function ProjectDetails() {

    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProject = async () => {
        try {

            const res = await API.get(`/projects/${id}`);

            setProject(res.data);

        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchProject();
    }, []);

    if (loading) return <p>Loading project...</p>;

    return (
        <div className="container">

            <h1>{project.name}</h1>

            <p>{project.description}</p>

            <TaskForm projectId={id} />

            <TaskList projectId={id} />

        </div>
    );
}