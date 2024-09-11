const Joi = require("joi");

// Joi স্কিমা ডিফাইন
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().integer().min(0),
});

const validateUser = (userData) => {
  return userSchema.validate(userData);
};
module.exports = {
  validateUser,
};
