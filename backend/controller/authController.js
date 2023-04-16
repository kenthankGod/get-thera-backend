const { User } = require("../model/User");
const {
  loginFieldValidation,
  registerationFieldValidation,
} = require("../utils/formValidator");
const { generateToken } = require("../utils/jwtAssign");
const { emailToLowerCase } = require("../utils/emailTolowercase");
const bcrypt = require("bcrypt");

//  REGISTER USER
module.exports.signup_post = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const { error } = registerationFieldValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // check if user email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `'${email}, Email already exists!` });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unable to register at the moment" });
  }
};

//  LOGIN USER
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = loginFieldValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // check if user email already exist
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: `'${email}', does not exist please try signing in! `,
      });
    }

    if (user && (await bcrypt.compare(password, user.password))) {  
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
