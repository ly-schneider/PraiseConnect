import CalcBirthdate from "./utils/CalcBirthdate";
import CalcCreationDate from "./utils/CalcCreationDate";
import {
  GetLatestMessage,
  GetParticipantThatIsNotSelf,
} from "./utils/ChatHelpers";
import { RenderMarkdownForPreview } from "./utils/RenderMarkdown";
import { ChatDTO } from "@/model/Chat";

export default function Chat({
  chat,
  accountId,
}: {
  chat: ChatDTO;
  accountId: string;
}) {
  return (
    <div className="border-2 border-text px-4 py-3 rounded-[20px] mt-4">
      <div className="flex items-center justify-between">
        <p className="text font-bold text-base">
          {GetParticipantThatIsNotSelf(chat, accountId)?.name},{" "}
          {CalcBirthdate(
            GetParticipantThatIsNotSelf(chat, accountId)?.birthdate
          )}
        </p>
        <p className="text text-muted">
          {CalcCreationDate(GetLatestMessage(chat)?.createdAt)}
        </p>
      </div>
      <RenderMarkdownForPreview
        content={GetLatestMessage(chat)?.content}
      />
    </div>
  );
}
