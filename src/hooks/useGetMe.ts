import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import type { AxiosResponse } from "axios";
import type { SchemaUser } from "../types/api";

export const useGetMe = (): UseQueryResult<
  AxiosResponse<{ user: SchemaUser }>
> => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api.get("/auth/me"),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
