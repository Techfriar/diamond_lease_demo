import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    banner_path: {
        type: String,
        required: true,
      },
      link: String,
  },
  { timestamps: true }
);

const banner = mongoose.model("banner", bannerSchema);

export default banner;
