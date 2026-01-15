interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

const Message = ({ role, content }: MessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] leading-relaxed shadow-sm
          ${
            isUser
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-gray-100 text-gray-900 rounded-bl-sm"
          }
        `}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;