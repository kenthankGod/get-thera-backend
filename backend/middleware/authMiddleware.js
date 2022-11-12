const jwt = require("jsonwebtoken");
const { User } = require("../model/User");
 
const protectedRoute = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_STRING);

      // get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      // if (!token) {
        return res.status(401).send({ message: "Not authorized, no token" });
      // };
    }
  }
  
  
};



module.exports = { protectedRoute };

