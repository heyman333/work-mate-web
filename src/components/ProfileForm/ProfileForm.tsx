import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Input,
  Textarea,
  VStack,
  HStack,
  Grid,
  GridItem,
  Heading,
  Stack,
  Flex,
  Text,
  Separator,
  Badge,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { useGetMe } from "@/hooks/useGetMe";

interface ProfileFormData {
  // 기본 신상 정보
  name: string;
  photo: File | null;
  position: string;
  department: string;
  email: string;
  phone: string;
  workLocation: string;

  // 전문 분야 & 스킬/기술
  expertise: string[];
  skills: string[];
  programmingLanguages: string[];

  // 멘토링/협업 목표
  learningGoals: string[];
  careerGoals: string[];
  projectExperience: string;

  // 경력/경험 수준
  totalExperience: number;
  expertiseLevel: string;

  // 가용성 정보
  availableTimeSlots: string[];
  frequency: string;

  // 매칭 선호도 & 스타일
  matchingPreference: string;

  // 다양성 & 포용성 관련 데이터
  gender: string;
  culturalBackground: string;
  languages: string[];
  affinity: string[];

  // 커뮤니케이션 스타일
  communicationStyle: string[];

  // 성격 및 심리적 특징
  problemSolvingStyle: string;
  personalityType: string;

  // 기타 관심사
  hobbies: string[];
  readingInterests: string[];
  socialActivities: string[];
}

