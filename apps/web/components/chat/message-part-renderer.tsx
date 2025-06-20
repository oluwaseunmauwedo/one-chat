import type { Model } from "@/lib/ai";
import type { MessageWithMetadata } from "@/types";
import type { UseChatHelpers } from "@ai-sdk/react";
import type { SourceUIPart } from "@ai-sdk/ui-utils";
import { memo } from "react";
import type { Dispatch, SetStateAction } from "react";
import { MessageReasoning } from "./message-reasoning";
import { MessageTextPart } from "./message-text-part";
import { MessageToolInvocation } from "./message-tool-invocation";

interface MessagePartRendererProps {
  message: MessageWithMetadata;
  model: Model;
  sources: SourceUIPart["source"][];
  displayMode: "view" | "edit";
  isReadonly: boolean;
  isLoading: boolean;
  onModeChange: Dispatch<SetStateAction<"view" | "edit">>;
  onReload: (model?: Model) => void;
  onBranchOut: (model?: Model) => void;
  onCopy: (text: string) => void;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
  isReloading: boolean;
  isBranching: boolean;
  threadId: string;
}

export const MessagePartRenderer = memo<MessagePartRendererProps>((props) => {
  const { message, isLoading, model } = props;

  if (!message.parts?.length) return null;

  return (
    <>
      {message.parts.map((messagePart, partIndex) => {
        const partKey = `message-${message.id}-part-${partIndex}`;

        if (messagePart.type === "reasoning") {
          return (
            <MessageReasoning
              key={partKey}
              isLoading={isLoading}
              reasoning={messagePart.reasoning}
            />
          );
        }

        if (messagePart.type === "source") {
          // Sources are handled by MessageTextPart, skip individual source parts
          return null;
        }

        if (messagePart.type === "tool-invocation") {
          return (
            <MessageToolInvocation
              key={partKey}
              toolInvocation={messagePart.toolInvocation}
            />
          );
        }
        if (messagePart.type === "text") {
          return (
            <MessageTextPart
              key={partKey}
              {...props}
              text={messagePart.text}
              model={model}
            />
          );
        }

        return null;
      })}
    </>
  );
});

MessagePartRenderer.displayName = "MessagePartRenderer";
