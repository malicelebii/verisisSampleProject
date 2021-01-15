const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username:String,
  firstName:String,
  lastName:String,
  department:String,
  password:String,
  imgUrl:String,
  email:String,
  activate:Boolean,
  hiringDate:String,
  birthDate:String,
});


module.exports=mongoose.model('User',userSchema)