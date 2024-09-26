"use client";

import axios from "axios";
import config from "../config";
import { useDispatch } from "react-redux";
import { clearToken, setToken } from "../redux/slices/userSlice";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import api, { useAxiosInterceptor } from "../common/axios";

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [authData, setAuthData] = useState({ token: null, name: null, role: null });
  const dispatch = useDispatch();
  useAxiosInterceptor();

 
  const signUpUser = useCallback(async (userData: any) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/register`, userData);
      return { status: "success", ...response.data };
    } catch (error) {
      console.error("signUp request failed:", error);
      return { status: "error" };
    }
  }, []);

  
  const viewAllUsers = useCallback(async () => {
    try {
      const response = await api.get(`${config.apiBaseUrl}/viewAllUsers`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch all the user details", error);
      return { status: "error" };
    }
  }, []);

  
  const assignRole = useCallback(async (user: any, role: string) => {
    try {
      const response = await api.put(`${config.apiBaseUrl}/assignRole`, {
        userId: user,
        role: role,
      });
      return { status: "success", ...response.data };
    } catch (error) {
      console.error("Failed to assign role", error);
      return { status: "error" };
    }
  }, []);

  
  const loginUser = useCallback(async (userData: any) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/login`, userData);
      const { token, name, role } = response.data;

      setAuthData({ token, name, role });
      dispatch(setToken({ token, name, role }));

      return response.data;
    } catch (error: any) {
      console.error("Login request failed:", error);
      setError(error.response?.data?.message || "Invalid email ID or Password");
      return { status: "error", message: "Invalid email ID or Password" };
    }
  }, [dispatch]);

  
  const logoutUser = useCallback(() => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
    sessionStorage.clear();

    dispatch(clearToken());
    setAuthData({ token: null, name: null, role: null });
  }, [dispatch]);

  useEffect(() => {
    if (authData.token && authData.role && authData.name) {
      Cookies.set("token", authData.token, { expires: 1 });  
      Cookies.set("user", authData.name, { expires: 1 });
      Cookies.set("role", authData.role, { expires: 1 });
    }
  }, [authData]);

  return {
    signUpUser,
    loginUser,
    logoutUser,
    error,
    viewAllUsers,
    users,
    assignRole,
  };
};
