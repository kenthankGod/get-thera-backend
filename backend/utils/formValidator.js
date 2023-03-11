const joi = require("joi");

const registerationFieldValidation = (data) => {
  const schema = joi.object({
    userName: joi.string().required().label("Username"),
    email: joi.string().email().required().label("Email"),
    password: joi.string().min(4).required().label("Password"),
  });

  return schema.validate(data);
};

const loginFieldValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().min(4).required().label("Password"),
  });

  return schema.validate(data);
}; 

module.exports = {  
  registerationFieldValidation,
  loginFieldValidation,
}; 
    