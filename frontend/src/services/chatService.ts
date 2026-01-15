const BASE_URL = "http://localhost:5001/api/chats";

const getAuthHeaders = (): Record<string, string> => {
  const user = localStorage.getItem("user");

  if (!user) {
    return {
      "Content-Type": "application/json",
    };
  }

  const token: string = JSON.parse(user).token;

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const fetchChats = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch chats");
  }

  return res.json();
};

export const fetchChatById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch chat");
  }

  return res.json();
};

export const sendMessage = async (
  message: string,
  conversationId?: string
) => {
  const res = await fetch(`${BASE_URL}/message`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ message, conversationId }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
};

export const renameChat = async (id: string, title: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Failed to rename chat");
  }

  return res.json();
};

export const deleteChat = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete chat");
  }
};