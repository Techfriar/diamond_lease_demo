import mongoose from "mongoose";

const quickLinkSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
      },
      link:{
        type: String,
        required: true
      }
  },
  { timestamps: true }
);

const quickLink = mongoose.model("quickLink", quickLinkSchema);

export default quickLink;
