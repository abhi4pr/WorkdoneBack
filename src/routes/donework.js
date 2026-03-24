import express from "express";
import {
  createDonework,
  getCustomerWorks,
  getProviderWorks,
  updateWorkStatus,
  updateWorkDetails,
} from "../controllers/doneworkController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create_work", authMiddleware, createDonework);
router.get("/get_customer_works/:customerid", authMiddleware, getCustomerWorks);
router.get("/get_provider_works/:providerid", authMiddleware, getProviderWorks);
router.put("/update_status/:_id", authMiddleware, updateWorkStatus);
router.put("/update_note/:_id", authMiddleware, updateWorkDetails);

export default router;
