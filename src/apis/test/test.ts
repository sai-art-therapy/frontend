import axiosInstance from "../axiosInstance";
import type { PostTestRequest, PostTestResponse } from "../../types/test.type";

export const postTest = async (data: PostTestRequest) => {
  const response = await axiosInstance.post<PostTestResponse>("/tests", data);
  return response.data;
};

export const uploadTestImage = async (testId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post<string>(
    `/tests/${testId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
