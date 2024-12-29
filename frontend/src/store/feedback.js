import { create } from "zustand";

export const useFeedbackStore = create((set) => ({
  feedback: [], // Store all feedback submissions
  setFeedback: (feedback) => set({ feedback }), // Update feedback state

  createFeedback: async (newFeedback) => { // Create new feedback
    if (!newFeedback.name || !newFeedback.email || !newFeedback.comment) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      // API call to create feedback
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      });

      const data = await res.json();

      if (res.ok) {
        set((state) => ({
          feedback: [...state.feedback, data], // Add new feedback to feedback array
        }));
        return { success: true, message: "Feedback submitted successfully." };
      } else {
        return { success: false, message: data.message || "Failed to submit feedback." };
      }
    } catch (error) {
      return { success: false, message: "An error occurred while submitting feedback." };
    }
  },
}));
