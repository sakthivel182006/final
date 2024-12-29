import Feedback from "../models/feedback.model.js";

// Get all feedback
export const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find();

        if (feedback.length === 0) {
            return res.status(404).json({ success: false, message: "No feedback found" });
        }

        res.status(200).json({ success: true, data: feedback });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ success: false, message: "Failed to fetch feedback", error });
    }
};

// Create a new feedback
export const createFeedback = async (req, res) => {
    const { name, email, comment } = req.body;

    // Basic validation
    if (!name || !email || !comment) {
        return res.status(400).json({
            success: false,
            message: "Please provide name, email, and comment.",
        });
    }

    // Create new feedback entry
    const newFeedback = new Feedback({
        name,
        email,
        comment,
    });

    try {
        const savedFeedback = await newFeedback.save();
        res.status(201).json({
            success: true,
            data: savedFeedback,
            message: "Feedback submitted successfully!",
        });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save feedback.",
            error: error.message,
        });
    }
};
