const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken');//do npm i jsonwebtoken to get this used this for jwt
const bcrypt = require('bcryptjs');//do npm i bycryptjs to do hashing in password

async function registerUser(req,res) {

    const{username,email,password,role="user"}=req.body;

    const isUserAlreadyExist = await userModel.findOne({
//need this for it will get us username and email even if its different user
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const hash = await bcrypt.hash(password,10)//10 is salting means it will make attack delay from hackers

    const  user = await userModel.create({
        username,
        email,
        password : hash,
        role
    })
    
    const token = jwt.sign({//get this from npm i jasonwebtoken
        id: user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)//you need package cookie-parser for it 

    res.status(201).json({
        message:"user register successfully",
        user:{
            id: user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        }
    })
}

async function loginUser(req,res){
    const {username,password,email} = req.body; 

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in sucessfully",
        user:{
            id: user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        }
    })
}

async function logOutUser(req,res) {
    res.clearCookie("token")
    res.status(200).json({
        message:"you logged out successfully"
    })
}

module.exports = {registerUser,loginUser,logOutUser}