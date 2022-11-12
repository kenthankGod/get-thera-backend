const { User } = require("../model/User");
const {
  loginFieldValidation,
  registerationFieldValidation,
} = require("../middleware/validatorMiddleware");
const { generateToken } = require("../middleware/jwtAssign");
const { emailToLowerCase } = require("../middleware/emailTolowercase");
const bcrypt = require("bcrypt");

module.exports.signup_post = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const { error } = registerationFieldValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // check if user exists
    const existingUser = await User.findOne({ email: email });
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
      email: emailToLowerCase(email),
      password: hashedPassword,
    });
    if (user) {
      res.status(201).send({
        message: "User registered successfully!",
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unable to register at the moment" });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = loginFieldValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // check user email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(400).json({
        message: `'${email}', does not exist please try signing in! `,
      });
    }
    if (existingUser) {
      const comparedPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (comparedPassword) {
        return res.status(200).send({
          message: "Successfully logged in",
          _id: existingUser.id,
          email: existingUser.email,
          token: generateToken(existingUser._id),
        });
      } else {
        res
          .status(400)
          .json({ email: existingUser.email, message: "Password Incorrect" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.therapistBooking_get = async (req, res) => {
  const { _id, email } = await User.findById(req.user.id);
  res
    .status(200)
    .json({ id: _id, email, message: `'${email}' is authorized ` });
};
