const Joi = require('joi');

const userValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().optional()
    .min(8)
    .regex(/^(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one special character'
    }),
  phone: Joi.string()
});

const updateUserValidation = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[!@#$%^&*])/)
    .optional()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one special character'
    }),
  phone: Joi.string().optional()
});

module.exports = {
  userValidation,
  updateUserValidation
};
