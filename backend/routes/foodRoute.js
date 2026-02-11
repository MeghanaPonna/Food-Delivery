import express from "express";
import multer from "multer";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const foodRouter = express.Router();

/* =========================
   MULTER CONFIG
========================= */
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/* =========================
   ROUTES
========================= */

// 🔐 ADMIN ONLY
foodRouter.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addFood
);

foodRouter.post(
  "/remove",
  authMiddleware,
  adminMiddleware,
  removeFood
);

// 🌍 PUBLIC
foodRouter.get("/list", listFood);

export default foodRouter;
