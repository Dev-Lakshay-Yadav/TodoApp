import todo from "../models/todo.js";

export const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newEntry = new todo({
      title,
      description,
    });
    await newEntry.save();
    res.status(201).json({
      success: true,
      data: newEntry,
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        message: "Add Error Occured",
      });
  }
};

export const fetchTodo = async (req, res) => {
  try {
    const todoData = await todo.find({}).sort({ timestamp: -1 });
    res.status(200).json({
      success: true,
      data: todoData,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Fetch Error Occured",
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    let findTodo = await todo.findById(id);

    if (!findTodo)
      return res.status(404).json({
        success: false,
        message: "Edit Error Not Found",
      });

    (findTodo.title = title || findTodo.title),
      (findTodo.description = description || findTodo.description),
      await findTodo.save();

    res.status(200).json({
      success: true,
      data: findTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Update Error Occured",
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    let deleteTodo = await todo.findByIdAndDelete(id);

    if (!deleteTodo)
      return res.status(404).json({
        success: false,
        message: "Delete Record Not Found",
      });

    res.status(200).json({
      success: true,
      message: "Todo delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Delete Error Occured",
    });
  }
};
