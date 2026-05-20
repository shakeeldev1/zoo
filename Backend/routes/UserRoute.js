import express from "express";
import { loginUser, logoutUser, registerUser,deleteUser, verifyOtp, getAllUsers, verifyUser } from "../controller/UserController.js";
import { authenticateToken } from "../middlware/VerifyToken.js";
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.get("/all-users", getAllUsers);
userRouter.post("/verify-otp", verifyOtp);
userRouter.get(
  "/verify-user",
  authenticateToken,
  verifyUser
);
export default userRouter;