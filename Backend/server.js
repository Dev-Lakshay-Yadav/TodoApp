import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from './routes/todo-routes.js'

mongoose.connect(
    "mongodb+srv://lakshay8219:Lakshay09@ecommerce.btdhu.mongodb.net/todo"
).then(()=>console.log("MongoDB Connected"))
.catch((error)=>console.log(error))

const app = express()
const PORT = 3000

app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ["GET","POST","PUT","DELETE"],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true
    })
)

app.use(express.json())

app.use('/api/todo',todoRoutes)

app.use((err,req,res,next)=>{
    res.json({
        message : 'Internal server error',
        error : err.message
    })
})
app.listen(PORT , ()=> console.log(`Server is running on port : ${PORT}`))