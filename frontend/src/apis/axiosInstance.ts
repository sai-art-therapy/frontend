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
    // 브라우저 보안 정책 등으로 응답 자체가 아예 없는 경우 방어
    if (!error.response) {
      console.error(
        "네트워크 에러 또는 브라우저 보안 정책에 의해 요청이 차단되었습니다.",
      );
      return Promise.reject(error);
    }

    // 401 인증 에러 처리
    if (error.response.status === 401 && import.meta.env.VITE_DEV_BYPASS_AUTH !== "true") {
      tokenStorage.remove();

      // 이미 로그인 페이지에 있다면 강제 리다이렉트를 차단하여 무한 루프 방지
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
