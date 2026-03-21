import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 10,
    },
    description: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },
    duration: {
      type: Number,
      required: false,
      default: null,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
