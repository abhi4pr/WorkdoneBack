import mongoose from "mongoose";

const defaultcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Defaultcategory = mongoose.model(
  "Defaultcategory",
  defaultcategorySchema,
);
export default Defaultcategory;
