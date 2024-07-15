const Joi = require('joi');
const  validate  = require('../../helper/ValidateHelper');
const validateValue = (value, helpers) => {
	// Allow empty string
	if (value.trim() === '') {
	  return helpers.error('any.empty');
	}
  
  
	return value;
  };
	async function PreviousYearpaperValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			id: Joi.string().optional(),
			categoryId: Joi.string().required().
            custom(validateValue)
			.messages({
			  'string.empty': 'Category name is required',
			  'any.empty': 'Only space is not allowed'
			}),
            examType: Joi.string().required().
            custom(validateValue)
			.messages({
			  'string.empty': 'Exam type is required',
			  'any.empty': 'Only space is not allowed'
			}),
			subject: Joi.string().required().
            custom(validateValue)
            .messages({
			  'string.empty': 'Subject is required',
			  'any.empty': 'Only space is not allowed'
			}),
            file: Joi.string().required().
            custom(validateValue)
			.messages({
			  'string.empty': 'File link is required',
			  'any.empty': 'Only space is not allowed'
			}),
           
		});
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

    module.exports = { PreviousYearpaperValidation }