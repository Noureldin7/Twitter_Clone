const app=require('./app')

<<<<<<< HEAD
const port=process.env.PORT
=======
const express=require('express')
require('./db/mongoose')


const userRouter =require('./routers/userroute')
const followRouter =require('./routers/followroute')
const adminRouter =require('./routers/adminroute')

const app=express()
const port=process.env.PORT
app.use(express.json())
app.use(userRouter)
app.use(followRouter)
app.use('/admin',adminRouter)
>>>>>>> ba6bad55e86f4eb09704c168cc0e153204894ddf


app.listen(port,()=>{
    console.log('server working '+port)
})