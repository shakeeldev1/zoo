import express from "express";
import { createReview, deleteReview, getReviews } from "../controller/ReviewController.js";
const reviewRouter = express.Router();
reviewRouter.post("/createreview",createReview);
reviewRouter.get("/getreviews",getReviews);
reviewRouter.delete("/deletereview/:id",deleteReview);
export default reviewRouter;