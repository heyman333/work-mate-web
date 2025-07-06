import {
  Box,
  Button,
  Container,
  Input,
  Textarea,
  VStack,
  Heading,
  Field,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "@/api/api";
import { toaster } from "../ui/toaster";
import { useNavigate } from "react-router-dom";

const profileFormSchema = z.object({
  skills: z.string().min(1, "스킬셋을 입력해주세요"),
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
  organization: z
    .string()
    .min(1, "소속(회사 또는 학교)을 입력해주세요")
    .optional()
    .or(z.literal("")),
  mbti: z.string().min(1, "MBTI를 입력해주세요").optional().or(z.literal("")),
  collaborationGoal: z
    .string()
    .min(1, "협업을 통해 이루고자 하는 것을 입력해주세요")
    .optional()
    .or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export const ProfileForm = () => {
  const navigate = useNavigate();
  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: ProfileFormData) => {
      return new Api().auth.updateUpdate({
        skillSet: data.skills,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        mbti: data.mbti,
        collaborationGoal: data.collaborationGoal,
        company: data.organization,
      });
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Success",
        description: "프로필이 저장되었습니다.",
      });
      navigate("/", { replace: true });
    },
    onError: () => {
      toaster.create({
        type: "error",
        title: "Error",
        description: "프로필 저장에 실패했습니다.",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      skills: "",
      githubUrl: "",
      linkedinUrl: "",
      organization: "",
      mbti: "",
      collaborationGoal: "",
    },
  });

  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const me = await new Api().auth.getAuth();
      setValue("skills", me.data.user?.skillSet || "");
      setValue("githubUrl", me.data.user?.githubUrl || "");
      setValue("linkedinUrl", me.data.user?.linkedinUrl || "");
      setValue("organization", me.data.user?.company || "");
      setValue("mbti", me.data.user?.mbti || "");
      setValue("collaborationGoal", me.data.user?.collaborationGoal || "");
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    throwOnError: false,
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
  };

  return (
    <Container maxW="2xl" py={8}>
      <VStack gap={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          프로필 설정
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={6} align="stretch">
            <Box p={6} borderWidth={1} borderRadius="md">
              <VStack gap={6} align="stretch">
                <Heading size="md">기본 정보</Heading>
                <VStack gap={6} align="stretch">
                  <Field.Root>
                    <Field.Label>가진 스킬셋</Field.Label>
                    <Textarea
                      {...register("skills")}
                      placeholder="예: JavaScript, React, Node.js, Python, 데이터 분석, 디자인, 마케팅 등"
                      rows={3}
                    />
                    {errors.skills && (
                      <Field.ErrorText>{errors.skills.message}</Field.ErrorText>
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
                      {...register("organization")}
                      placeholder="예: 삼성전자, 서울대학교, 네이버 등"
                    />
                    {errors.organization && (
                      <Field.ErrorText>
                        {errors.organization.message}
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
                    <Field.Label>협업을 통해 이루고자 하는 것</Field.Label>
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
                {isSubmitting ? "저장 중..." : "프로필 저장"}
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
