const mongoose = require("mongoose");


async function connectDB(){
    await mongoose.connect("mongodb+srv://yt-backend:ANASkhan@yt-backend.a6xzqot.mongodb.net/halley") // this is uri 

    console.log("connected to db");
    
}

module.exports = connectDB