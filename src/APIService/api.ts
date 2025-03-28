import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEYS from "../Utilities/Constants";
import { API_URL } from "@env";

type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

// Create the Axios instance
const api = axios.create({
  baseURL: API_URL, // Replace with your actual API base URL
  timeout: 10000, // 10-second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token dynamically
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.token); // Fetch token from AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Extract API error response
      console.error("API Error:", error.response);
      return Promise.reject(error.response.data); // Reject with only response data
    } else {
      // Handle network or unexpected errors
      console.error("Network/Unexpected Error:", error.message);
      return Promise.reject({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

// API methods with optional headers
export const fetchData = <T>(endpoint: string, headers?: any) =>
  api.get<ApiResponse<T>>(endpoint, { headers });

export const postData = <T>(endpoint: string, data: any, headers?: any) =>
  api.post<ApiResponse<T>>(endpoint, data, { headers });

export const patchData = <T>(endpoint: string, data: any, headers?: any) =>
  api.patch<ApiResponse<T>>(endpoint, data, { headers });

export default api; // Export the api instance for custom requests if needed
