import joi from 'joi';
import { UserRole } from '../models/usersModel';


const characteresPassword: RegExp = /^(?=.*[!@#$%^&*])/;
const usersCreateValidationSchema: joi.ObjectSchema = joi.object({
  userName: joi.string().required(),
  userEmail: joi.string().email({ tlds: false }).required().messages({
    'any.required': 'The email field is required',
    'string.email': 'Please provide a valid email address'
  }),
  userPassword: joi
    .string()
    .required()
    .min(8)
    .regex(characteresPassword)
    .messages({
      'string.min': 'Password must be at least 8 characteres long',
      'string.pattern.base': `Password must contain at least one special character. Charactes to use: ${characteresPassword}`
    }),
  userBirthday: joi.date().optional(),
  userAddress: joi.string().optional(),
  userPhone: joi.string().optional(),
  userRole: joi.string().valid(...Object.values(UserRole)).required()
});

const updateUsersSchema: joi.ObjectSchema = joi.object({
  userName: joi.string().optional(),
  userEmail: joi.string().email({ tlds: false }).optional().messages({
    'any.required': 'The email field is required',
    'string.email': 'Please provide a valid email address'
  }),
  userPassword: joi
    .string()
    .optional()
    .min(8)
    .regex(characteresPassword)
    .messages({
      'string.min': 'Password must be at least 8 characteres long',
      'string.pattern.base': `Password must contain at least one special character. Charactes to use: ${characteresPassword}`
    }),
  userBirthday: joi.date().iso().optional(),
  userAddress: joi.string().optional(),
  userPhone: joi.string().optional(),
  userRole: joi.string().valid(...Object.values(UserRole)).optional()
});

export { usersCreateValidationSchema, updateUsersSchema };
