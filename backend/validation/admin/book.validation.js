const Joi = require('joi');
const  validate  = require('../../helper/ValidateHelper');

	async function BookValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			categoryName: Joi.string().required()
		});
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

    module.exports = { BookValidation }