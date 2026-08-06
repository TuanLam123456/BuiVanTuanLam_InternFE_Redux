import { createSlice } from "@reduxjs/toolkit";
import {
  getProductById,
  getProduts,
  searchProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../services/productService.jsx";

const initialState = {
  products: [],
  productDetail: null,
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductsAction: (state, action) => {
      state.products = action.payload;
    },
    searchProductsAction: (state, action) => {
      state.products = action.payload;
    },
    getProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    deleteProductAction: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      );
    },
    createProductAction: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductAction: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const {
  getProductsAction,
  searchProductsAction,
  getProductDetailAction,
  deleteProductAction,
  createProductAction,
  updateProductAction,
} = productReducer.actions;

export default productReducer.reducer;

// Action gọi API
export const getProductsApiAsync = () => {
  return async (dispatch) => {
    try {
      // call api
      const data = await getProduts();
      // dispatch lên reducer
      const action = getProductsAction(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchProductApiAsync = (keyword) => {
  return async (dispatch) => {
    try {
      const data = await searchProducts(keyword);
      dispatch(searchProductsAction(data));
    } catch (error) {}
  };
};

export const getProductByIdApiAsync = (id) => {
  return async (dispatch) => {
    try {
      const data = await getProductById(id);

      dispatch(getProductDetailAction(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProductApiAsync = (id) => {
  return async (dispatch) => {
    try {
      await deleteProduct(id);
      dispatch(deleteProductAction(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProductApiAsync = (product) => {
  return async (dispatch) => {
    try {
      const data = await createProduct(product);

      dispatch(createProductAction(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProductApiAsync = (id, product) => {
  return async (dispatch) => {
    try {
      const data = await updateProduct(id, product);

      dispatch(updateProductAction(data));

      return data;
    } catch (error) {
      throw error;
    }
  };
};
