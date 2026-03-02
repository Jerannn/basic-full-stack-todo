import type { ApiErrorDevelopment } from "@/types/apiError";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorDevelopment>) => {
    let errMessage = "Something went wrong";
    if (error && error.response?.status === 400) {
      errMessage = error.response.data.message;
    } else if (error && error.response?.status === 401) {
      errMessage = error.response.data.message;
    }
    return Promise.reject(errMessage);
  },
);

export default api;
