import { useState } from "react";
import {
  Dialog,
  Portal,
  CloseButton,
  VStack,
  Text,
  Button,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { toaster } from "../../components/ui/toaster";
import {
  Api,
  type HttpResponse,
  type SendCreateData,
  type SendCreateError,
} from "@/api/api";
import { useMutation } from "@tanstack/react-query";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserName?: string;
  targetUserId: string;
}

export function MessageModal({
  isOpen,
  onClose,
  targetUserName,
  targetUserId,
}: MessageModalProps) {
  const [message, setMessage] = useState("");

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: (message: string) => {
      return new Api().message.sendCreate({
        targetUserId,
        subject: "협업요청",
        content: message,
      });
    },
    onSuccess: () => {
      toaster.create({
        title: "메시지 전송 완료",
        description: `${targetUserName || "사용자"}님께 메시지를 보냈습니다.`,
        type: "success",
      });
      onClose();
    },
    onError: (error: HttpResponse<SendCreateData, SendCreateError>) => {
      toaster.create({
        title: "메시지 전송 실패",
        description: error.error.error || "메시지 전송 중 오류가 발생했습니다.",
        type: "error",
      });
    },
  });

  const handleSend = async () => {
    if (!message.trim()) return;
    sendMessage(message);
  };

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="md">
            <Dialog.Header>
              <Dialog.Title>
                {targetUserName
                  ? `${targetUserName}님께 메시지 보내기`
                  : "메시지 보내기"}
              </Dialog.Title>
              <Dialog.CloseTrigger>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body pb={6}>
              <VStack gap={4} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  메시지를 입력하고 발송하세요.
                </Text>
                <Textarea
                  placeholder="메시지를 입력하세요..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  resize="vertical"
                  maxLength={500}
                />
                <Text fontSize="xs" color="gray.500" textAlign="right">
                  {message.length}/500
                </Text>
                <HStack justify="flex-end" gap={3}>
                  <Button variant="outline" onClick={handleClose}>
                    취소
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={handleSend}
                    loading={isPending}
                    disabled={!message.trim()}
                  >
                    <MdSend />
                    발송하기
                  </Button>
                </HStack>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
