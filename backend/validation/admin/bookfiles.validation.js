const Joi = require("joi");
const validate = require("../../helper/ValidateHelper");

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

async function BookFilesValidation(req, res, next) {
  const schema = Joi.object().keys({
    _id: Joi.string().optional(),
    bookId: Joi.string().required().messages({
      "string.base": "Book name must be a string",
      "string.empty": "Book name is required",
      "any.required": "Book name is required",
    }),
    fileType: Joi.string().required().messages({
      "string.empty": "File type is required",
      "any.required": "File type is required",
    }),
    file: Joi.when('fileType', {
        is: 'pdf',
      then: Joi.string().required().custom(validateFileExtension(['.pdf'])).messages({
        "string.empty": "File is required",
        "any.required": "File is required",
        "string.extension": "File must be a pdf file",
      }),
      otherwise: Joi.when('fileType', {
        is: 'ppt',
        then: Joi.string().required().custom(validateFileExtension(['.ppt'])).messages({
          "string.empty": "File is required",
          "any.required": "File is required",
          "string.extension": "File must be a ppt file",
        }),
        otherwise: Joi.when('fileType', {
           is: 'pptPdf',
          then: Joi.string().required().custom(validateFileExtension(['.pptPdf'])).messages({
            "string.empty": "File is required",
            "any.required": "File is required",
            "string.extension": "File must be a pptpdf file",
          }),
          otherwise: Joi.when('fileType', {
            is: 'editable',
            then: Joi.string().required().custom(validateFileExtension(['.docx', '.xlsx', '.txt'])).messages({
              "string.empty": "File is required",
              "any.required": "File is required",
              "string.extension": "File must be an editable file (e.g., .docx, .xlsx, .txt)",
            }),
            otherwise: Joi.string().optional(),
          }),
        }),
      }),
    }),
    chapter: Joi.string().optional(),
  });

  req.body.file = req?.file?.filename || req?.body?.file;
  const isValid = await validate(req.body, res, schema);
  if (isValid) {
    next();
  }
}

module.exports = { BookFilesValidation };
