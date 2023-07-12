import Joi from 'joi'

class addQuickLinkRequest {
  static schema = Joi.object({
    title: Joi.string().required(),
    link: Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  validate() {
    const { error, value } = addQuickLinkRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}

export default addQuickLinkRequest;
