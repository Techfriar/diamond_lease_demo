import Joi from 'joi'

class deleteQuickLinkRequest {
  static schema = Joi.object({
    _id: Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  validate() {
    const { error, value } = deleteQuickLinkRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}

export default deleteQuickLinkRequest;
