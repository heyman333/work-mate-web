import {
  Dialog,
  VStack,
  Text,
  Portal,
  CloseButton,
  Separator,
  HStack,
} from "@chakra-ui/react";
import { MdLogin } from "react-icons/md";
import GoogleLoginButton from "../Auth/GoogleLoginButton";
import GitHubLoginButton from "../Auth/GitHubLoginButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={({ open }) => !open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="md">
            <Dialog.Header>
              <HStack gap={2}>
                <MdLogin />
                <Dialog.Title>로그인이 필요합니다</Dialog.Title>
              </HStack>
              <Dialog.CloseTrigger>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body pb={6}>
              <VStack gap={6}>
                <Text fontSize="md" color="gray.700" textAlign="center">
                  Work Mate를 이용하시려면 로그인해주세요.
                  <br />
                  소셜 계정으로 간편하게 시작할 수 있습니다.
                </Text>

                <Separator />

                <VStack gap={3} w="full">
                  <GoogleLoginButton width="full" size="lg" />
                  <GitHubLoginButton width="full" size="lg" />
                </VStack>

                <Text fontSize="sm" color="gray.500" textAlign="center">
                  로그인하면 서비스 이용약관 및 개인정보처리방침에 동의하게
                  됩니다.
                </Text>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
