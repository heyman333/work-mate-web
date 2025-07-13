import { useQuery } from "@tanstack/react-query";
import { Api, type Message } from "@/api/api";
import { Box, Tabs, VStack, Text, Card, HStack, Badge } from "@chakra-ui/react";
import { useState } from "react";

function Message() {
  const [activeTab, setActiveTab] = useState("received");

  const { data: receivedData, isLoading: receivedLoading } = useQuery({
    queryKey: ["messageReceivedList"],
    queryFn: () => {
      return new Api().message.receivedList();
    },
  });

  const { data: sentData, isLoading: sentLoading } = useQuery({
    queryKey: ["messageSentList"],
    queryFn: () => {
      return new Api().message.sentList();
    },
  });

  const receivedMessages: Message[] = receivedData?.data || [];
  const sentMessages: Message[] = sentData?.data || [];

  const MessageList = ({
    messages,
    type,
  }: {
    messages: Message[];
    type: "received" | "sent";
  }) => (
    <VStack gap={3} align="stretch">
      {receivedLoading || sentLoading ? (
        <Text color="gray.500" textAlign="center" py={8}>
          로딩중...
        </Text>
      ) : messages.length === 0 ? (
        <Text color="gray.500" textAlign="center" py={8}>
          {type === "received"
            ? "받은 메시지가 없습니다"
            : "보낸 메시지가 없습니다"}
        </Text>
      ) : (
        messages.map((message) => (
          <Card.Root
            key={message._id}
            p={4}
            _hover={{ bg: "gray.50" }}
            cursor="pointer"
          >
            <HStack justify="space-between" align="start">
              <VStack align="start" gap={2} flex={1}>
                <HStack>
                  <Text fontWeight="semibold" fontSize="md">
                    {message.subject}
                  </Text>
                  {type === "received" && (
                    <Badge colorPalette="blue" size="sm">
                      받은메시지
                    </Badge>
                  )}
                  {type === "sent" && (
                    <Badge colorPalette="green" size="sm">
                      보낸메시지
                    </Badge>
                  )}
                </HStack>
                <Text
                  color="gray.600"
                  fontSize="sm"
                  css={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {message.content}
                </Text>
                <HStack gap={4} fontSize="xs" color="gray.500">
                  {message.createdAt && (
                    <Text>
                      {new Date(message.createdAt).toLocaleDateString()}
                    </Text>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Card.Root>
        ))
      )}
    </VStack>
  );

  return (
    <Box p={6} maxW="800px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        메시지 보관함
      </Text>

      <Tabs.Root
        value={activeTab}
        onValueChange={(details) => setActiveTab(details.value)}
      >
        <Tabs.List>
          <Tabs.Trigger value="received">
            받은메시지 ({receivedMessages.length})
          </Tabs.Trigger>
          <Tabs.Trigger value="sent">
            보낸메시지 ({sentMessages.length})
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="received" pt={4}>
          <MessageList messages={receivedMessages} type="received" />
        </Tabs.Content>

        <Tabs.Content value="sent" pt={4}>
          <MessageList messages={sentMessages} type="sent" />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

export default Message;
