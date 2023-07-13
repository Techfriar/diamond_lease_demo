import Joi from 'joi'

class deleteBannerRequest {
  static schema = Joi.object({
    _id: Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  validate() {
    const { error, value } = deleteBannerRequest.schema.validate(this.data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}

export default deleteBannerRequest;
