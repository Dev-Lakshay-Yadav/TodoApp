import React, { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleAddOrUpdateTask = () => {
    if (description.trim()) {
      if (editingTaskId !== null) {
        // Update Task
        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTaskId ? { ...task, text: description } : task
          )
        );
        setEditingTaskId(null);
      } else {
        // Add Task
        const newTask = {
          id: Date.now(),
          text: description,
        };
        setTasks([...tasks, newTask]);
      }
      setDescription("");
      setSearch("");
    }
  };

  const handleEdit = (id, text) => {
    setEditingTaskId(id);
    setDescription(text);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingTaskId === id) {
  
      setEditingTaskId(null);
      setDescription("");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>

      <input
        type="text"
        placeholder="Title tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleAddOrUpdateTask}
          className={`${
            editingTaskId ? "bg-green-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded`}
        >
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="border rounded p-2 flex justify-between items-center"
          >
            <span>{task.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(task.id, task.text)}
                className="bg-yellow-400 text-black px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
