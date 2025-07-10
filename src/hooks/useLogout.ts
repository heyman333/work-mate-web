import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "../api/api";
import { toaster } from "@/components/ui/toaster";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const auth = new Api().auth;
      return auth.logoutCreate();
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Success",
        description: "로그아웃 되었습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.clear();
    },
  });
};
