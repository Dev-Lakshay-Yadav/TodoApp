import { addTodo, fetchTodo, updateTodo, deleteTodo } from '../controllers/todo-controller.js';
import express from 'express';

const router = express.Router();

router.post('/', addTodo); // changed from /add
router.get('/get', fetchTodo); // keep as is
router.put('/:id', updateTodo); // changed from /update/:index
router.delete('/:id', deleteTodo); // changed from /delete/:index

export default router;
