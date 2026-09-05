import axiosInstance from "../axiosInstance";
import type {
  CreateChatSessionRequest,
  SendChatMessageRequest,
  GetSuggestedPromptsParams,
  ChatSessionResponse,
  ChatSessionListResponse,
  ChatHistoryResponse,
  ChatMessageResponse,
  SuggestedPromptsResponse,
} from "../../types/chat.type";

export const getChatSessions = async () => {
  const response =
    await axiosInstance.get<ChatSessionListResponse>("/api/chat/sessions");
  return response.data;
};

export const createChatSession = async (data: CreateChatSessionRequest) => {
  const response = await axiosInstance.post<ChatSessionResponse>(
    "/api/chat/sessions",
    data,
  );
  return response.data;
};

export const getChatHistory = async (sessionId: number) => {
  const response = await axiosInstance.get<ChatHistoryResponse>(
    `/api/chat/sessions/${sessionId}`,
  );
  return response.data;
};

export const sendChatMessage = async (
  sessionId: number,
  data: SendChatMessageRequest,
) => {
  const response = await axiosInstance.post<ChatMessageResponse>(
    `/api/chat/sessions/${sessionId}/messages`,
    data,
    {
      timeout: 90000,
    },
  );
  return response.data;
};

export const getSuggestedPrompts = async (
  params: GetSuggestedPromptsParams,
) => {
  const response = await axiosInstance.get<SuggestedPromptsResponse>(
    "/api/chat/suggested-prompts",
    {
      params,
    },
  );
  return response.data;
};
