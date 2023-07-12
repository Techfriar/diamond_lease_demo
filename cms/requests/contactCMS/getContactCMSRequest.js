import Joi from 'joi'

/**
 * Validations for get contact cms
 */
class getContactCMSRequest {
  static schema = Joi.object({
    _id: Joi.string().required(),
  });
  

  constructor(data) {
    this.data = data;
  }

  /**
   * Validate here
   * @returns 
   */
  validate() {
    const { error, value } = getContactCMSRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}

export default getContactCMSRequest;
