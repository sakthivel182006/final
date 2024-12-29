import { create } from "zustand";

export const useUserStore = create((set) => ({
    users: [], // Store users
    setUsers: (users) => set({ users }), // Update users list

    // Function to create a new user
    createUser: async (newUser) => {
        if (!newUser.name || !newUser.email || !newUser.password) {
            return { success: false, message: "Please fill in all fields." };
        }

        try {
            // API call to create a user
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            const data = await res.json();

            if (res.ok) {
                set((state) => ({
                    users: [...state.users, data], // Add new user to the users array
                }));
                return { success: true, message: "User created successfully." };
            } else {
                return { success: false, message: data.message || "Failed to create user." };
            }
        } catch (error) {
            return { success: false, message: "An error occurred while creating the user." };
        }
    },

    // Function to check if the user can log in (check credentials)
    loginUser: async (loginData) => {
        if (!loginData.email || !loginData.password) {
            return { success: false, message: "Please fill in both fields." };
        }
    
        try {
            // API call to verify user login
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                // Check if the password matches
                if (data.password === loginData.password) {
                    return { success: true, message: "Login successfulujhngb" };
                } else {
                    return { success: false, message: "Email exists but the password is incorrect" };
                }
            } else {
                return { success: false, message: data.message || "Failed to login." };
            }
        } catch (error) {
            return { success: false, message: "An error occurred during login." };
        }
    }
    
}));
