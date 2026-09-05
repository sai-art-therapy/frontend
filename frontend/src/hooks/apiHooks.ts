import {
  type MutationFunction,
  type QueryFunction,
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

const DEFAULT_STALE_TIME = 1000 * 60 * 5;

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ApiErrorDetail {
  code?: string;
  message?: string;
}

export interface ApiError {
  message?: string;
  detail?: string | ValidationError[] | ApiErrorDetail;
}

export type QueryOptions<TData, TResult = TData> = Omit<
  UseQueryOptions<TData, AxiosError<ApiError>, TResult, QueryKey>,
  "queryKey" | "queryFn"
>;

export type MutationOptions<TData = unknown, TVariables = void> = Omit<
  UseMutationOptions<TData, AxiosError<ApiError>, TVariables>,
  "mutationFn"
>;

export function useAppQuery<TData, TResult = TData>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData, QueryKey>,
  options?: QueryOptions<TData, TResult>,
) {
  return useQuery<TData, AxiosError<ApiError>, TResult, QueryKey>({
    queryKey,
    queryFn,
    staleTime: DEFAULT_STALE_TIME,
    ...options,
  });
}

export function useAppMutation<TData, TVariables>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: MutationOptions<TData, TVariables>,
) {
  return useMutation<TData, AxiosError<ApiError>, TVariables>({
    mutationFn,
    ...options,
  });
}
