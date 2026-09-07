import axiosInstance from "../axiosInstance";
import shareAxiosInstance from "../shareAxiosInstance";
import type {
  CreateShareResponse,
  SharedReportResponse,
} from "../../types/test.type";

// 리포트 소유자(로그인 사용자)가 공유 링크를 새로 발급받는다.
export const createShareToken = async (reportId: number) => {
  const response = await axiosInstance.post<CreateShareResponse>(
    `/reports/${reportId}/shares`,
  );
  return response.data;
};

// 공유 링크 방문자가 Share 토큰으로 리포트를 조회한다.
export const getSharedReport = async () => {
  const response =
    await shareAxiosInstance.get<SharedReportResponse>("/shared-reports");
  return response.data;
};

// images.original_image_url / result_image_url에 담겨오는 경로를 그대로 받아
// 호출한다. 인증이 필요한 바이너리 응답이라 blob으로 받아 objectURL로 변환해야 한다.
export const getSharedReportImage = async (imagePath: string) => {
  const response = await shareAxiosInstance.get<Blob>(imagePath, {
    responseType: "blob",
  });
  return response.data;
};
