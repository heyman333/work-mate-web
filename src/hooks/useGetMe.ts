import { useQuery } from "@tanstack/react-query";
import { Api } from "../api/api";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => {
      const auth = new Api().auth;
      return auth.getAuth();
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    throwOnError: false,
  });
};
