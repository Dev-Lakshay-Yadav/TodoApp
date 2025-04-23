import mongoose from "mongoose";

// Define individual todo schema
const todoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);
const todoListSchema = new mongoose.Schema(
  {
    todos: {
      type: [todoSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoList = mongoose.model("TodoList", todoListSchema);
export default TodoList;
