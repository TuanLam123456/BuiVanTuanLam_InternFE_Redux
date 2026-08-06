import axios from "axios";

const API_URL = "http://localhost:8080/products";

// Get all products
export const getProduts = async () => {
  try {
    const respone = await axios.get(API_URL);
    return respone.data;
  } catch (error) {
    console.log("Get products failed", error);
    throw error;
  }
};

// Search product by name
export const searchProducts = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}?name:contains=${keyword}`);
    return response.data;
  } catch (error) {
    console.log("Search product failed:", error);

    throw error;
  }
};

// Get product by id
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Get product detail failed:", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.log("Delete product failed:", error);

    throw error;
  }
};

// Create product
export const createProduct = async (product) => {
  try {
    const newProduct = {
      id: Date.now(),
      ...product,
    };

    const response = await axios.post(API_URL, newProduct);

    return response.data;
  } catch (error) {
    console.log("Create product failed:", error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);

    return response.data;
  } catch (error) {
    console.log("Update product failed:", error);

    throw error;
  }
};
