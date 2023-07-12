import mongoose from "mongoose";

const contactCMSSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country_code: {
        type: String,
        required: true,
      },
      
    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    timings: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const contactCMS = mongoose.model("contactCMS", contactCMSSchema);

export default contactCMS;
