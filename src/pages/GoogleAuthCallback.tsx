import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import api from "@/utils/api";
import { Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleAuthCallback = () => {
  const { handleCallback } = useGoogleAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      handleCallback(code, async (user) => {
        const existingUser = await api.post(`/auth/check`, {
          email: user.email,
          googleId: user.id,
          githubId: "",
        });

        if (existingUser.data.user) {
          navigate(`/`);
          return;
        }

        navigate(
          `/join?id=${user.id}&email=${user.email}&name=${user.name}&picture=${user.picture}&type=google`
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

export default GoogleAuthCallback;
