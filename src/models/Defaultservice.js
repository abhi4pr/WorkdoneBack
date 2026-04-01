import mongoose from "mongoose";

const defaultserviceSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Defaultcategory",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Defaultservice = mongoose.model("Defaultservice", defaultserviceSchema);
export default Defaultservice;
