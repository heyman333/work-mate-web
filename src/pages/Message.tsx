import { useQuery } from "@tanstack/react-query";
import { Api, type Message } from "@/api/api";
import { Box, Tabs, VStack, Text, Card, HStack, Badge } from "@chakra-ui/react";
import { useState } from "react";

function Message() {
  const [activeTab, setActiveTab] = useState("received");

  const { data: receivedData } = useQuery({
    queryKey: ["messageReceivedList"],
    queryFn: () => {
      return new Api().message.receivedList();
    },
  });

  const { data: sentData } = useQuery({
    queryKey: ["messageSentList"],
    queryFn: () => {
      return new Api().message.sentList();
    },
  });

  // Sample data for demonstration - replace with actual API data
  const receivedMessages: Message[] = receivedData?.data || [
    {
      _id: "1",
      subject: "프로젝트 협업 제안",
      content: "안녕하세요! 같이 프로젝트를 진행해보면 어떨까요?",
      fromUserId: "user1",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      _id: "2",
      subject: "스터디 모집",
      content: "React 스터디원을 모집합니다. 관심있으시면 연락주세요.",
      fromUserId: "user2",
      createdAt: "2024-01-14T10:00:00Z",
    },
  ];

  const sentMessages: Message[] = sentData?.data || [
    {
      _id: "3",
      subject: "안녕하세요",
      content: "같이 근무하게 되어서 반갑습니다!",
      targetUserId: "user3",
      createdAt: "2024-01-13T10:00:00Z",
    },
  ];

  const MessageList = ({
    messages,
    type,
  }: {
    messages: Message[];
    type: "received" | "sent";
  }) => (
    <VStack gap={3} align="stretch">
      {messages.length === 0 ? (
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
