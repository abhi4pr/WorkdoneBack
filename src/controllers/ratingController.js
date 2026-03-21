import Rating from "../models/Rating.js";

export const createRating = async (req, res) => {
  try {
    const { for_user, by_user, rating, review } = req.body;

    if (!for_user || !by_user || !rating) {
      return res.status(400).json({
        message: "for_user, by_user and rating are required",
      });
    }

    if (for_user === by_user) {
      return res.status(400).json({
        message: "You cannot rate yourself",
      });
    }

    // Optional: prevent duplicate rating (one user -> one rating)
    const existingRating = await Rating.findOne({
      for_user,
      by_user,
    });

    if (existingRating) {
      return res.status(400).json({
        message: "You have already rated this user",
      });
    }

    const newRating = await Rating.create({
      for_user,
      by_user,
      rating,
      review,
    });

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
    const userId = req.params.userid;

    const ratings = await Rating.find({ for_user: userId })
      .populate("by_user", "name surname profile_pic")
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

export const getAverageRating = async (req, res) => {
  try {
    const userId = req.params.userid;

    const result = await Rating.aggregate([
      { $match: { for_user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$for_user",
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
