import { useState, useCallback } from "react";

interface UseLikeOptions {
  initialLiked?: boolean;
  onLikeChange?: (liked: boolean, itemId?: string | number) => void;
  itemId?: string | number;
}

interface UseLikeReturn {
  isLiked: boolean;
  toggleLike: () => void;
  setLiked: (liked: boolean) => void;
}

export function useLike({
  initialLiked = false,
  onLikeChange,
  itemId,
}: UseLikeOptions = {}): UseLikeReturn {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const toggleLike = useCallback(() => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onLikeChange?.(newLikedState, itemId);
  }, [isLiked, onLikeChange, itemId]);

  const setLiked = useCallback((liked: boolean) => {
    setIsLiked(liked);
    onLikeChange?.(liked, itemId);
  }, [onLikeChange, itemId]);

  return {
    isLiked,
    toggleLike,
    setLiked,
  };
}