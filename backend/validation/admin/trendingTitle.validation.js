const Joi = require('joi');
const  validate  = require('../../helper/ValidateHelper');
const validateFileExtension = (value, helpers) => {
	// Allow empty string
	if (value === '') {
	  return helpers.error('any.empty');
	}
  
	// Check if the file extension is .png or .jpg
	if (!value.toLowerCase().endsWith('.png') && !value.toLowerCase().endsWith('.jpg')) {
	  return helpers.error('string.extension', { value });
	}
  
	return value;
  };
	async function TrendingTitleValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			_id: Joi.string().optional(),
			title: Joi.string().required()
            .messages({
                'string.empty': 'Title is required',
                'any.required': 'Title is required'
              }),
			titleIcon:Joi.string().required()
			.custom(validateFileExtension)
			.messages({
			  'any.empty': 'Title Icon is required',
			  'string.extension': 'Title Icon must end with .png or .jpg',
			}),
		});
		req.body.titleIcon = req?.file?.filename || req?.body?.titleIcon
		console.log("filenamefilename",req.file)
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

    module.exports = { TrendingTitleValidation }