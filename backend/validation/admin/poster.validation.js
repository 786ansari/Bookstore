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
	async function PosterValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			_id: Joi.string().optional(),
			categoryId: Joi.string().required(),
			posterIcon:Joi.string().required()
			.custom(validateFileExtension)
			.messages({
			  'any.empty': 'Poster icon is required',
			  'string.extension': 'Poster icon must end with .png or .jpg',
			}),
		});
		req.body.posterIcon = req?.file?.filename || req?.body?.posterIcon
		console.log("filenamefilename",req.file)
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

    module.exports = { PosterValidation }