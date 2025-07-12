import { useState } from "react";
import {
  Dialog,
  Button,
  Text,
  VStack,
  HStack,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { MdWarning } from "react-icons/md";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";

interface DeleteAccountModalProps {
  children: React.ReactNode;
}

export const DeleteAccountModal = ({ children }: DeleteAccountModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const handleDeleteAccount = () => {
    deleteAccount();
    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={({ open }) => setIsOpen(open)}
        size="md"
      >
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop onClick={handleClose} />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  <HStack gap={2}>
                    <MdWarning color="red" />
                    <Text>회원탈퇴</Text>
                  </HStack>
                </Dialog.Title>
                <Dialog.CloseTrigger onClick={handleClose}>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body pb={6}>
                <VStack gap={4} align="stretch">
                  <Text fontWeight="bold" color="red.500" fontSize="lg">
                    정말로 계정을 삭제하시겠습니까?
                  </Text>
                  <Text color="gray.700">
                    이 작업은 되돌릴 수 없습니다. 계정을 삭제하면:
                  </Text>
                  <VStack
                    gap={2}
                    align="start"
                    pl={4}
                    bg="red.50"
                    p={4}
                    rounded="md"
                  >
                    <Text fontSize="sm" color="red.700">
                      • 모든 프로필 정보가 영구적으로 삭제됩니다
                    </Text>
                    <Text fontSize="sm" color="red.700">
                      • 등록한 모든 작업 공간이 삭제됩니다
                    </Text>
                    <Text fontSize="sm" color="red.700">
                      • 계정 복구가 불가능합니다
                    </Text>
                  </VStack>
                  <Text fontWeight="medium" color="gray.800" textAlign="center">
                    계속하시려면 아래 "계정 삭제" 버튼을 클릭해주세요.
                  </Text>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <HStack gap={3} w="full" justify="end">
                  <Button variant="outline" onClick={handleClose}>
                    취소
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={handleDeleteAccount}
                    loading={isPending}
                  >
                    계정 삭제
                  </Button>
                </HStack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
