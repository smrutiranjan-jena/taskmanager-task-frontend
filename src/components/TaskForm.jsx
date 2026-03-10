import { useState } from "react";
import API from "../api/api";

export default function TaskForm({ projectId, reload }) {

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("todo");

  const submit = async (e) => {
    // e.preventDefault();

    await API.post("/tasks", {
      title,
      priority,
      status,
      project: projectId
    });

    setTitle("");
    setPriority("low");
    setStatus("todo");

    reload(); // better than reload page
  };

  return (
    <form className="task-form" onSubmit={submit}>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button>Add Task</button>

    </form>
  );
}