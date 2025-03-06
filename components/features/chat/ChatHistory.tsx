import { UIMessage } from "ai";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";

interface ChatHistoryProps {
  chatHistory: UIMessage[];
}

export default function ChatHistory({ chatHistory }: ChatHistoryProps) {
  const endOfChatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="flex w-full max-w-[50rem] scrollbar-hide overflow-y-scroll justify-center items-start text-white">
      <div className="flex flex-col items-start justify-start overflow-y-scroll h-full w-full">
        {chatHistory.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={endOfChatRef} />
      </div>
    </div>
  )
}
