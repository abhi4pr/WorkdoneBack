import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  getServicesByUser,
  updateService,
  deleteService,
  searchServices,
} from "../controllers/serviceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create_service", authMiddleware, createService);
router.get("/get_all_services", authMiddleware, getAllServices);
router.get("/get_service/:_id", authMiddleware, getServiceById);
router.get("/get_service/user/:userid", authMiddleware, getServicesByUser);
router.put("/update_service/:_id", authMiddleware, updateService);
router.delete("/_:id", authMiddleware, deleteService);
router.get("/search_services", authMiddleware, searchServices);

export default router;
