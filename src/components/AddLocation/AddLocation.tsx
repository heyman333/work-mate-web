import { useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Dialog,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

interface AddLocationProps {
  onAddLocation: (keyword: string) => void;
}

export function AddLocation({ onAddLocation }: AddLocationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onAddLocation(keyword.trim());
      setKeyword("");
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setKeyword("");
    setIsOpen(false);
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
              <form onSubmit={handleSubmit}>
                <Stack gap={4}>
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="키워드를 입력하세요"
                    autoFocus
                  />
                  <HStack justify="flex-end" gap={2}>
                    <Dialog.CloseTrigger asChild>
                      <Button variant="outline" onClick={handleCancel}>
                        취소
                      </Button>
                    </Dialog.CloseTrigger>
                    <Button type="submit" colorScheme="blue">
                      추가
                    </Button>
                  </HStack>
                </Stack>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
}