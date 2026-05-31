import axiosInstance from "../apis/axiosInstance";

export interface Child {
  child_id: number;
  name: string;
  birth_year: number;
  gender: string;
  created_at: string;
  updated_at: string;
}

export interface MyPageInfo {
  user: {
    user_id: number;
    nickname: string;
    email: string;
    profile_image_url: string | null;
  };
  summary: {
    joined_date: string;
    joined_message: string;
  };
  children: Child[];
}

export interface ChildCreateRequest {
  name: string;
  birth_year: number;
  gender: string;
}

export interface ChildUpdateRequest {
  name?: string;
  birth_year?: number;
  gender?: string;
}

export interface TestCreateRequest {
  child_id: number;
  consent_agreed: boolean;
  test_type: "HTP";
}

export const getMyPage = () =>
  axiosInstance.get<MyPageInfo>("/mypage").then((r) => r.data);

export const updateProfile = (nickname: string) =>
  axiosInstance.patch("/mypage/profile", { nickname });

export const deleteAccount = () => axiosInstance.delete("/mypage/account");

export const logout = () => axiosInstance.post("/auth/logout");

export const getChildren = () =>
  axiosInstance.get<Child[]>("/children").then((r) => r.data);

export const createChild = (data: ChildCreateRequest) =>
  axiosInstance.post("/children", data);

export const updateChild = (childId: number, data: ChildUpdateRequest) =>
  axiosInstance.patch(`/children/${childId}`, data);

export const deleteChild = (childId: number) =>
  axiosInstance.delete(`/children/${childId}`);

export const startTest = (data: TestCreateRequest) =>
  axiosInstance.post("/tests", data).then((r) => r.data);
