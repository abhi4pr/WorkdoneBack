import Rating from "../models/Rating.js";
import Donework from "../models/Donework.js";

export const createRating = async (req, res) => {
  try {
    const { provider, customer, service, rating, review, workdoneId } =
      req.body;

    if (!provider || !customer || !rating) {
      return res.status(400).json({
        message: "provider, customer and rating are required",
      });
    }

    if (provider === customer) {
      return res.status(400).json({
        message: "You cannot rate yourself",
      });
    }

    // Optional: prevent duplicate rating (one user -> one rating)
    const existingRating = await Rating.findOne({
      provider,
      customer,
      service,
    });

    if (existingRating) {
      return res.status(400).json({
        message: "You have already rated this user",
      });
    }

    const newRating = await Rating.create({
      provider,
      customer,
      service,
      rating,
      review,
    });

    if (workdoneId) {
      await Donework.findByIdAndUpdate(
        workdoneId,
        { rewrating: newRating._id },
        { new: true },
      );
    }

    return res.status(201).json({
      message: "Rating created successfully",
      rating: newRating,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create rating",
      error: error.message,
    });
  }
};

export const getRatingsForUser = async (req, res) => {
  try {
    const userId = req.params.providerid;

    const ratings = await Rating.find({ provider: userId })
      .populate("customer", "name surname profile_pic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Ratings fetched successfully",
      ratings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch ratings",
      error: error.message,
    });
  }
};

export const getRatingByDoneworkId = async (req, res) => {
  try {
    const { doneworkid } = req.params;

    if (!doneworkid) {
      return res.status(400).json({
        message: "doneworkId is required",
      });
    }

    const donework = await Donework.findById(doneworkid)
      .select("rewrating")
      .populate({
        path: "rewrating",
        populate: {
          path: "customer",
          select: "name surname profile_pic",
        },
      });

    if (!donework) {
      return res.status(404).json({
        message: "Donework not found",
      });
    }

    if (!donework.rewrating) {
      return res.status(404).json({
        message: "No rating found for this work",
      });
    }

    return res.status(200).json({
      message: "Rating fetched successfully",
      rating: donework.rewrating,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch rating by doneworkId",
      error: error.message,
    });
  }
};

export const getAverageRating = async (req, res) => {
  try {
    const userId = req.params.providerid;

    const result = await Rating.aggregate([
      { $match: { provider: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$provider",
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    if (!result.length) {
      return res.status(200).json({
        averageRating: 0,
        totalRatings: 0,
      });
    }

    return res.status(200).json({
      averageRating: result[0].averageRating,
      totalRatings: result[0].totalRatings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to calculate average rating",
      error: error.message,
    });
  }
};

export const deleteRating = async (req, res) => {
  try {
    const ratingId = req.params._id;

    const deletedRating = await Rating.findByIdAndDelete(ratingId);

    if (!deletedRating) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }

    return res.status(200).json({
      message: "Rating deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete rating",
      error: error.message,
    });
  }
};
