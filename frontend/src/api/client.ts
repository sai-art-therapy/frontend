import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 토큰 자동 첨부
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 에러 공통 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 네트워크 차단으로 에러 응답 자체가 없는 경우 예외 처리
    if (!error.response) {
      console.error(
        "네트워크 에러 또는 브라우저 보안 정책에 의해 요청이 차단되었습니다.",
      );
      return Promise.reject(error);
    }

    // 401 인증 에러 처리
    if (
      error.response.status === 401 &&
      import.meta.env.VITE_DEV_BYPASS_AUTH !== "true"
    ) {
      localStorage.removeItem("access_token");

      // 현재 이미 로그인 페이지에 있다면 무한 이동을 하지 않도록 방어 코드 추가
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
