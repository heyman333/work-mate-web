import { IconButton, Text } from "@chakra-ui/react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  Api,
  type HttpResponse,
  type LikeCreateData,
  type LikeCreateError,
} from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toaster } from "../ui/toaster";
import { useGetMe } from "@/hooks/useGetMe";
import { useLoginModal } from "@/contexts/LoginModalContext";

interface LikeButtonProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "ghost" | "solid" | "outline";
  colorScheme?: string;
  disabled?: boolean;
  targetUserId: string;
}

export function LikeButton({
  size = "md",
  variant = "ghost",
  colorScheme = "red",
  disabled = false,
  targetUserId,
}: LikeButtonProps) {
  const queryClient = useQueryClient();
  const { openModal } = useLoginModal();
  const { data: user } = useGetMe();
  const isLoggedIn = !!user?.data.user;
  const { data: likeUserData } = useQuery({
    queryKey: ["likedUsersList"],
    queryFn: () => {
      return new Api().auth.likedUsersList();
    },
  });
  const { data: userData } = useQuery({
    queryKey: ["user", targetUserId],
    queryFn: () => {
      return new Api().auth.userDetail(targetUserId);
    },
  });

  const isLiked = likeUserData?.data.users?.some(
    (user) => user.id === targetUserId
  );
  const { mutate: like } = useMutation({
    mutationFn: () => {
      return new Api().auth.likeCreate(targetUserId);
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "좋아요 성공",
        description: "좋아요를 눌렀습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["likedUsersList"] });
      queryClient.invalidateQueries({ queryKey: ["user", targetUserId] });
    },
    onError: (error: HttpResponse<LikeCreateData, LikeCreateError>) => {
      toaster.create({
        type: "error",
        title: "좋아요 실패",
        description: error.error.error || "Unknown error",
      });
    },
  });

  const { mutate: unlike } = useMutation({
    mutationFn: () => {
      return new Api().auth.unlikeDelete(targetUserId);
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "좋아요 취소 성공",
        description: "좋아요를 취소했습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["likedUsersList"] });
      queryClient.invalidateQueries({ queryKey: ["user", targetUserId] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["likedUsersList"] });
      queryClient.invalidateQueries({ queryKey: ["user", targetUserId] });
    },
  });

  const handleClick = () => {
    if (disabled) return;

    if (isLoggedIn) {
      if (isLiked) {
        unlike();
      } else {
        like();
      }
    } else {
      openModal();
    }
  };

  return (
    <IconButton
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
      onClick={handleClick}
      variant={variant}
      size={size}
      colorScheme={isLiked ? colorScheme : "gray"}
      disabled={disabled}
      _hover={{
        transform: disabled ? "none" : "scale(1.1)",
        transition: "transform 0.2s ease-in-out",
      }}
      padding={2}
    >
      {isLiked ? <MdFavorite color="red" /> : <MdFavoriteBorder />}
      <Text fontSize="sm" color={isLiked ? "red.400" : "gray.500"}>
        {userData?.data.user?.likedByCount ?? 0}
      </Text>
    </IconButton>
  );
}