export const ProfileForm = () => {
  const { data: user } = useGetMe();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    photo: null,
    position: "",
    department: "",
    email: "",
    phone: "",
    workLocation: "",
    expertise: [],
    skills: [],
    programmingLanguages: [],
    learningGoals: [],
    careerGoals: [],
    projectExperience: "",
    totalExperience: 0,
    expertiseLevel: "",
    availableTimeSlots: [],
    frequency: "",
    matchingPreference: "",
    gender: "",
    culturalBackground: "",
    languages: [],
    affinity: [],
    communicationStyle: [],
    problemSolvingStyle: "",
    personalityType: "",
    hobbies: [],
    readingInterests: [],
    socialActivities: [],
  });

  const [newTag, setNewTag] = useState("");
  const [currentSection, setCurrentSection] = useState("basic");

  const handleInputChange = (
    field: keyof ProfileFormData,
    value: string | number | string[] | File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = (field: keyof ProfileFormData, tag: string) => {
    const currentValue = formData[field];
    if (
      tag.trim() &&
      Array.isArray(currentValue) &&
      !currentValue.includes(tag)
    ) {
      handleInputChange(field, [...currentValue, tag.trim()]);
    }
    setNewTag("");
  };

  const handleRemoveTag = (
    field: keyof ProfileFormData,
    tagToRemove: string
  ) => {
    const currentValue = formData[field];
    if (Array.isArray(currentValue)) {
      handleInputChange(
        field,
        currentValue.filter((tag) => tag !== tagToRemove)
      );
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange("photo", file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("프로필이 저장되었습니다.");
  };

  const handleCheckboxChange = (
    field: keyof ProfileFormData,
    value: string,
    checked: boolean
  ) => {
    const currentValue = formData[field] as string[];
    if (checked) {
      handleInputChange(field, [...currentValue, value]);
    } else {
      handleInputChange(
        field,
        currentValue.filter((item) => item !== value)
      );
    }
  };

  const FormField = ({
    label,
    required = false,
    children,
  }: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
  }) => (
    <Box>
      <Text mb={2} fontWeight="medium">
        {label}
        {required && " *"}
      </Text>
      {children}
    </Box>
  );

  const TagInput = ({
    field,
    placeholder,
  }: {
    field: keyof ProfileFormData;
    placeholder: string;
  }) => {
    const currentValue = formData[field];
    const tags = Array.isArray(currentValue) ? currentValue : [];

    return (
      <VStack align="stretch" gap={2}>
        <HStack>
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag(field, newTag);
              }
            }}
          />
          <Button onClick={() => handleAddTag(field, newTag)} size="sm">
            추가
          </Button>
        </HStack>
        <Flex wrap="wrap" gap={2}>
          {tags.map((tag: string, index: number) => (
            <Badge
              key={index}
              variant="subtle"
              cursor="pointer"
              onClick={() => handleRemoveTag(field, tag)}
              _hover={{ bg: "red.100" }}
            >
              {tag} ×
            </Badge>
          ))}
        </Flex>
      </VStack>
    );
  };

  const sections = [
    { id: "basic", label: "기본 정보" },
    { id: "expertise", label: "전문 분야 & 스킬" },
    { id: "goals", label: "멘토링/협업 목표" },
    { id: "experience", label: "경력/경험" },
    { id: "availability", label: "가용성" },
    { id: "matching", label: "매칭 선호도" },
    { id: "diversity", label: "다양성 & 포용성" },
    { id: "communication", label: "커뮤니케이션" },
    { id: "personality", label: "성격 & 심리" },
    { id: "interests", label: "관심사" },
  ];

  return (
    <Container maxW="4xl" py={8}>
      <VStack gap={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          프로필 설정
        </Heading>

        <HStack gap={2} wrap="wrap" justify="center">
          {sections.map((section) => (
            <Button
              key={section.id}
              size="sm"
              variant={currentSection === section.id ? "solid" : "outline"}
              onClick={() => setCurrentSection(section.id)}
            >
              {section.label}
            </Button>
          ))}
        </HStack>

        <form onSubmit={handleSubmit}>
          <VStack gap={6} align="stretch">
            {/* 기본 신상 정보 */}
            {currentSection === "basic" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={4} align="stretch">
                  <Heading size="md">기본 신상 정보</Heading>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem colSpan={2}>
                      <FormField label="프로필 사진">
                        <VStack gap={4}>
                          <Box
                            w="120px"
                            h="120px"
                            borderRadius="full"
                            bg="gray.100"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            overflow="hidden"
                          >
                            {formData.photo ? (
                              <img
                                src={URL.createObjectURL(formData.photo)}
                                alt="Profile"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <Text color="gray.500">사진 없음</Text>
                            )}
                          </Box>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            style={{ display: "none" }}
                            id="photo-upload"
                          />
                          <label
                            htmlFor="photo-upload"
                            style={{ cursor: "pointer" }}
                          >
                            <Button size="sm" as="span">
                              <FiUpload /> 사진 업로드
                            </Button>
                          </label>
                        </VStack>
                      </FormField>
                    </GridItem>
                    <GridItem>
                      <FormField label="이름" required>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="이름을 입력하세요"
                        />
                      </FormField>
                    </GridItem>
                    <GridItem>
                      <FormField label="직책" required>
                        <Input
                          value={formData.position}
                          onChange={(e) =>
                            handleInputChange("position", e.target.value)
                          }
                          placeholder="직책을 입력하세요"
                        />
                      </FormField>
                    </GridItem>
                    <GridItem>
                      <FormField label="부서" required>
                        <Input
                          value={formData.department}
                          onChange={(e) =>
                            handleInputChange("department", e.target.value)
                          }
                          placeholder="부서를 입력하세요"
                        />
                      </FormField>
                    </GridItem>
                    <GridItem>
                      <FormField label="이메일" required>
                        <Input
                          defaultValue={user?.data?.user?.email}
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="이메일을 입력하세요"
                        />
                      </FormField>
                    </GridItem>
                    <GridItem>
                      <FormField label="연락처">
                        <Input
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="연락처를 입력하세요"
                        />
                      </FormField>
                    </GridItem>
                    <GridItem>
                      <FormField label="근무 위치">
                        <Input
                          value={formData.workLocation}
                          onChange={(e) =>
                            handleInputChange("workLocation", e.target.value)
                          }
                          placeholder="근무 위치를 입력하세요"
                        />
                      </FormField>
                    </GridItem>
                  </Grid>
                </VStack>
              </Box>
            )}

            {/* 전문 분야 & 스킬/기술 */}
            {currentSection === "expertise" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={6} align="stretch">
                  <Heading size="md">전문 분야 & 스킬/기술</Heading>
                  <FormField label="전문 분야">
                    <TagInput
                      field="expertise"
                      placeholder="예: 전략 기획, 마케팅, 데이터 분석"
                    />
                  </FormField>
                  <FormField label="스킬/기술">
                    <TagInput
                      field="skills"
                      placeholder="예: Excel, PowerPoint, Tableau"
                    />
                  </FormField>
                  <FormField label="프로그래밍 언어">
                    <TagInput
                      field="programmingLanguages"
                      placeholder="예: Python, JavaScript, Java"
                    />
                  </FormField>
                </VStack>
              </Box>
            )}

            {/* 멘토링/협업 목표 */}
            {currentSection === "goals" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={6} align="stretch">
                  <Heading size="md">멘토링/협업 목표</Heading>
                  <FormField label="배우고 싶은 내용">
                    <TagInput
                      field="learningGoals"
                      placeholder="예: 리더십, 프로젝트 관리, 신기술"
                    />
                  </FormField>
                  <FormField label="경력 발전 목표">
                    <TagInput
                      field="careerGoals"
                      placeholder="예: 팀 리더 승진, 해외 업무 경험"
                    />
                  </FormField>
                  <FormField label="프로젝트 경험">
                    <Textarea
                      value={formData.projectExperience}
                      onChange={(e) =>
                        handleInputChange("projectExperience", e.target.value)
                      }
                      placeholder="주요 프로젝트 경험을 자세히 설명해주세요"
                      rows={4}
                    />
                  </FormField>
                </VStack>
              </Box>
            )}

            {/* 경력/경험 수준 */}
            {currentSection === "experience" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={4} align="stretch">
                  <Heading size="md">경력/경험 수준</Heading>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormField label="총 경력 연수">
                        <Input
                          type="number"
                          value={formData.totalExperience}
                          onChange={(e) =>
                            handleInputChange(
                              "totalExperience",
                              parseInt(e.target.value) || 0
                            )
                          }
                          min={0}
                          max={50}
                        />
                      </FormField>
                    </GridItem>
                    <GridItem>
                      <FormField label="전문 분야 숙련도">
                        <select
                          value={formData.expertiseLevel}
                          onChange={(e) =>
                            handleInputChange("expertiseLevel", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #E2E8F0",
                            borderRadius: "6px",
                            fontSize: "16px",
                          }}
                        >
                          <option value="">선택하세요</option>
                          <option value="beginner">초급</option>
                          <option value="intermediate">중급</option>
                          <option value="advanced">고급</option>
                          <option value="expert">전문가</option>
                        </select>
                      </FormField>
                    </GridItem>
                  </Grid>
                </VStack>
              </Box>
            )}

            {/* 가용성 정보 */}
            {currentSection === "availability" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={6} align="stretch">
                  <Heading size="md">가용성 정보</Heading>
                  <FormField label="협업 가능한 시간대">
                    <Stack direction="row" wrap="wrap" gap={4}>
                      {["morning", "afternoon", "evening", "night"].map(
                        (time) => (
                          <label
                            key={time}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={formData.availableTimeSlots.includes(
                                time
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  "availableTimeSlots",
                                  time,
                                  e.target.checked
                                )
                              }
                            />
                            {time === "morning" && "오전 (9-12시)"}
                            {time === "afternoon" && "오후 (12-18시)"}
                            {time === "evening" && "저녁 (18-21시)"}
                            {time === "night" && "야간 (21시 이후)"}
                          </label>
                        )
                      )}
                    </Stack>
                  </FormField>
                  <FormField label="만남 빈도">
                    <Stack direction="row" wrap="wrap" gap={4}>
                      {["weekly", "biweekly", "monthly", "quarterly"].map(
                        (freq) => (
                          <label
                            key={freq}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <input
                              type="radio"
                              name="frequency"
                              value={freq}
                              checked={formData.frequency === freq}
                              onChange={(e) =>
                                handleInputChange("frequency", e.target.value)
                              }
                            />
                            {freq === "weekly" && "주 1회"}
                            {freq === "biweekly" && "격주 1회"}
                            {freq === "monthly" && "월 1회"}
                            {freq === "quarterly" && "분기 1회"}
                          </label>
                        )
                      )}
                    </Stack>
                  </FormField>
                </VStack>
              </Box>
            )}

            {/* 매칭 선호도 & 스타일 */}
            {currentSection === "matching" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={4} align="stretch">
                  <Heading size="md">매칭 선호도 & 스타일</Heading>
                  <FormField label="매칭 방식 선호도">
                    <Stack gap={4}>
                      {["self", "admin", "algorithm"].map((method) => (
                        <label
                          key={method}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="radio"
                            name="matchingPreference"
                            value={method}
                            checked={formData.matchingPreference === method}
                            onChange={(e) =>
                              handleInputChange(
                                "matchingPreference",
                                e.target.value
                              )
                            }
                          />
                          {method === "self" && "Self-match (스스로 선택)"}
                          {method === "admin" && "Admin-match (관리자 추천)"}
                          {method === "algorithm" &&
                            "Algorithm-match (알고리즘 자동 매칭)"}
                        </label>
                      ))}
                    </Stack>
                  </FormField>
                </VStack>
              </Box>
            )}

            {/* 다양성 & 포용성 관련 데이터 */}
            {currentSection === "diversity" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={4} align="stretch">
                  <Heading size="md">다양성 & 포용성 관련 데이터</Heading>
                  <Text fontSize="sm" color="gray.500">
                    * 언컨셔스 바이어스 방지를 위한 정보입니다 (선택사항)
                  </Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormField label="성별">
                        <select
                          value={formData.gender}
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #E2E8F0",
                            borderRadius: "6px",
                            fontSize: "16px",
                          }}
                        >
                          <option value="">선택하세요</option>
                          <option value="male">남성</option>
                          <option value="female">여성</option>
                          <option value="other">기타</option>
                          <option value="prefer-not-to-say">
                            답변하지 않음
                          </option>
                        </select>
                      </FormField>
                    </GridItem>
                    <GridItem>
                      <FormField label="문화 배경">
                        <Input
                          value={formData.culturalBackground}
                          onChange={(e) =>
                            handleInputChange(
                              "culturalBackground",
                              e.target.value
                            )
                          }
                          placeholder="예: 한국, 미국, 중국"
                        />
                      </FormField>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <FormField label="사용 가능한 언어">
                        <TagInput
                          field="languages"
                          placeholder="예: 한국어, 영어, 중국어"
                        />
                      </FormField>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <FormField label="소속 그룹/커뮤니티">
                        <TagInput
                          field="affinity"
                          placeholder="예: 여성 개발자 모임, 스타트업 네트워크"
                        />
                      </FormField>
                    </GridItem>
                  </Grid>
                </VStack>
              </Box>
            )}

            {/* 커뮤니케이션 스타일 */}
            {currentSection === "communication" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={4} align="stretch">
                  <Heading size="md">커뮤니케이션 스타일</Heading>
                  <FormField label="선호하는 협업 방식">
                    <Stack gap={3}>
                      {[
                        "text-chat",
                        "video-call",
                        "voice-call",
                        "offline-meeting",
                        "email",
                        "collaborative-tools",
                      ].map((style) => (
                        <label
                          key={style}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.communicationStyle.includes(
                              style
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "communicationStyle",
                                style,
                                e.target.checked
                              )
                            }
                          />
                          {style === "text-chat" && "텍스트 채팅"}
                          {style === "video-call" && "화상 회의"}
                          {style === "voice-call" && "음성 통화"}
                          {style === "offline-meeting" && "오프라인 미팅"}
                          {style === "email" && "이메일"}
                          {style === "collaborative-tools" &&
                            "협업 도구 (Slack, Teams 등)"}
                        </label>
                      ))}
                    </Stack>
                  </FormField>
                </VStack>
              </Box>
            )}

            {/* 성격 및 심리적 특징 */}
            {currentSection === "personality" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={4} align="stretch">
                  <Heading size="md">성격 및 심리적 특징</Heading>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormField label="문제 해결 스타일">
                        <select
                          value={formData.problemSolvingStyle}
                          onChange={(e) =>
                            handleInputChange(
                              "problemSolvingStyle",
                              e.target.value
                            )
                          }
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #E2E8F0",
                            borderRadius: "6px",
                            fontSize: "16px",
                          }}
                        >
                          <option value="">선택하세요</option>
                          <option value="analytical">분석적</option>
                          <option value="creative">창의적</option>
                          <option value="collaborative">협력적</option>
                          <option value="systematic">체계적</option>
                          <option value="intuitive">직관적</option>
                        </select>
                      </FormField>
                    </GridItem>
                    <GridItem>
                      <FormField label="성향 테스트 결과">
                        <Input
                          value={formData.personalityType}
                          onChange={(e) =>
                            handleInputChange("personalityType", e.target.value)
                          }
                          placeholder="예: ENFP, DISC-I"
                        />
                      </FormField>
                    </GridItem>
                  </Grid>
                </VStack>
              </Box>
            )}

            {/* 기타 관심사 */}
            {currentSection === "interests" && (
              <Box p={6} borderWidth={1} borderRadius="md">
                <VStack gap={6} align="stretch">
                  <Heading size="md">기타 관심사</Heading>
                  <FormField label="취미">
                    <TagInput
                      field="hobbies"
                      placeholder="예: 독서, 운동, 여행, 음악"
                    />
                  </FormField>
                  <FormField label="독서 관심 분야">
                    <TagInput
                      field="readingInterests"
                      placeholder="예: 비즈니스, 자기계발, 소설, 과학"
                    />
                  </FormField>
                  <FormField label="소셜 활동">
                    <TagInput
                      field="socialActivities"
                      placeholder="예: 봉사활동, 스터디 모임, 동호회"
                    />
                  </FormField>
                </VStack>
              </Box>
            )}

            <Separator />

            <HStack justify="center" gap={4}>
              <Button type="submit" colorScheme="blue" size="lg">
                프로필 저장
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
              >
                취소
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};
