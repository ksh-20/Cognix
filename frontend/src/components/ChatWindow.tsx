import { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { sendMessage } from "../services/chatService";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

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
    <div className="flex flex-col h-screen max-w-md mx-auto p-4">
      <div className="flex-1 space-y-2 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <Message key={idx} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="text-sm text-gray-500">Gemini is typing...</div>
        )}
      </div>

      <InputBox
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={loading}
      />
    </div>
  );
};

export default ChatWindow;