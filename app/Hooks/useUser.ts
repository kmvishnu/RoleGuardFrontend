import axios from "axios";
import config from "../config";
import { useDispatch } from "react-redux";
import { clearToken, setToken } from "../redux/slices/userSlice";
import { useState } from "react";

export const useUser = () => {

  const [error,setError] = useState("")

  const dispatch = useDispatch();

  const signUpUser = async (userData:any) => {
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/register`,
        userData
      );

      return response.data;
    } catch (error) {
      console.error("signUp request failed:", error);
      return { status: "error" };
    }
  };

 const loginUser = async (userData:any) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/login`, userData);
      const { token, name, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", name);
      localStorage.setItem("role", role);
      dispatch(setToken({ token, name , role}));
      return response.data;
    } catch (error:any) {
      console.error("Login request failed:", error);
      setError(error.response.data.message)
      return { status: "error", message : "Invalid email ID or Password" };
    }

  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    dispatch(clearToken());
  };


  return {
    signUpUser,
    loginUser,
    logoutUser,
    error
  };
};
