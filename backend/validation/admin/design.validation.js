const Joi = require('joi');
const  validate  = require('../../helper/ValidateHelper');
const validateIconExtension = (value, helpers) => {
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
  const validateFileExtension = (allowedExtensions) => {
    return (value, helpers) => {
      // Allow empty string
      if (value === '') {
        return helpers.error('any.empty');
      }
  
      const lowercasedValue = value.toLowerCase();
      const isExtensionValid = allowedExtensions.some(ext => lowercasedValue.endsWith(ext));
      console.log("isExtensionValid", lowercasedValue, isExtensionValid, allowedExtensions);
      if (!isExtensionValid) {
        return helpers.error('string.extension', { value });
      }
      return value;
    };
  };

	async function DesignValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			id:Joi.string().optional(),
			designType: Joi.string().required(),
			amount: Joi.number().greater(-1).required()
			.messages({
			  'number.base': 'Amount must be a number',
			  'number.greater': 'Amount must be greater than zero',
			  'any.required': 'Amount is required'
			}),
            plan:Joi.string().required(),

			icon:Joi.string().required()
			.custom(validateIconExtension)
			.messages({
			  'any.empty': 'Icon is required',
			  'string.extension': 'Icon must be an .jpg or.png image',
			}),

            file:Joi.string().required()
			.custom(validateFileExtension(['.docx', '.xlsx', '.txt']))
			.messages({
			  'any.empty': 'File is required',
			  'string.extension': 'File must be an eidtable file',
			}),
		});
		if(Object.values(req.files) && req?.files['icon']){
			req.body.icon = req?.files['icon'][0]?.filename 
		}else{
			req.body.icon =req?.body?.icon
		}
		if(Object.values(req.files) && req?.files['file']){
			req.body.file = req?.files['file'][0]?.filename 
		}else{
			req.body.file =req?.body?.file
		}
		
		// console.log("here is filesss",Object.values(req.files),req?.files['samplePdf'])
		// req.body.bookIcon =req?.body?.bookIcon || req?.files['bookIcon'][0]?.filename 
		// req.body.samplePdf = req?.body?.samplePdf || req?.files['samplePdf'][0]?.filename 
		// console.log("filenamefilename",req.file)
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

    module.exports = { DesignValidation }