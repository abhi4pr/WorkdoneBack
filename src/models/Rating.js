import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    for_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    by_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
