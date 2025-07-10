import { useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Dialog,
  HStack,
  VStack,
  Box,
  Text,
  Textarea,
  CloseButton,
} from "@chakra-ui/react";
import { FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";
import { type PlaceSearchResult } from "@/hooks/usePlaceSearch";
import {
  Api,
  type WorkPlaceCreateRequest,
  type WorkplaceCreateData,
  type WorkplaceUpdatePayload,
} from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";

import { toaster } from "../ui/toaster";
import type { AxiosError } from "axios";

export function AddLocation() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceSearchResult | null>(
    null
  );
  const [activity, setActivity] = useState("");

  const { results, loading, error, searchPlaces } = usePlaceSearch();
  const { data: workplacesData } = useQuery({
    queryKey: ["workplaceList"],
    queryFn: () => new Api().workplace.workplaceList(),
  });
  const { mutate: updateLocation } = useMutation({
    mutationFn: (data: { id: string; payload: WorkplaceUpdatePayload }) => {
      return new Api().workplace.workplaceUpdate(data.id, data.payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workplaces"] });
      toaster.create({
        type: "success",
        title: "Success",
        description: "장소가 수정되었습니다.",
      });
    },
  });
  const { mutate: addLocation } = useMutation({
    mutationFn: (data: WorkPlaceCreateRequest) => {
      return api.post<WorkplaceCreateData>("/workplace", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workplaces"] });
      toaster.create({
        type: "success",
        title: "Success",
        description: "장소가 추가되었습니다.",
      });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toaster.create({
        type: "error",
        title: "Error",
        description: error.response?.data.error || "Unknown error",
      });
    },
  });

  const handleSubmit = () => {
    const isDuplicated = workplacesData?.data?.workPlaces?.some(
      (workplace) => workplace.name === selectedPlace?.place_name
    );

    if (isDuplicated) {
      updateLocation({
        id:
          workplacesData?.data?.workPlaces?.find(
            (workplace) => workplace.name === selectedPlace?.place_name
          )?.id || "",
        payload: {
          name: selectedPlace?.place_name,
          latitude: Number(selectedPlace?.y),
          longitude: Number(selectedPlace?.x),
          description: activity,
        },
      });
      setIsOpen(false);

      return;
    }
    if (selectedPlace && activity.trim()) {
      setKeyword("");
      setSelectedPlace(null);
      setActivity("");
      setIsOpen(false);
      addLocation({
        name: selectedPlace.place_name,
        latitude: Number(selectedPlace.y),
        longitude: Number(selectedPlace.x),
        description: activity,
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      searchPlaces(keyword.trim());
    }
  };

  return (
    <>
      <IconButton
        aria-label="장소 추가"
        onClick={() => setIsOpen(true)}
        position="fixed"
        bottom="20"
        right="6"
        size="lg"
        colorScheme="blue"
        borderRadius="full"
        shadow="lg"
        zIndex={10}
        width="46px"
        height="46px"
      >
        <FaPlus />
      </IconButton>

      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>장소 추가</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSearch}>
                <VStack align="stretch">
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>
                    장소 검색
                  </Text>
                  <HStack>
                    <Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="장소를 검색하세요"
                      autoFocus
                    />
                    <Button type="submit" loading={loading}>
                      검색
                    </Button>
                  </HStack>

                  {error && (
                    <Text color="red.500" fontSize="sm">
                      {error}
                    </Text>
                  )}

                  {results.length > 0 && (
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2}>
                        검색 결과
                      </Text>
                      <Box maxH="200px" overflowY="auto">
                        <VStack gap={2} align="stretch">
                          {results.map((place) => (
                            <Box
                              key={place.id}
                              p={3}
                              border="1px solid"
                              borderColor={
                                selectedPlace?.id === place.id
                                  ? "blue.500"
                                  : "gray.200"
                              }
                              borderRadius="md"
                              cursor="pointer"
                              onClick={() => setSelectedPlace(place)}
                              _hover={{ bg: "gray.50" }}
                              bg={
                                selectedPlace?.id === place.id
                                  ? "blue.50"
                                  : "white"
                              }
                            >
                              <HStack gap={2}>
                                <FaMapMarkerAlt
                                  color={
                                    selectedPlace?.id === place.id
                                      ? "blue"
                                      : "gray"
                                  }
                                />
                                <VStack align="start" gap={1} flex={1}>
                                  <Text fontWeight="medium" fontSize="sm">
                                    {place.place_name}
                                  </Text>
                                  <Text fontSize="xs" color="gray.600">
                                    {place.road_address_name ||
                                      place.address_name}
                                  </Text>
                                </VStack>
                              </HStack>
                            </Box>
                          ))}
                        </VStack>
                      </Box>
                    </Box>
                  )}

                  {selectedPlace && (
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2}>
                        선택된 장소
                      </Text>
                      <Box
                        p={3}
                        bg="blue.50"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="blue.200"
                      >
                        <Text fontWeight="medium" fontSize="sm">
                          {selectedPlace.place_name}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {selectedPlace.road_address_name ||
                            selectedPlace.address_name}
                        </Text>
                      </Box>
                    </Box>
                  )}

                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>
                      무슨 일을 하고 있나요?
                    </Text>
                    <Textarea
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      placeholder="예: 회의, 점심식사, 카페에서 작업 등"
                      rows={3}
                      resize="vertical"
                    />
                  </Box>

                  <HStack justify="flex-end" gap={2}>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton />
                    </Dialog.CloseTrigger>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      disabled={!selectedPlace || !activity.trim()}
                      onClick={handleSubmit}
                    >
                      추가
                    </Button>
                  </HStack>
                </VStack>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
}
