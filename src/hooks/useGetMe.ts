import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import type { User } from "../types";
import type { AxiosResponse } from "axios";

export const useGetMe = (): UseQueryResult<AxiosResponse<{ user: User }>> => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api.get("/auth/me"),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
