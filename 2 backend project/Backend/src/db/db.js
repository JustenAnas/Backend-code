const mongoose = require('mongoose')


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"project-2"
        })
        console.log("connected to database");
        
    } catch (error) {
        console.log("database connection error:",error);
        
    }
}

module.exports = connectDB;