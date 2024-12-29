import express from "express";
import { createFeedback, getFeedback } from "../controllers/feedback.controller.js";

const router = express.Router();

// Route to get all feedback
router.get("/", getFeedback);

// Route to submit new feedback
router.post("/", createFeedback);

export default router;
