const Joi = require('joi');
const  validate  = require('../../helper/ValidateHelper');
const validateValue = (value, helpers) => {
	// Allow empty string
	if (value.trim() === '') {
	  return helpers.error('any.empty');
	}
  
  
	return value;
  };
	async function PlanValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			id: Joi.string().optional(),
			title: Joi.string().required().
            custom(validateValue)
			.messages({
			  'string.empty': 'Title is required',
			  'any.empty': 'Only space is not allowed'
			}),
            amount: Joi.number().greater(0).required()
			.messages({
			  'number.base': 'Amount must be a number',
			  'number.greater': 'Amount must be greater than zero',
			  'any.required': 'Amount is required'
			}),
            days: Joi.number().greater(0).required()
			.messages({
			  'number.base': 'Days must be a number',
			  'number.greater': 'Days must be greater than zero',
			  'any.required': 'Days is required'
			}),           
		});
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

    module.exports = { PlanValidation }