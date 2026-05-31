export interface CreateChatSessionRequest {
  child_id: number;
  htp_test_id: number;
  title: string;
}

export interface SendChatMessageRequest {
  message: string;
  report_id: number;
}

export interface GetSuggestedPromptsParams {
  context?: "home" | "report" | "general";
  htp_test_id?: number | null;
}

export type ChatSessionResponse = string;
export type ChatSessionListResponse = any[];
export type ChatHistoryResponse = string;
export type ChatMessageResponse = string;
export type SuggestedPromptsResponse = string;
