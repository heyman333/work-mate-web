import {
  Avatar,
  Box,
  Button,
  Container,
  Input,
  Textarea,
  VStack,
  Heading,
  Stack,
  Field,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Api, type UserJoinRequest } from "@/api/api";

const joinFormSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  skillSet: z
    .string()
    .min(1, "스킬셋을 입력해주세요")
    .optional()
    .or(z.literal("")),
  githubUrl: z
    .string()
    .url("올바른 Github URL을 입력해주세요")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("올바른 LinkedIn URL을 입력해주세요")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .min(1, "소속(회사 또는 학교)을 입력해주세요")
    .optional()
    .or(z.literal("")),
  mbti: z.string().min(1, "MBTI를 입력해주세요").optional().or(z.literal("")),
  collaborationGoal: z
    .string()
    .min(1, "협업하고 싶은 분야을 입력해주세요")
    .optional()
    .or(z.literal("")),
});

type JoinFormData = z.infer<typeof joinFormSchema>;

const Join = () => {
  const [searchParams] = useSearchParams();
  const defaultEmail = searchParams.get("email") || "";
  const defaultName = searchParams.get("name") || "";
  const defaultProfileImage = searchParams.get("picture") || "";
  const type = searchParams.get("type") || "";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      name: defaultName,
      email: defaultEmail,
      skillSet: "",
      githubUrl: "",
      linkedinUrl: "",
      company: "",
      mbti: "",
      collaborationGoal: "",
    },
  });

  const { mutate: join } = useMutation({
    mutationFn: (data: UserJoinRequest) => {
      console.log(data);
      return new Api().auth.joinCreate({
        email: data.email,
        name: data.name,
        profileImage: defaultProfileImage,
        githubId: type === "github" ? searchParams.get("id") || "" : undefined,
        googleId: type === "google" ? searchParams.get("id") || "" : undefined,
        skillSet: data.skillSet,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        company: data.company,
        mbti: data.mbti,
        collaborationGoal: data.collaborationGoal,
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

  const onSubmit = (data: UserJoinRequest) => {
    join(data);
  };

  return (
    <Container maxW="2xl" py={8}>
      <VStack gap={8} align="stretch">
        <VStack gap={4}>
          <Avatar.Root size="xl">
            <Avatar.Fallback name={defaultName} />
            <Avatar.Image src={defaultProfileImage} />
          </Avatar.Root>
          <Heading as="h1" size="xl" textAlign="center">
            회원가입
          </Heading>
        </VStack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={6} align="stretch">
            <Box p={6} borderWidth={1} borderRadius="md">
              <VStack gap={6} align="stretch">
                <Heading size="md">기본 정보</Heading>
                <VStack gap={6} align="stretch">
                  <Stack gap={2}>
                    <Field.Root required>
                      <Field.Label>
                        이름
                        <Field.RequiredIndicator />
                      </Field.Label>

                      <Input {...register("name")} placeholder="홍길동" />
                    </Field.Root>

                    {errors.name && (
                      <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                    )}
                  </Stack>

                  <Field.Root required>
                    <Field.Label>
                      이메일
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      {...register("email")}
                      placeholder="me@example.com"
                      type="email"
                    />
                    {errors.email && (
                      <Field.ErrorText>{errors.email.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>가진 스킬셋</Field.Label>
                    <Textarea
                      {...register("skillSet")}
                      placeholder="예: JavaScript, React, Node.js, Python, 데이터 분석, 디자인, 마케팅 등"
                      rows={3}
                    />
                    {errors.skillSet && (
                      <Field.ErrorText>
                        {errors.skillSet.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Github 주소</Field.Label>
                    <Input
                      {...register("githubUrl")}
                      placeholder="https://github.com/username"
                      type="url"
                    />
                    {errors.githubUrl && (
                      <Field.ErrorText>
                        {errors.githubUrl.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>LinkedIn 주소</Field.Label>
                    <Input
                      {...register("linkedinUrl")}
                      placeholder="https://linkedin.com/in/username"
                      type="url"
                    />
                    {errors.linkedinUrl && (
                      <Field.ErrorText>
                        {errors.linkedinUrl.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>소속 (회사 또는 학교)</Field.Label>
                    <Input
                      {...register("company")}
                      placeholder="예: 삼성전자, 서울대학교, 네이버 등"
                    />
                    {errors.company && (
                      <Field.ErrorText>
                        {errors.company.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>MBTI</Field.Label>
                    <Input
                      {...register("mbti")}
                      placeholder="예: ENFP, INTJ, ISTP 등"
                    />
                    {errors.mbti && (
                      <Field.ErrorText>{errors.mbti.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>협업하고 싶은 분야</Field.Label>
                    <Textarea
                      {...register("collaborationGoal")}
                      placeholder="예: 새로운 기술 스택 습득, 네트워킹, 프로젝트 경험 쌓기, 멘토링 등"
                      rows={4}
                    />
                    {errors.collaborationGoal && (
                      <Field.ErrorText>
                        {errors.collaborationGoal.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                </VStack>
              </VStack>
            </Box>

            <VStack gap={4}>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                loading={isSubmitting}
                w="full"
              >
                {isSubmitting ? "가입 중..." : "가입하기"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
                w="full"
              >
                취소
              </Button>
            </VStack>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Join;
