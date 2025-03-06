"use client"
import ChatPanel from "@/components/features/chat/chat-panel";
import ChatHistory from "@/components/features/chat/ChatHistory";
import LayoutSidebar from "@/components/layout/layout-sidebar";
import { useChat } from '@ai-sdk/react';

export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    stop,
    append,
  } = useChat();

  return (
    <div className="flex w-full justify-center items-center text-white bg-background">
      <LayoutSidebar />
      <div className="flex flex-col items-center justify-between h-screen max-h-screen scrollbar-hide w-full p-4">
        <ChatHistory chatHistory={messages} />
        <ChatPanel
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          messages={messages}
          setMessages={setMessages}
          stop={stop}
          append={append}
        />
      </div>
    </div>
  );
}
