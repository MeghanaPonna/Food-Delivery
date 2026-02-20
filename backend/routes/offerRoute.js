import express from "express";
import { addOffer, getOffers } from "../controllers/offerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// admin adds offer
router.post("/add", authMiddleware, addOffer);

// users fetch offers
router.get("/", getOffers);

export default router;