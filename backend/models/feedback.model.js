import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        name: { type: String,required: true },  // Reference to User
        email: { type: String, required: true },
        comment: { type: String, required: true,},  // Rating from 1 to 5
    },
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
