import { useGitHubAuth } from "@/hooks/useGitHubAuth";
import api from "@/utils/api";
import { Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GithubAuthCallback = () => {
  const navigate = useNavigate();
  const { handleCallback } = useGitHubAuth();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      handleCallback(code, async (user) => {
        const existingUser = await api.post(`/auth/check`, {
          email: user.email,
          googleId: "",
          githubId: String(user.id),
        });

        if (existingUser.data.user) {
          navigate(`/`);
          return;
        }

        navigate(
          `/join?id=${user.id}&email=${user.email}&name=${user.name}&picture=${user.avatar_url}&type=github`
        );
      });
    }
  }, [code, handleCallback, navigate]);

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Text textStyle="sm">로딩중...</Text>
    </Container>
  );
};

export default GithubAuthCallback;
