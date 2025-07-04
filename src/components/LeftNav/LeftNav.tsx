import { Box, VStack, Text, Button, HStack, Avatar } from "@chakra-ui/react";
import { FiHome, FiSearch, FiBookmark, FiSettings } from "react-icons/fi";
import GoogleLoginButton from "../Auth/GoogleLoginButton";
import GitHubLoginButton from "../Auth/GitHubLoginButton";
import { useGetMe } from "../../hooks/useGetMe";

interface LeftNavProps {
  width?: string;
}

function LeftNav({ width = "250px" }: LeftNavProps) {
  const { data: user, isLoading } = useGetMe();

  return (
    <Box
      w={width}
      h="100vh"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      p={4}
      position="relative"
      zIndex={10}
      divideX="1px solid"
    >
      <VStack gap={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          WorkMate
        </Text>

        <Button
          variant="ghost"
          justifyContent="flex-start"
          _hover={{ bg: "gray.100" }}
        >
          <FiHome style={{ marginRight: "8px" }} />홈
        </Button>

        <Button
          variant="ghost"
          justifyContent="flex-start"
          _hover={{ bg: "gray.100" }}
        >
          <FiSearch style={{ marginRight: "8px" }} />
          검색
        </Button>

        <Button
          variant="ghost"
          justifyContent="flex-start"
          _hover={{ bg: "gray.100" }}
        >
          <FiBookmark style={{ marginRight: "8px" }} />
          즐겨찾기
        </Button>

        <Button
          variant="ghost"
          justifyContent="flex-start"
          _hover={{ bg: "gray.100" }}
        >
          <FiSettings style={{ marginRight: "8px" }} />
          설정
        </Button>

        {!isLoading && user && (
          <>
            <Box height="1px" bg="gray.200" my={4} />
            <HStack
              gap={3}
              p={2}
              borderRadius="md"
              _hover={{ bg: "gray.50" }}
              cursor="pointer"
            >
              <Avatar.Root>
                <Avatar.Fallback name={user.data?.user?.name} />
                <Avatar.Image src={user.data?.user?.profileImage} />
              </Avatar.Root>
              <Text fontSize="sm" fontWeight="medium" truncate>
                {user.data?.user?.name}
              </Text>
            </HStack>
          </>
        )}

        {!isLoading && !user && (
          <>
            <Box height="1px" bg="gray.200" my={4} />
            <Text fontSize="sm" color="gray.600" mb={2}>
              로그인이 필요합니다
            </Text>
            <GoogleLoginButton size="sm" />
            <GitHubLoginButton size="sm" />
          </>
        )}
      </VStack>
    </Box>
  );
}

export default LeftNav;
