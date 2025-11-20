import { useState } from "react";
import {
  getProducts,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productService";

export function useProductController() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const response = await getProducts();
    setProducts(response.data);
  }

  async function fetchProductsAdmin() {
    const response = await getAllProductsAdmin();
    setProducts(response.data);
  }

  async function createNewProduct(data) {
    return await createProduct(data);
  }

  async function updateExistingProduct(id, data) {
    return await updateProduct(id, data);
  }

  async function deleteExistingProduct(id) {
    return await deleteProduct(id);
  }

  return {
    products,
    fetchProducts,
    fetchProductsAdmin,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  };
}
