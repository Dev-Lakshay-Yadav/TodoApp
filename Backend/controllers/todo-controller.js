import TodoList from "../models/todo.js";

export const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    let list = await TodoList.findOne();

    if (!list) {
      const newList = new TodoList({
        todos: [{ id: 1, title, description }],
      });
      await newList.save();
      return res.status(201).json({ success: true, data: newList });
    }

    const nextId = list.todos.length + 1;
    list.todos.push({ id: nextId, title, description });
    await list.save();

    res.status(201).json({ success: true, data: list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Add Error Occurred" });
  }
};

export const fetchTodo = async (req, res) => {
  try {
    const list = await TodoList.findOne();
    res.status(200).json({ success: true, data: list?.todos || [] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Fetch Error Occurred" });
  }
};


export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const list = await TodoList.findOne();

    if (!list)
      return res.status(404).json({ success: false, message: "Todo list not found" });

    const todo = list.todos.find((t) => t.id === parseInt(id));

    if (!todo)
      return res.status(404).json({ success: false, message: "Todo not found" });

    if (title) todo.title = title;
    if (description) todo.description = description;

    await list.save();
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Update Error Occurred" });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await TodoList.findOne();

    if (!list)
      return res.status(404).json({ success: false, message: "Todo list not found" });

    const index = list.todos.findIndex((t) => t.id === parseInt(id));

    if (index === -1)
      return res.status(404).json({ success: false, message: "Todo not found" });

    list.todos.splice(index, 1);
    await list.save();

    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Delete Error Occurred" });
  }
};
