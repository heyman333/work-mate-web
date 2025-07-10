import { useState } from "react";
import {
  Dialog,
  Avatar,
  Text,
  VStack,
  HStack,
  IconButton,
  Box,
  Portal,
  Badge,
  Separator,
  Card,
  Link,
  CloseButton,
} from "@chakra-ui/react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdBusiness,
  MdCode,
  MdGroup,
  MdLink,
} from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { format } from "date-fns";
import { type GetWorkplaceData } from "../../api/api";

type WorkPlace = NonNullable<GetWorkplaceData["workPlaces"]>[number];

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  workplaces: WorkPlace[];
  initialIndex?: number;
}

export function CreatorModal({
  workplaces,
  initialIndex = 0,
}: CreatorModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentWorkplace = workplaces[currentIndex];
  const currentCreator = currentWorkplace?.creator;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : workplaces.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < workplaces.length - 1 ? prev + 1 : 0));
  };

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>크리에이터 정보</Dialog.Title>
            <Dialog.CloseTrigger>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body pb={6}>
            <VStack gap={6}>
              <Box position="relative" w="full">
                <HStack justify="space-between" align="center">
                  <IconButton
                    aria-label="이전"
                    onClick={goToPrevious}
                    variant="ghost"
                    size="2xl"
                    disabled={workplaces.length <= 1}
                  >
                    <MdChevronLeft />
                  </IconButton>

                  <Card.Root maxW="lg" variant="elevated">
                    <Card.Body>
                      <VStack gap={6}>
                        {/* Profile Section */}
                        <VStack gap={3}>
                          <Avatar.Root size="2xl">
                            <Avatar.Image src={currentCreator?.profileImage} />
                            <Avatar.Fallback>
                              {currentCreator?.name?.[0]}
                            </Avatar.Fallback>
                          </Avatar.Root>
                          <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            textAlign="center"
                          >
                            {currentCreator?.name}
                          </Text>
                        </VStack>

                        <Separator />

                        {/* Workplace Info */}
                        {currentWorkplace?.name && (
                          <VStack gap={2}>
                            <HStack>
                              <MdBusiness />
                              <Text fontSize="md" fontWeight="medium">
                                작업 공간
                              </Text>
                            </HStack>
                            <Text
                              fontSize="sm"
                              color="gray.700"
                              textAlign="center"
                            >
                              {currentWorkplace?.name}
                            </Text>
                            {currentWorkplace?.description &&
                              currentWorkplace?.description.length > 0 &&
                              currentWorkplace?.description.map((workspace) => (
                                <HStack>
                                  {workspace.date && (
                                    <Text fontSize="sm" color="gray.600">
                                      {format(workspace.date, "yyyy-MM-dd")}
                                    </Text>
                                  )}
                                  <Text fontSize="sm" color="gray.600">
                                    {workspace.content}
                                  </Text>
                                </HStack>
                              ))}
                          </VStack>
                        )}

                        {/* Skills & Company */}
                        <VStack gap={4}>
                          {currentCreator?.skillSet && (
                            <VStack gap={2}>
                              <HStack>
                                <MdCode />
                                <Text fontSize="md" fontWeight="medium">
                                  기술 스택
                                </Text>
                              </HStack>
                              <Badge
                                colorScheme="blue"
                                variant="solid"
                                px={3}
                                py={1}
                              >
                                {currentCreator?.skillSet}
                              </Badge>
                            </VStack>
                          )}

                          {currentCreator?.company && (
                            <VStack gap={2}>
                              <HStack>
                                <MdGroup />
                                <Text fontSize="md" fontWeight="medium">
                                  소속
                                </Text>
                              </HStack>
                              <Text fontSize="sm" color="gray.700">
                                {currentCreator?.company}
                              </Text>
                            </VStack>
                          )}

                          {currentCreator?.mbti && (
                            <VStack gap={2}>
                              <Text fontSize="md" fontWeight="medium">
                                MBTI
                              </Text>
                              <Badge
                                colorScheme="purple"
                                variant="outline"
                                px={3}
                                py={1}
                              >
                                {currentCreator?.mbti}
                              </Badge>
                            </VStack>
                          )}
                        </VStack>

                        {/* Social Links */}
                        {(currentCreator?.githubUrl ||
                          currentCreator?.linkedinUrl) && (
                          <>
                            <Separator />
                            <VStack gap={3}>
                              <HStack>
                                <MdLink />
                                <Text fontSize="md" fontWeight="medium">
                                  소셜 링크
                                </Text>
                              </HStack>
                              <HStack gap={4}>
                                {currentCreator?.githubUrl && (
                                  <Link
                                    href={currentCreator?.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    _hover={{ transform: "scale(1.1)" }}
                                    transition="transform 0.2s"
                                  >
                                    <HStack
                                      gap={2}
                                      bg="gray.100"
                                      px={3}
                                      py={2}
                                      rounded="md"
                                    >
                                      <FaGithub />
                                      <Text fontSize="sm">GitHub</Text>
                                    </HStack>
                                  </Link>
                                )}
                                {currentCreator?.linkedinUrl && (
                                  <Link
                                    href={currentCreator?.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    _hover={{ transform: "scale(1.1)" }}
                                    transition="transform 0.2s"
                                  >
                                    <HStack
                                      gap={2}
                                      bg="blue.100"
                                      px={3}
                                      py={2}
                                      rounded="md"
                                    >
                                      <FaLinkedin color="#0077B5" />
                                      <Text fontSize="sm">LinkedIn</Text>
                                    </HStack>
                                  </Link>
                                )}
                              </HStack>
                            </VStack>
                          </>
                        )}

                        {/* Collaboration Goal */}
                        {currentCreator?.collaborationGoal && (
                          <>
                            <Separator />
                            <VStack gap={2}>
                              <Text fontSize="md" fontWeight="medium">
                                협업 목표
                              </Text>
                              <Text
                                fontSize="sm"
                                color="gray.700"
                                textAlign="center"
                                lineHeight="1.6"
                              >
                                {currentCreator?.collaborationGoal}
                              </Text>
                            </VStack>
                          </>
                        )}
                      </VStack>
                    </Card.Body>
                  </Card.Root>

                  <IconButton
                    aria-label="다음"
                    onClick={goToNext}
                    variant="ghost"
                    size="2xl"
                    disabled={workplaces.length <= 1}
                  >
                    <MdChevronRight />
                  </IconButton>
                </HStack>

                {workplaces.length > 1 && (
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    textAlign="center"
                    mt={4}
                  >
                    {currentIndex + 1} / {workplaces.length}
                  </Text>
                )}
              </Box>
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}
