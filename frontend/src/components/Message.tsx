interface MessageProps {
  role: "user" | "assistant";
  content: string;
  time: string;
}

const Message = ({ role, content, time }: MessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm
          ${
            isUser
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white rounded-bl-sm"
          }
        `}
      >
        <div>{content}</div>
        <div className="text-[10px] mt-1 opacity-70 text-right">
          {time}
        </div>
      </div>
    </div>
  );
};

export default Message;