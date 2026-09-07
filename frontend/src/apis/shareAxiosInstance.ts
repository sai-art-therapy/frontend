import axios from "axios";

const SHARE_TOKEN_KEY = "share_token";

export const shareTokenStorage = {
  get: () => sessionStorage.getItem(SHARE_TOKEN_KEY),
  set: (token: string) => sessionStorage.setItem(SHARE_TOKEN_KEY, token),
  remove: () => sessionStorage.removeItem(SHARE_TOKEN_KEY),
};

// 로그인 사용자용 axiosInstance와 완전히 분리된 인스턴스.
// 공유 링크 방문자는 access_token이 없으므로 Bearer 대신 Share 스킴을 쓰고,
// 401/404 인터셉터도 없다 — 만료·위조 토큰은 각 API 호출부에서 만료 안내로 처리한다.
const shareAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

shareAxiosInstance.interceptors.request.use(
  (config) => {
    const token = shareTokenStorage.get();
    if (token) {
      config.headers.Authorization = `Share ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default shareAxiosInstance;
