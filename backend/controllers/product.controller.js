import Product from "../models/product.model.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Failed to fetch products", error });
    }
};
// Create a new product
export const createProduct = async (req, res) => {
    const { email, password, ...productData } = req.body; // Assuming 'email' and 'password' are part of the product data
    try {
        // Check if the product with the same email already exists
        const existingProduct = await Product.findOne({ email });

        if (existingProduct) {
            // Check if the password matches the existing product's password
            if (existingProduct.password === password) {
                return res.status(400).json({
                    success: true,  // Both email and password match, so return success
                    message: "login success"
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Email exists but the password is incorrect"
                });
            }
        }

        // If no existing product with the same email, create and save the new product
        const newProduct = new Product({ email, password, ...productData }); // Save with the provided password

        const savedProduct = await newProduct.save();

        res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ success: false, message: "Failed to save product", error });
    }
};




export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const updatedData = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Failed to update product", error });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: "Failed to delete product", error });
    }
};
