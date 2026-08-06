import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/userService.jsx";

const userLocal = localStorage.getItem("username");

const initialState = {
  username: userLocal || null,
};

const userReducer = createSlice({
  name: "userReducer",

  initialState,

  reducers: {
    loginAction: (state, action) => {
      state.username = action.payload;
    },

    logoutAction: (state) => {
      state.username = null;
    },
  },
});

export const {
  loginAction,

  logoutAction,
} = userReducer.actions;

export default userReducer.reducer;

// Login thunk

export const loginApiAsync = (user) => {
  return async (dispatch) => {
    try {
      const data = await login(user);

      console.log("LOGIN DATA:", data);

      if (data) {
        const username = data.name;
        dispatch(loginAction(username));
        localStorage.setItem("username", username);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };
};
