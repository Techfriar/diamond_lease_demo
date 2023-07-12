import Joi from 'joi'

/**
 * Validations for update contact cms
 */
class updateContactCMSRequest {
  static schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    country_code: Joi.string().pattern(/^\+\d{1,5}$/).required().messages({
      'string.pattern.base': 'Invalid country code format',
      'any.required': 'Country code is required',
    }),
    phone: Joi.string().pattern(/^[0-9]{8,15}$/).required().messages({
      'string.pattern.base': 'Invalid phone number format. It should consist of 8 to 15 digits',
      'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
    timings: Joi.string().required(),
  });
  

  constructor(data) {
    this.data = data;
  }

  /**
   * Validate here
   * @returns 
   */
  validate() {
    const { error, value } = updateContactCMSRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}

export default updateContactCMSRequest;
