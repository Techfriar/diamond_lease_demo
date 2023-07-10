import Joi from 'joi'
import employee from '../models/employee.js';

class getEmployeeRequest {
  static schema = Joi.object({
    _id: Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  validate() {
    const { error, value } = getEmployeeRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}
export default getEmployeeRequest;
