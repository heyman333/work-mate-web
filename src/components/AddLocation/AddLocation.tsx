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
} from "@chakra-ui/react";
import { FaPlus, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";
import type { PlaceSearchResult } from "@/hooks/usePlaceSearch";

interface AddLocationProps {
  onAddLocation: (place: PlaceSearchResult, activity: string) => void;
}

export function AddLocation({ onAddLocation }: AddLocationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceSearchResult | null>(
    null
  );
  const [activity, setActivity] = useState("");

  const { results, loading, error, searchPlaces } = usePlaceSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlace && activity.trim()) {
      onAddLocation(selectedPlace, activity.trim());
      setKeyword("");
      setSelectedPlace(null);
      setActivity("");
      setIsOpen(false);
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
        bottom="6"
        right="6"
        size="lg"
        colorScheme="blue"
        borderRadius="full"
        shadow="lg"
        zIndex={10}
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
                      <IconButton>
                        <FaTimes />
                      </IconButton>
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
