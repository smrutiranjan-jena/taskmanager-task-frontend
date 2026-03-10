import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function CreateProject() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {

        e.preventDefault();

        if (!name) {
            setError("Project name required");
            return;
        }

        try {

            setLoading(true);

            await API.post("/projects", {
                name,
                description
            });

            navigate("/");

        } catch (err) {

            setError("Failed to create project");

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="container">

            <div className="create-project-card">

                <h2>Create Project</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={submit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 20,
                    paddingTop:'16px',
                
                }}>

                    <input
                        placeholder="Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            padding: '20px',
                            width:'50%'
                        }}
                    />
                    <textarea
                        style={{
                            padding: '20px',
                             width:'50%'
                            // outline:0,
                            // border:0
                        }}
                        placeholder="Project Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button disabled={loading} style={{
                        padding: '10px',
                        backgroundColor: '#22c55e',
                         width:'50%'
                    }}>
                        {loading ? "Creating..." : "Create Project"}
                    </button>

                </form>

            </div>
        </div>
    );
}