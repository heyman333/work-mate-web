import { Api } from "@/api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiMapPin, FiTrash2 } from "react-icons/fi";
import { format } from "date-fns";
import { StaticMap } from "react-kakao-maps-sdk";

function MyLog() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["workplaceList"],
    queryFn: () => {
      return new Api().workplace.workplaceList();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return new Api().workplace.workplaceDelete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workplaceList"] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        내 작업 장소
      </Heading>

      {data?.data.workPlaces?.length ? (
        <VStack gap={4} align="stretch">
          {data.data.workPlaces.map((workplace) => (
            <Box
              key={workplace.id}
              borderWidth={1}
              borderRadius="lg"
              p={4}
              bg="white"
              shadow="sm"
            >
              <HStack justify="space-between" align="start">
                <VStack align="start" flex={1} gap={2}>
                  <Heading size="md" color="gray.800">
                    {workplace.name}
                  </Heading>

                  {workplace.description && (
                    <VStack align="start">
                      {workplace.description.map((description) => (
                        <HStack key={description.date}>
                          <Text color="gray.600" fontSize="sm">
                            {format(description.date, "yyyy년 MM월 dd일")} -
                          </Text>
                          <Text color="gray.600" fontSize="sm">
                            {description.content}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  )}

                  {workplace.latitude && workplace.longitude && (
                    <VStack gap={2} align="start">
                      <HStack>
                        <Icon as={FiMapPin} color="gray.500" />
                        <Text fontSize="xs" color="gray.500">
                          위치
                        </Text>
                      </HStack>
                      <StaticMap
                        center={{
                          lat: workplace.latitude,
                          lng: workplace.longitude,
                        }}
                        style={{ width: "300px", height: "300px" }}
                        marker={{
                          position: {
                            lat: workplace.latitude,
                            lng: workplace.longitude,
                          },
                        }}
                      />
                    </VStack>
                  )}
                </VStack>

                <Button
                  onClick={() => workplace.id && handleDelete(workplace.id)}
                  disabled={deleteMutation.isPending}
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                >
                  <Icon as={FiTrash2} mr={2} />
                  {deleteMutation.isPending ? "삭제중..." : "삭제"}
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      ) : (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" fontSize="lg">
            {isLoading ? "로딩중..." : "등록된 작업 장소가 없습니다."}
          </Text>
        </Box>
      )}
    </Box>
  );
}
export default MyLog;
