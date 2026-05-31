import axiosInstance from "../axiosInstance";
import type { PostTestRequest, PostTestResponse } from "../../types/test.type";

export const postTest = async (data: PostTestRequest) => {
  const response = await axiosInstance.post<PostTestResponse>("/tests", data);
  return response.data;
};
