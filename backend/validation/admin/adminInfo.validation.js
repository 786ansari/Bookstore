const Joi = require('joi');
const  validate  = require('../../helper/ValidateHelper');
const validateValue = (value, helpers) => {
	// Allow empty string
	if (value.trim() === '') {
	  return helpers.error('any.empty');
	}
  
  
	return value;
  };
	async function AdminInfoValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			id: Joi.string().optional(),
			emailId: Joi.string().email().required(),
			mobileNumber: Joi.string().required().custom(validateValue)
			.messages({
			  'string.empty': 'Mobile Number is required',
			  'any.empty': 'Only space is not allowed in mobile number field'
			}),
			address: Joi.string().required().
            custom(validateValue)
			.messages({
			  'string.empty': 'Adress name is required',
			  'any.empty': 'Only space is not allowed address field'
			}),
			whatsAppNumber: Joi.string().required().
            custom(validateValue)
			.messages({
			  'string.empty': 'Whatsapp number is required',
			  'any.empty': 'Only space is not allowed whatsapp number field'
			}),
		});
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}
    module.exports = { AdminInfoValidation }