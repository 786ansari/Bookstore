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

  const validateFileExtension = (value, helpers) => {
    // Allow empty string
    if (value === '') {
      return helpers.error('any.empty');
    }
  
    // Check if the file extension is .pdf
    if (!value.toLowerCase().endsWith('.pdf')) {
      return helpers.error('string.extension', { value });
    }
  
    return value;
  };

	async function BookValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			_id:Joi.string().optional(),
			itemType: Joi.string().required(),
			categoryId: Joi.string().required(),
            bookName:Joi.string().required(),
			MRP: Joi.number().greater(0).required()
			.messages({
			  'number.base': 'MRP must be a number',
			  'number.greater': 'MRP must be greater than zero',
			  'any.required': 'MRP is required'
			}),
            ISBN:Joi.string().required(),
            bookCode:Joi.string().required(),
            author:Joi.string().required(),
            chapterCount: Joi.number().greater(0).required()
			.messages({
			  'number.base': 'Chapter Count must be a number',
			  'number.greater': 'Chapter Count must be greater than zero',
			  'any.required': 'Chapter Count is required'
			}),
            type:Joi.string().required(),
            language:Joi.string().required(),
            sellingPrice: Joi.number().greater(0).required()
			.messages({
			  'number.base': 'Selling Price must be a number',
			  'number.greater': 'Selling Price must be greater than zero',
			  'any.required': 'Selling Price is required'
			}),
            features:Joi.string().required(),

			bookIcon:Joi.string().required()
			.custom(validateIconExtension)
			.messages({
			  'any.empty': 'Book icon is required',
			  'string.extension': 'Book icon must be an .jpg or.png image',
			}),

            samplePdf:Joi.string().required()
			.custom(validateFileExtension)
			.messages({
			  'any.empty': 'Book Sample pdf is required',
			  'string.extension': 'Book Sample pdf must be an pdf file',
			}),
		});
		if(Object.values(req.files) && req?.files['bookIcon']){
			req.body.bookIcon = req?.files['bookIcon'][0]?.filename 
		}else{
			req.body.bookIcon =req?.body?.bookIcon
		}
		if(Object.values(req.files) && req?.files['samplePdf']){
			req.body.samplePdf = req?.files['samplePdf'][0]?.filename 
		}else{
			req.body.samplePdf =req?.body?.samplePdf
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

    module.exports = { BookValidation }