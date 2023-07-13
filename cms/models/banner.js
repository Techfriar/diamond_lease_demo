import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    banner_path: {
        type: String,
        required: true,
      },
      link:{
        type: String,
        required: false,
      },
      is_main_banner: {
        type: Boolean,
        required: true,
      }
  },
  { timestamps: true }
);

const banner = mongoose.model("banner", bannerSchema);

export default banner;
