import Joi from "joi";

class updateQuickLinkRequest {
  static schema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    link: Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  validate() {
    const { error, value } = updateQuickLinkRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}

export default updateQuickLinkRequest;
