import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    logo_path: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const settings = mongoose.model("settings", settingsSchema);

export default settings;
