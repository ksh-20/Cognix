import { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { sendMessage } from "../services/chatService";
import { useEffect, useRef } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input, conversationId);

      setConversationId(res.conversationId);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
    <header className="p-4 border-b bg-white text-center font-semibold">
      Cognix
    </header>

    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg, idx) => (
        <Message key={idx} role={msg.role} content={msg.content} />
      ))}

      {loading && (
        <div className="text-sm text-gray-500 italic">
          AI is typing...
        </div>
      )}

      <div ref={bottomRef} />
    </div>

    <div className="p-4 border-t bg-white">
      <InputBox
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={loading}
      />
    </div>
  </div>
  );
};

export default ChatWindow;