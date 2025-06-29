import { Button, HStack, Container, Text } from "@chakra-ui/react";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useGetMe } from "@/hooks/useGetMe";
import { useGitHubAuth } from "@/hooks/useGitHubAuth";

function Home() {
  const { login } = useGoogleAuth();
  const { login: loginGithub } = useGitHubAuth();
  const { data: me } = useGetMe();

  return (
    <Container
      bg="white"
      h="100vh"
      w="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <HStack gap={4}>
        <Button color="white" bg="blue.500" onClick={login}>
          Google Login
        </Button>
        <Button color="white" bg="green.500" onClick={loginGithub}>
          Github Login
        </Button>
      </HStack>
      <Text>{me?.data.user.name}</Text>
    </Container>
  );
}

export default Home;
