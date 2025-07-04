import { Button } from "@chakra-ui/react";
import { useGitHubAuth } from "../../hooks/useGitHubAuth";
import { FaGithub } from "react-icons/fa";

interface GitHubLoginButtonProps {
  isLoading?: boolean;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  width?: string;
}

function GitHubLoginButton({
  isLoading = false,
  variant = "outline",
  size = "md",
  width = "full",
}: GitHubLoginButtonProps) {
  const { login, isLoading: authLoading } = useGitHubAuth();

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
      <FaGithub />
      {isLoading || authLoading ? "로그인 중..." : "GitHub로 로그인"}
    </Button>
  );
}

export default GitHubLoginButton;
