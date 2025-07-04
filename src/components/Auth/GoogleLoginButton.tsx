import { Button } from "@chakra-ui/react";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { FaGoogle } from "react-icons/fa";

interface GoogleLoginButtonProps {
  isLoading?: boolean;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  width?: string;
}

function GoogleLoginButton({
  isLoading = false,
  variant = "outline",
  size = "md",
  width = "full",
}: GoogleLoginButtonProps) {
  const { login, isLoading: authLoading } = useGoogleAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <Button
      onClick={handleLogin}
      loading={isLoading || authLoading}
      variant={variant}
      size={size}
      width={width}
      colorScheme="gray"
      _hover={{ bg: "gray.50" }}
      _active={{ bg: "gray.100" }}
    >
      <FaGoogle />
      {isLoading || authLoading ? "로그인 중..." : "Google로 로그인"}
    </Button>
  );
}

export default GoogleLoginButton;
