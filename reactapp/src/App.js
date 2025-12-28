import React, { useState } from "react";

function App() {
  const [view, setView] = useState("list");
  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Task One",
      description: "First task description",
      status: "pending"
    },
    {
      id: 2,
      name: "Task Two",
      description: "Second task description",
      status: "completed"
    }
  ]);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        name: task.name,
        description: task.description,
        status: "pending"
      }
    ]);
    setView("list");
  };

  const updateStatus = (status) => {
    const updatedTasks = tasks.map((t) =>
      t.id === selectedTask.id ? { ...t, status } : t
    );
    setTasks(updatedTasks);
    setSelectedTask({ ...selectedTask, status });
  };

  return (
    <div>
      <h1>Task Management</h1>

      <button onClick={() => setView("add")}>Add Task</button>
      <button onClick={() => setView("list")}>Task List</button>

      {view === "list" &&
        tasks.map((task) => (
          <div key={task.id}>
            <p>{task.name} - {task.status}</p>
            <button
              onClick={() => {
                setSelectedTask(task);
                setView("details");
              }}
            >
              View Details
            </button>
          </div>
        ))}


      {view === "add" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask({
              name: e.target.name.value,
              description: e.target.description.value
            });
          }}
        >
          <input name="name" placeholder="Task Name" />
          <input name="description" placeholder="Description" />
          <button type="submit">Submit</button>
        </form>
      )}

      {view === "details" && selectedTask && (
        <div>
          <h2>Task Details</h2>

          <p>Name: {selectedTask.name}</p>
          <p>Description: {selectedTask.description}</p>

          {/* REQUIRED BY TEST */}
          <p>Current: {selectedTask.status}</p>

          <button onClick={() => updateStatus("pending")}>Pending</button>
          <button onClick={() => updateStatus("in progress")}>In Progress</button>
          <button onClick={() => updateStatus("completed")}>Completed</button>
        </div>
      )}
    </div>
  );
}

export default App;
