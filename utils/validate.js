const Joi = require("joi");

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user", "admin").optional(),
    isActive: Joi.boolean().optional(),
  });

  return schema.validate(user);
}

module.exports = { validateUser };
