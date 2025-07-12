import { useMutation } from "@tanstack/react-query";
import { Api } from "../api/api";
import { toaster } from "@/components/ui/toaster";

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: () => {
      return new Api().auth.deleteDelete();
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "회원탈퇴 완료",
        description: "계정이 성공적으로 삭제되었습니다.",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
    onError: (error) => {
      toaster.create({
        type: "error",
        title: "회원탈퇴 실패",
        description: "계정 삭제 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
      console.error("Account deletion failed:", error);
    },
  });
};
