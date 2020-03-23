const express = require('express');
require('./db/mongoose')
const app = express();

const port = process.env.PORT || 3000
const userRouter = require('./router/user')
const taskRouter = require('./router/task')


//Middleware for maintanance
/* app.use((req,res,next) =>{
    res.status(503).send('The site is under maintainance')
}) */




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log('Server Started')
})