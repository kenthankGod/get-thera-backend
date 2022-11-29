const jwt = require("jsonwebtoken");

// function to generate jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  };

  
module.exports = { generateToken }; 