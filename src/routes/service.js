import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  getServicesByUser,
  updateService,
  deleteService,
  searchServices,
  getAllDefaultCategories,
  getAllDefaultServicesByCategory,
  seedData,
  getServicesByDefaultServiceId,
} from "../controllers/serviceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/default_categories", authMiddleware, getAllDefaultCategories);
router.get(
  "/default_services/:categoryid",
  authMiddleware,
  getAllDefaultServicesByCategory,
);
router.get(
  "/services_by_default_service/:defaultserviceid",
  authMiddleware,
  getServicesByDefaultServiceId,
);
router.post("/create_service", authMiddleware, createService);
router.get("/get_all_services", authMiddleware, getAllServices);
router.get("/get_service/:_id", authMiddleware, getServiceById);
router.get("/get_service/user/:userid", authMiddleware, getServicesByUser);
router.put("/update_service/:_id", authMiddleware, updateService);
router.delete("/_:id", authMiddleware, deleteService);
router.get("/search_services", authMiddleware, searchServices);
router.post("/seed_data", authMiddleware, seedData);

export default router;
