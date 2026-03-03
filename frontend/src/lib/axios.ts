import type { ApiErrorDevelopment } from "@/types/api-types";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorDevelopment>) => {
    const status = error.response?.status;
    const apiMessage = error.response?.data?.message;

    const errMessage =
      (status === 400 || status === 401 ? apiMessage : undefined) ??
      apiMessage ??
      error.message ??
      "Something went wrong";

    return Promise.reject(new Error(errMessage));
  },
);

export default api;
