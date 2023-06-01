import Joi from 'joi';
import { ObjectId } from 'mongodb';

const medicalHistoryCreateValidationSchema: Joi.ObjectSchema = Joi.object({
  patientId: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectID Validation')
    .required(),
  doctorId: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectID Validation')
    .required(),
  visitDate: Joi.string().required(),
  diagnosis: Joi.string().required(),
  treatmeent: Joi.string().required(),
  medication: Joi.string().required(),
  testResults: Joi.string().required(),
  comments: Joi.string().optional().allow('')
});

const medicalHistoryUpdateValidationSchema: Joi.ObjectSchema = Joi.object({
  patientId: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectID Validation')
    .optional(),
  doctorId: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectID Validation')
    .optional(),
  visitDate: Joi.string().optional(),
  diagnosis: Joi.string().optional(),
  treatmeent: Joi.string().optional(),
  medication: Joi.string().optional(),
  testResults: Joi.string().optional(),
  comments: Joi.string().optional().allow('')
});

export { medicalHistoryCreateValidationSchema, medicalHistoryUpdateValidationSchema };
