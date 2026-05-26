import apiClient from './client'

export interface Child {
  child_id: number
  name: string
  birth_year: number
  gender: string
  created_at: string
  updated_at: string
}

export interface MyPageInfo {
  user: {
    user_id: number
    nickname: string
    email: string
    profile_image_url: string | null
  }
  summary: {
    joined_date: string
    joined_message: string
  }
  children: Child[]
}

export interface ChildCreateRequest {
  name: string
  birth_year: number
  gender: string
}

export interface ChildUpdateRequest {
  name?: string
  birth_year?: number
  gender?: string
}

export const getMyPage = () =>
  apiClient.get<MyPageInfo>('/mypage').then((r) => r.data)

export const updateProfile = (nickname: string) =>
  apiClient.patch('/mypage/profile', { nickname })

export const deleteAccount = () =>
  apiClient.delete('/mypage/account')

export const logout = () =>
  apiClient.post('/auth/logout')

export const getChildren = () =>
  apiClient.get<Child[]>('/children').then((r) => r.data)

export const createChild = (data: ChildCreateRequest) =>
  apiClient.post('/children', data)

export const updateChild = (childId: number, data: ChildUpdateRequest) =>
  apiClient.patch(`/children/${childId}`, data)

export const deleteChild = (childId: number) =>
  apiClient.delete(`/children/${childId}`)
