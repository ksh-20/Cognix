const BASE_URL = "http://localhost:5001/api/chats";

const getAuthHeaders = () => {
  const user = localStorage.getItem("user");

  if (!user) return {};

  const token = JSON.parse(user).token;

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
    throw new Error("Unauthorized");
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
    throw new Error("Unauthorized");
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
    throw new Error("Unauthorized");
  }

  return res.json();
};

export const deleteChat = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }
};