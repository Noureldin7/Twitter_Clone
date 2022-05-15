const express=require('express')
require('./db/mongoose')//? if you seed comment this line    

//require('./db/seeding')  //? if want to seed uncomment this line

const adminRouter =require('./routers/adminroute')
const userAuthRouter =require('./routers/userauthroute')
const userRouter =require('./routers/userroute')
const tweetRouter =require('./routers/tweetroute')
const followRouter =require('./routers/followroute')
const profileRouter =require('./routers/profilerouter')
const cookieSession = require('cookie-session')
const  passport = require("passport")
require('./passport/passport')
const cors = require("cors")


const app=express()

app.use(
    cookieSession({ name: "session", keys: ["ozer"], maxAge: 24 * 60 * 60 * 100 })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(
    cors({
      origin: "http://localhost:5000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  
const port=process.env.PORT
app.use(express.json())
app.set('trust proxy', 1) 
app.use('/user',userAuthRouter)
app.use('/user',userRouter)
app.use(tweetRouter)
app.use(followRouter)
app.use('/profile',profileRouter)
app.use('/admin',adminRouter)

module.exports =app