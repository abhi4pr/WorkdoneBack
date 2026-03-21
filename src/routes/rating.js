import express from "express";
import {
  createRating,
  getRatingsForUser,
  getAverageRating,
  deleteRating,
} from "../controllers/ratingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create_rating", authMiddleware, createRating);
router.get("/:userid", authMiddleware, getRatingsForUser);
router.get("/average_rating/:userid", authMiddleware, getAverageRating);
router.delete("/_:id", authMiddleware, deleteRating);

export default router;
