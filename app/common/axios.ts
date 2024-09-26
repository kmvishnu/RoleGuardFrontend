import axios from "axios";
import config from "../config";
import { clearToken, setAuthToken } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // For accessing cookies easily
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: config.apiBaseUrl,
});

// Helper function to check if the token is still valid
const isTokenValid = (token: string) => {
  try {
    const decoded:any = jwtDecode(token);
    const now = Date.now().valueOf() / 1000; // Convert to seconds
    return decoded.exp > now; // Check if token is still valid
  } catch (error) {
    return false;
  }
};

export const useAxiosInterceptor = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = Cookies.get('token') || "";

        if (!isTokenValid(token)) {
          Cookies.remove("token");
          Cookies.remove("user");
          Cookies.remove("role");
          
          dispatch(clearToken()); 
          router.push("/login"); 
          throw new Error("Invalid token, redirecting to login.");
        }

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [router, dispatch]);
};

export default api;
