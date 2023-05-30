import Joi from 'joi';

const characteresPassword: RegExp = /^(?=.*[!@#$%^&*])/;
const userCreateValidationSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required().messages({
    'any.required': 'The email field is required',
    'string.email': 'Please provide a valid email address'
  }),
  password: Joi.string()
    .required()
    .min(8)
    .regex(characteresPassword)
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': `Password must contain at least one special character. Characters: ${characteresPassword}`
    }),
  phone: Joi.string()
});

const userUpdateValidationSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email({ tlds: false }).optional().messages({
    'any.required': 'The email field is required',
    'string.email': 'Please provide a valid email address'
  }),
  password: Joi.string()
    .optional()
    .min(8)
    .regex(characteresPassword)
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': `Password must contain at least one special character. Characters: ${characteresPassword}`
    }),
  phone: Joi.string().optional()
});

export { userCreateValidationSchema, userUpdateValidationSchema };
