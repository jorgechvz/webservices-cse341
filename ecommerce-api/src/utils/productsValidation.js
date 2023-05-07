const Joi = require('joi');

const createProductValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().max(250).required(),
  price: Joi.number().required(),
  image_url: Joi.string(),
  category: Joi.string(),
  quantity: Joi.number()
});

const updateProductValidation = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().max(250).optional(),
  price: Joi.number().optional(),
  image_url: Joi.string().optional(),
  category: Joi.string().optional(),
  quantity: Joi.number().optional()
});

module.exports = {
  createProductValidation,
  updateProductValidation
};
