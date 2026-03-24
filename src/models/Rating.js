import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    review: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      max: 10,
    },
  },
  { timestamps: true },
);

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
