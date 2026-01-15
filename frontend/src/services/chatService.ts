const BASE_URL = "http://localhost:5001/api/chats";
const API_URL = "http://localhost:5001/api/chats/message";

export const fetchChats = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch chats");
  return res.json();
};

export const renameChat = async (id: string, title: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Rename failed");
  return res.json();
};

export const deleteChat = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete failed");
};

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