import { useState } from "react";
import API from "../api/api";

export default function TaskItem({ task, reload }) {

  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    reload();
  };

  const updateTask = async () => {

    await API.patch(`/tasks/${task._id}`, {
      title,
      priority,
      status
    });

    setEditing(false);
    reload();
  };

  return (
    <div className="task-item">

      {editing ? (
        <>
          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Priority */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button onClick={updateTask}>
            Save
          </button>

          <button onClick={() => setEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{task.title}</span>

          <span className={`priority ${task.priority}`}>
            {task.priority}
          </span>

          <span className={`status ${task.status}`}>
            {task.status}
          </span>

          <div style={{
            display:'flex',
            gap:2,
            alignItems:'center'
          }}>
            <button onClick={() => setEditing(true)}>
              Edit
            </button>

            <button onClick={deleteTask}>
              Delete
            </button>
          </div>
        </>
      )}

    </div>
  );
}