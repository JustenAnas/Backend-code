const express = require("express")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.route")

const app = express();
app.use(express.json());//set data readable for server
app.use(cookieParser());//set data in cookie and made it readable to us or for server

app.use('/api/auth',authRoutes);
app.use('/api/music', musicRoutes);


module.exports = app