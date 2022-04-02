const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
const Token = require('./token');
const { format } = require("express/lib/response");
const userschema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("empty usernames aren't allowed");
      }
      if(validator.isNumeric(value)){
        throw new Error ("username cannot be of numbers")
      }
    },
  },
  Tag:{
     type:String,
     unique:true,
     required:true
  },
  BD: {
    type: Date,
    default: "1990-01-01",
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  isPrivate:{
    type:Boolean,
    default:false
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },
  ban:{
    type:Date,
    default:null
  },
  email: {
    type: String,
    trim: true,
    unique:true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  profile_avater: {
    type: String,
    trim: true,
    default:null,
    // validate(value) {
    //   if (!validator.isURL(value)) {
    //     throw new Error("Image not found ");
    //   }
    // },
  },
  banner:{
    type: String,
    trim: true,
    default:null
  },  
  followercount:{        /////who follow me
    type:Number,
    default:0

  },
  followedcount:{        ////who i follow
    type:Number,
    default:0
  },
  googleId:{
    type: String,
    trim: true,
  },
  Notificationssetting:{
    newfollow:{
      type:Boolean,
      default:true
    },
    newtweet:{
      type:Boolean,
      default:true
    },
    liketweet:{
      type:Boolean,
      default:true
    }
  }
  ,
},{
  timestamps:true,
  toJSON: {virtuals: true},
  toObject: { virtuals: true },
  
  
});
 ////to connect with tweet he tweet
userschema.virtual('Tweet',{
  ref:'Tweet',
  localField:'_id',
  foreignField:'userId'
})
userschema.virtual('follower',{
  ref:'User',
  localField:'_id',
  foreignField:'following.userId'
})
//edited function name and verifications
userschema.statics.findByCredentials=async(emailorUsername,password)=>{
    var user=await User.findOne({email: emailorUsername}) 
    if(!user){
      user=await User.findOne({user_name: emailorUsername})
      if(!user)
        throw new Error('unable to login')
    }
    const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch){
        throw new Error("unable to login")
    }
    return user
}

///delete data before send to client
userschema.methods.toJSON=function(){
  const user = this
  const userobject=user.toObject()
  delete userobject.password
  delete userobject.tokens

  return userobject

}

userschema.methods.generateAuthToken=async function(){
    const user = this;
    const token=jwt.sign({_id:user._id.toString()},process.env.SECRET)
    const accesstoken = new Token({token:token,userId:user._id})
    await accesstoken.save()
    return accesstoken

}

userschema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});



const User = mongoose.model('User', userschema);

module.exports = User