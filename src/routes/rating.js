import express from "express";
import {
  createRating,
  deleteRating,
  getAverageRating,
  getRatingByDoneworkId,
  getRatingsForService,
  getRatingsForUser,
} from "../controllers/ratingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create_rating", authMiddleware, createRating);
router.get("/:providerid", authMiddleware, getRatingsForUser);
router.get(
  "/rating_by_serviceid/:serviceid",
  authMiddleware,
  getRatingsForService,
);
router.get("/rating_by_doneworkid/:doneworkid", getRatingByDoneworkId);
router.get("/average_rating/:providerid", authMiddleware, getAverageRating);
router.delete("/_:id", authMiddleware, deleteRating);

export default router;
