const API_URL = "http://localhost:5000/api/chats/message";

export interface ChatResponse {
  conversationId: string;
  reply: string;
}

export const sendMessage = async (
  message: string,
  conversationId?: string
): Promise<ChatResponse> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversationId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
};