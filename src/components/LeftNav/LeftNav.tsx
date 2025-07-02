import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { FiHome, FiSearch, FiBookmark, FiSettings } from "react-icons/fi";

interface LeftNavProps {
  width?: string;
}

function LeftNav({ width = "250px" }: LeftNavProps) {
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
          <FiHome style={{ marginRight: "8px" }} />
          홈
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
      </VStack>
    </Box>
  );
}

export default LeftNav;