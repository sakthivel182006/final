import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, } from "../controllers/product.controller.js";

const router = express.Router();

// Product routes
router.get('/', getProducts);  // Get all products
router.post('/', createProduct);  // Create a new product
router.put('/:id', updateProduct);  // Update an existing product
router.delete('/:id', deleteProduct);  // Delete a product
  // Check user login credentials

export default router;
