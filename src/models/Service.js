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
    country_location: {
      type: String,
      required: true,
    },
    city_location: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
