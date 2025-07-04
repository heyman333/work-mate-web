import {
  Avatar,
  Button,
  Container,
  Field,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api";
import type { AxiosError } from "axios";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

const Join = () => {
  const [searchParams] = useSearchParams();
  const defaultEmail = searchParams.get("email") || "";
  const defaultName = searchParams.get("name") || "";
  const defaultProfileImage = searchParams.get("picture") || "";
  const type = searchParams.get("type") || "";
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [profileImage] = useState(defaultProfileImage);
  const navigate = useNavigate();

  const { mutate: join } = useMutation({
    mutationFn: () => {
      return api.post(`/auth/join`, {
        email,
        name,
        profileImage,
        githubId: type === "github" ? searchParams.get("id") : "",
        googleId: type === "google" ? searchParams.get("id") : "",
      });
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toaster.create({
        type: "error",
        title: "Error",
        description: error.response?.data.error || "Unknown error",
      });
    },
  });

  return (
    <Container
      w="100vw"
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Avatar.Root size="xl" mb="8">
        <Avatar.Fallback name={name} />
        <Avatar.Image src={profileImage} />
      </Avatar.Root>
      <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
        <Field.Root orientation="horizontal">
          <Field.Label>Name</Field.Label>
          <Input
            placeholder="John Doe"
            flex="1"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field.Root>

        <Field.Root orientation="horizontal">
          <Field.Label>Email</Field.Label>
          <Input
            placeholder="me@example.com"
            flex="1"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field.Root>
      </Stack>
      <HStack mt={20}>
        <Button onClick={() => join()}>가입하기</Button>
      </HStack>
    </Container>
  );
};

export default Join;
