import Joi from 'joi'

class updateEmployeeRequest {
  static schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    status: Joi.boolean()
  });

  constructor(data) {
    this.data = data;
  }

  validate() {
    const { error, value } = updateEmployeeRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}

export default updateEmployeeRequest;
