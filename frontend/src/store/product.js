import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }

        try {
            // API call to create a product
            const res = await fetch("/api/products", { // Proxy ensures proper routing
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            const data = await res.json();

            if (res.ok) {
                set((state) => ({
                    products: [...state.products, data],
                }));
                return { success: true, message: "Product created successfully." };
            } else {
                return { success: false, message: data.message || "Failed to create product." };
            }
        } catch (error) {
            return { success: false, message: "An error occurred while creating the product." };
        }
    },
}));