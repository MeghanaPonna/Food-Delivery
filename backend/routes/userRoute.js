import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// protected route
userRouter.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default userRouter;
