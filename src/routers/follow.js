
const express = require("express");
const User = require("../models/users");
const auth = require("../midlware/auth");
const router = new express.Router();

  ////~~~~~~~~~~~~~~~follow~~~~~~~~~~~~~~/////
  router.post("/follow/:id",auth, async (req, res) => {
    const user=await User.findById(req.params.id)
    try {
      user.followercount++
      await user.save()
    
      req.user.following=req.user.following.concat({userId:user._id})
      req.user.followedcount++
      await req.user.save()
  
      const n=req.user
      res.send({ user,n});
    } catch (e) {
      res.status(400).send("error"+e);
    }
  });
  ///////////***unfollow */
  router.post("/unfollow/:id", auth, async (req, res) => {
    const user=await User.findById(req.params.id)
    try {
  
      req.user.following = req.user.following.filter((follow) => {
        return follow.userID != req.userID;
      });
      
      await req.user.save();
      res.send("user");
    } catch (e) {
      res.status(400).send("error");
    }
  });
  
  
  router.get("/following/:id",auth, async (req, res) => {
    const user=await User.findById(req.params.id)
  
    try {
      await user.populate({
        path: "following.userId",
      });
      console.log(user.following[0].userId);
      user.following.map(follow=>{
        console.log('1');
         follow.userId.password=''
        console.log( follow.userId.password)
  
      })
      // if(user.following.userId.password){
      //    user.following.userId.password=''
      //    user.following.userId.tokens=''}
       
      res.send(user);
    } catch (e) {
      res.status(400).send("error"+e);
    }
  });
  router.get("/follower/:id",auth, async (req, res) => {
    const user=await User.findOne({ _id:req.params.id})
    try {
      await user.populate( {
        path: "follower",
      });
      
      console.log(user);
      
      res.send({ user});
    } catch (e) {
      res.status(400).send("error"+e);
    }
  });
  
  
  
  module.exports = router
  