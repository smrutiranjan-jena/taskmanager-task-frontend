import { useEffect, useState } from "react";
import API from "../api/api";
import TaskItem from "./TaskItem";

export default function TaskList({ projectId }) {

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const fetchTasks = async () => {

    const res = await API.get("/tasks", {
      params: { status, priority }
    });

    const projectTasks = res.data.filter(
      (t) => t.project === projectId
    );

    setTasks(projectTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [status, priority]);

  return (
    <div>

      <div className="task-filter">

        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="done">Done</option>
        </select>

        <select onChange={(e) => setPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>

      </div>

      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          reload={fetchTasks}
        />
      ))}

    </div>
  );
}