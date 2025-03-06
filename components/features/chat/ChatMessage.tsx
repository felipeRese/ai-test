import { UIMessage } from "ai";
import AvatarWithName from "../AvatarWithName";
import ProfileCard from "@/profile-card";
import TriviaQuiz from "@/trivia-quiz";
import WeatherCard from "../weather-card";

interface ChatMessageProps {
  message: UIMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div key={message.id} className="flex flex-col items-start justify-center gap-2 p-3">
      <AvatarWithName role={message.role} />
      <p>{message.content}</p>
      <div>
        {message.toolInvocations?.map((toolInvocation) => {
          const { toolName, toolCallId, state } = toolInvocation;
          if (state === "result") {
            if (toolName == "displayProfileInformation") {
              const { result } = toolInvocation;
              return (
                <div key={toolCallId}>
                  <ProfileCard {...result} />
                </div>
              );
            }
            if (toolName == "displayTriviaQuestion") {
              const { result } = toolInvocation;
              return (
                <div key={toolCallId}>
                  <TriviaQuiz {...result} />
                </div>
              );
            }
            if (toolName == "displayWeather") {
              const { result } = toolInvocation;
              return (
                <div key={toolCallId}>
                  <WeatherCard {...result} />
                </div>
              );
            }
          } else {
            return (
              <div key={toolCallId}>
                <div>Loading...</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
