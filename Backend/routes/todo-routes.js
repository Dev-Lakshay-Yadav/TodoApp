import {addTodo,fetchTodo,updateTodo,deleteTodo} from '../controllers/todo-controller.js'
import express from 'express'

const router = express.Router()

router.post('/add',addTodo)
router.get('/get',fetchTodo)
router.put(`/update/:id`,updateTodo)
router.delete('/delete/:id',deleteTodo)

export default router