import { Box, VStack, Text, Card, Button } from "@chakra-ui/react";
import { useViewportSize } from "../../hooks/useViewportSize";

export function MobileNotSupported() {
  const { isMobile } = useViewportSize();

  if (!isMobile) {
    return null;
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="gray.50"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Card.Root maxW="sm" variant="elevated" bg="white">
        <Card.Body p={8}>
          <VStack gap={6} textAlign="center">
            <VStack gap={3}>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                WorkMate
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                모바일은 지원하지 않습니다
              </Text>
              <Text fontSize="md" color="gray.600" lineHeight="1.6">
                Work Mate는 현재 모바일 환경을 지원하지 않습니다.
                <br />더 나은 경험을 위해 데스크탑에서 접속해주세요.
              </Text>
            </VStack>

            <VStack gap={4} w="full">
              <Box
                bg="blue.50"
                p={4}
                rounded="lg"
                borderLeft="4px solid"
                borderColor="blue.500"
                w="full"
              >
                <Text fontSize="sm" color="blue.700" fontWeight="medium">
                  권장 환경
                </Text>
                <Text fontSize="sm" color="blue.600" mt={1}>
                  • 화면 너비 768px 이상
                  <br />• 데스크탑 또는 태블릿 환경
                </Text>
              </Box>

              <Button
                onClick={handleRefresh}
                colorScheme="blue"
                variant="outline"
                size="sm"
                w="full"
              >
                새로고침
              </Button>
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
