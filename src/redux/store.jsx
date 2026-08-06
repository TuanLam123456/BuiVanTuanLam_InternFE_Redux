import { configureStore } from "@reduxjs/toolkit";

import ProductReducer from "./reducers/productReducer.jsx";
import userReducer from "./reducers/userReducer.jsx";

export const store = configureStore({
  reducer: {
    ProductReducer,

    userReducer,
  },
});
