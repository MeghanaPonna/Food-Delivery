import express from "express";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const orderRouter = express.Router();

/* =========================
   USER ROUTES
========================= */

// place order (logged-in user)
orderRouter.post(
  "/place",
  authMiddleware,
  placeOrder
);

// verify payment (public / payment gateway callback)
orderRouter.post(
  "/verify",
  verifyOrder
);

// get logged-in user's orders
orderRouter.get(
  "/userorders",
  authMiddleware,
  userOrders
);

/* =========================
   ADMIN ROUTES
========================= */

// list all orders
orderRouter.get(
  "/list",
  authMiddleware,
  adminMiddleware,
  listOrders
);

// update order status
orderRouter.post(
  "/status",
  authMiddleware,
  adminMiddleware,
  updateStatus
);

export default orderRouter;
