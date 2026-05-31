import axios, { type AxiosError } from "axios";

const tokenStorage = {
  get: () => localStorage.getItem("access_token"),
  set: (token: string) => localStorage.setItem("access_token", token),
  remove: () => localStorage.removeItem("access_token"),
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      tokenStorage.remove();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
