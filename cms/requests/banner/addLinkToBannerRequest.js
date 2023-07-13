import Joi from 'joi'

class addLinkToBannerRequest {
  static schema = Joi.object({
    _id: Joi.string().required(),
    link: Joi.string().required()
  });

  constructor(data) {
    this.data = data;
  }

  validate() {
    const { error, value } = addLinkToBannerRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}

export default addLinkToBannerRequest;
