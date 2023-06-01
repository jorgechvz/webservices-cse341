import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { AppointmentStatus } from '../models/appointmentsModel';

const appointmentValidationSchema: Joi.ObjectSchema = Joi.object({
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
  appointmentDate: Joi.string().required(),
  appointmentTime: Joi.string().required(),
  appointmentDuration: Joi.string().required(),
  appointmentDescription: Joi.string().required(),
  appointmentStatus: Joi.string()
    .valid(...Object.values(AppointmentStatus))
    .required(),
  appointmentComments: Joi.string().optional().allow('')
});

const appointmentUpdateValidationSchema: Joi.ObjectSchema = Joi.object({
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
  appointmentDate: Joi.string().optional(),
  appointmentTime: Joi.string().optional(),
  appointmentDuration: Joi.string().optional(),
  appointmentDescription: Joi.string().optional(),
  appointmentStatus: Joi.string()
    .valid(...Object.values(AppointmentStatus))
    .optional(),
  appointmentComments: Joi.string().optional().allow('')
});

export { appointmentValidationSchema, appointmentUpdateValidationSchema };
