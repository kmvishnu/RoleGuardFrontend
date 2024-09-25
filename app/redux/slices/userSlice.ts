"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "", 
  token: null, // Local storage access should be moved to components/hooks
  user: null,  // Same for user and role
  role: null,
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
