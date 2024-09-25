"use client"; 

import axios from "axios";
import config from "../config";
import { useDispatch } from "react-redux";
import { clearToken, setToken } from "../redux/slices/userSlice";
import { useState, useEffect } from "react";

export const useUser = () => {
  const [error, setError] = useState("");
  const [authData, setAuthData] = useState({ token: null, name: null, role: null }); 

  const dispatch = useDispatch();

  const signUpUser = async (userData: any) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("signUp request failed:", error);
      return { status: "error" };
    }
  };

  const loginUser = async (userData: any) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/login`, userData);
      const { token, name, role } = response.data;

      // Set auth data to trigger the useEffect below
      setAuthData({ token, name, role });

      // Dispatch token to Redux store
      dispatch(setToken({ token, name, role }));

      return response.data;
    } catch (error: any) {
      console.error("Login request failed:", error);
      setError(error.response?.data?.message || "Invalid email ID or Password");
      return { status: "error", message: "Invalid email ID or Password" };
    }
  };

  const logoutUser = () => {
    // Clear local storage and Redux state
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    }

    // Clear Redux state
    dispatch(clearToken());

    // Clear auth data
    setAuthData({ token: null, name: null, role: null });
  };

  // Use effect to handle localStorage updates when authData changes
  useEffect(() => {
    if (authData.token && authData.role && authData.name && typeof window !== "undefined") {
      localStorage.setItem("token", authData.token);
      localStorage.setItem("user", authData.name);
      localStorage.setItem("role", authData.role);
    }
  }, [authData]);

  return {
    signUpUser,
    loginUser,
    logoutUser,
    error,
  };
};
