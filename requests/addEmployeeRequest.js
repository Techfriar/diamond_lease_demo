import Joi from 'joi'

/**
 * Password validation
 */
const passwordValidation = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required();

class addEmployeeRequest {
  static schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    password: passwordValidation,
    status: Joi.boolean()
  });

  constructor(data) {
    this.data = data;
  }

  validate() {
    const { error, value } = addEmployeeRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}

export default addEmployeeRequest;
