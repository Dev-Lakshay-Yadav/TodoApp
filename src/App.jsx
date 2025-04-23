import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TodoList() {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    const res = await axios.get("http://localhost:3000/api/todo/get");
    setTodo(res.data.data);
  };

  const handleAddOrUpdateTask = async () => {
    if (!title.trim() || !description.trim()) return;

    const endpoint = editingId
      ? `http://localhost:3000/api/todo/${editingId}`
      : "http://localhost:3000/api/todo";

    const method = editingId ? "put" : "post";

    await axios[method](endpoint, { title, description });

    setTitle("");
    setDescription("");
    setEditingId(null);
    fetchTodo();
  };

  const handleEdit = (id, task) => {
    setEditingId(id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleDelete = async (id) => {
    if (id) {
      await axios.delete(`http://localhost:3000/api/todo/${id}`);
      setEditingId(null);
      setTitle("");
      setDescription("");
      fetchTodo();
    }
  };

  const filteredTodo = todo.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-zinc-900 justify-center">
      <div className="min-w-xl h-full mx-auto mt-10 p-8 rounded-4xl shadow-2xl shadow-gray-800 bg-gray-950 text-white flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-4 text-center ">Todo List</h1>

        <input
          type="text"
          placeholder="Search tasks by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-full mb-4"
        />

        <div className="flex flex-col gap-5 mb-5">
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded-full"
          />
          <input
            type="text"
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded-full"
          />
          <button
            onClick={handleAddOrUpdateTask}
            className={`${
              editingId ? "bg-green-500" : "bg-blue-800"
            } text-white px-4 py-2 rounded-full cursor-pointer`}
          >
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </div>

        <div className="space-y-2">
          {filteredTodo.map((task) => (
            <div
              key={task.id}
              className="border rounded py-2 px-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-xl">{task.title}</p>
                <p className="text-lg text-white opacity-70">
                  {task.description}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(task.id, task)}
                  className="bg-yellow-500 font-semibold text-black px-3 py-1 rounded-lg cursor-pointer hover:scale-110 duration-1000"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 font-semibold text-white px-3 py-1 rounded-lg cursor-pointer hover:scale-110 duration-1000"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}