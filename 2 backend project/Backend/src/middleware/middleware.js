const jwt = require("jsonwebtoken");

//need next in middlewares
async function authArtist(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artitst") {
      return res.status(403).json({ message: "you dont have access" });
    }
    req.user = decoded;
      console.log("Incoming Token:", req.cookies.token ? "Found" : "NOT FOUND");
  console.log("Full User Data from Token:", decoded);
    next();
  } catch (error) {
    console.log(err);
    return res.status(401).json({ message: "unauthorized" });
  }
}

async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(decoded.role !== "user" ){
        return res.status(403).json({
            message:"you dont have access"
        })
    }
    req.user = decoded;
    next()
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "unauthorized" });
  }
}

module.exports = { authArtist ,authUser };
