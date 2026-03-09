require('dotenv').config();   //need this line to connect file from env or use env  
const app = require("./src/app")
const connectDB = require("./src/db/db")

 
connectDB()

app.listen(3000,()=>{
console.log("server is running on port 3000");

}) 