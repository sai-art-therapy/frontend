export interface PostTestRequest {
  child_id: number;
  consent_agreed: boolean;
  test_type: string;
}

export type PostTestResponse = string;
