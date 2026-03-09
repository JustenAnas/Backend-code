require('dotenv').config()//make readable env file also we can use it to connect env to server
const  app = require("./src/app")
const connectDB = require('./src/db/db')

connectDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})
