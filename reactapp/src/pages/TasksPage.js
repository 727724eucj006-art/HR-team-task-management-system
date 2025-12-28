import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

const TasksPage = () => {
  const { id } = useParams();
  const { tasks, updateStatus } = useContext(TaskContext);

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) return <div>Task not found</div>;

  return (
    <div>
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <button onClick={() => updateStatus(task.id, "Pending")}>
        Pending
      </button>
      <button onClick={() => updateStatus(task.id, "In Progress")}>
        In Progress
      </button>
      <button onClick={() => updateStatus(task.id, "Completed")}>
        Completed
      </button>
    </div>
  );
};

export default TasksPage;
