import express from "express";
import { createReview, deleteReview, getReviews } from "../controller/ReviewController.js";
import { authenticateToken } from "../middlware/VerifyToken.js";
const reviewRouter = express.Router();
reviewRouter.post("/createreview",authenticateToken,createReview);
reviewRouter.get("/getreviews",getReviews);
reviewRouter.delete("/deletereview/:id",deleteReview);
export default reviewRouter;