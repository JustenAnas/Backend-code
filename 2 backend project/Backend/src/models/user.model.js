const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        enum:['user','artist'],//we use enum when two or multiple user exists!
        default:'user'//means if you didnt choose anything then youll be default
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel