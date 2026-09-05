import axiosInstance from "../axiosInstance";
import type {
  PostTestRequest,
  PostTestResponse,
  ReportDetailResponse,
  ReportListItem,
  UploadTestImageResponse,
  AnalyzeTestResponse,
  CanvasDrawingData,
  CanvasDrawingUploadResponse,
} from "../../types/test.type";

export const postTest = async (data: PostTestRequest) => {
  const response = await axiosInstance.post<PostTestResponse>("/tests", data);
  return response.data;
};

export const uploadTestImage = async (testId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post<UploadTestImageResponse>(
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

export const analyzeTest = async (testId: number) => {
  const response = await axiosInstance.post<AnalyzeTestResponse>(
    `/tests/${testId}/analyze`,
    {},
    {
      timeout: 90000,
    },
  );
  return response.data;
};

export const uploadCanvasDrawing = async (
  testId: number,
  file: File,
  drawingData: CanvasDrawingData,
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "drawing_data",
    new Blob([JSON.stringify(drawingData)], { type: "application/json" }),
    "drawing.json",
  );

  const response = await axiosInstance.post<CanvasDrawingUploadResponse>(
    `/tests/${testId}/drawing`,
    formData,
    {
      timeout: 60_000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const saveDrawingTime = async (testId: number, minutes: number) => {
  const response = await axiosInstance.post<string>(
    `/tests/${testId}/pdi/time`,
    {
      drawing_time_minutes: minutes,
    },
  );
  return response.data;
};

export interface PdiQuestion {
  question_id: number;
  question_text: string;
}

export interface PdiStartResponse {
  test_id: number;
  status: string;
  questions: PdiQuestion[];
}

export const startPdiQuestions = async (testId: number) => {
  const response = await axiosInstance.post<PdiStartResponse>(
    `/tests/${testId}/pdi/start`,
    {},
    {
      timeout: 90000,
    },
  );
  return response.data;
};

export interface CurrentPdiQuestionResponse {
  completed: boolean;
  question: {
    question_id: number;
    round_no: number;
    sort_order: number;
    question_text: string;
    question_type: string;
    target_type: string;
    current_step: number;
    total_count: number;
  };
}

export const getCurrentPdiQuestion = async (testId: number) => {
  const response = await axiosInstance.get<CurrentPdiQuestionResponse>(
    `/tests/${testId}/pdi/current`,
  );
  return response.data;
};

export interface PdiAnswerRequest {
  question_id: number;
  answer_text: string;
  skip: boolean;
}

export const submitPdiAnswer = async (
  testId: number,
  data: PdiAnswerRequest,
) => {
  const response = await axiosInstance.post<string>(
    `/tests/${testId}/pdi/answer`,
    data,
  );
  return response.data;
};

export const skipAllPdiQuestions = async (testId: number) => {
  const response = await axiosInstance.post<string>(
    `/tests/${testId}/pdi/skip`,
    {},
  );
  return response.data;
};

export const getReports = async () => {
  const response = await axiosInstance.get<ReportListItem[]>("/reports");
  return response.data;
};

export const getReportDetail = async (reportId: number) => {
  const response = await axiosInstance.get<ReportDetailResponse>(
    `/reports/${reportId}`,
  );
  return response.data;
};

export const generateReport = async (testId: number) => {
  const response = await axiosInstance.post<string>(
    `/tests/${testId}/generate-report`,
    {},
  );
  return response.data;
};
