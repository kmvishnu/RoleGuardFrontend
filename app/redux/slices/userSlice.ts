"use client";

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Using js-cookie to access cookies easily

const initialState = {
  email: "",
  password: "", 
  token: Cookies.get('token') || null, // Get token from cookies if available
  user: Cookies.get('user') || null,  // Get user name from cookies if available
  role: Cookies.get('role') || null,  // Get role from cookies if available
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.name;
      state.role = action.payload.role;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setToken, setAuthToken, clearToken } = userSlice.actions;

export default userSlice.reducer;
