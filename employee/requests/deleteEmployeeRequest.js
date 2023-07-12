import Joi from 'joi'

class deleteEmployeeRequest {
  static schema = Joi.object({
    _id: Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  validate() {
    const { error, value } = deleteEmployeeRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}
export default deleteEmployeeRequest;
