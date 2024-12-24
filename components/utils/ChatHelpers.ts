import { ChatDTO } from "@/model/Chat";

export function GetParticipantThatIsNotSelf(chat: ChatDTO, accountId: string) {
  return chat.participants?.find(
    (participant) => participant._id !== accountId
  );
}

export function GetLatestMessage(chat: ChatDTO, accountId: string) {
  if (!chat.messages || chat.messages.length === 0) {
    return null;
  }

  return chat.messages[chat.messages.length - 1];
}

export function ChatIsUnread(chat: ChatDTO, accountId: string): boolean {
  if (!chat || !chat.messages || chat.messages.length === 0) {
    return false; // No messages, no unread status
  }

  // Get the latest message in the chat
  const latestMessage = chat.messages[chat.messages.length - 1];

  // Check if the user has a `readBy` timestamp and if it is before the latest message's timestamp
  const lastReadTimestamp = chat.readBy?.get(accountId);

  // If there's no `lastReadTimestamp` or it's before the latest message, it's unread
  return !lastReadTimestamp || new Date(lastReadTimestamp) < latestMessage.createdAt;
}