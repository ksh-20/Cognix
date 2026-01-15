import { useEffect, useMemo, useRef, useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import TypingIndicator from "./TypingIndicator";
import {
  sendMessage,
  fetchChats,
  renameChat,
  deleteChat,
  fetchChatById
} from "../services/chatService";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import UserMenu from "./UserMenu";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  time: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
}

interface BackendChat {
  _id: string;
  title?: string;
  messages?: ChatMessage[];
}

const ChatWindow = () => {
  /* AUTH */
  const { user } = useAuth();

  /* STATE */
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* LOAD CHATS */
  useEffect(() => {
    if (!user) return;

    const loadChats = async () => {
      try {
        const data = await fetchChats();

        const mapped = (data as BackendChat[]).map((c) => ({
          id: c._id,
          title: c.title || "Untitled Chat",
          messages: c.messages || [],
        }));

        setConversations(mapped);

        if (mapped.length > 0) {
          setActiveConversationId(mapped[0].id);
          setConversationId(mapped[0].id);
        }
      } catch {
        console.warn("Failed to load chats from backend");
      }
    };

    loadChats();
  }, [user]);


  /* LOAD MESSAGES WHEN CHAT IS SELECTED */
  useEffect(() => {
    if (!activeConversationId) return;

    const loadMessages = async () => {
      try {
        const chat = await fetchChatById(activeConversationId);

        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConversationId
              ? { ...c, messages: chat.messages }
              : c
          )
        );
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    };

    loadMessages();
  }, [activeConversationId]);


  /* LOCAL STORAGE CACHE */
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    const cached = localStorage.getItem("chats");
    if (cached) {
      setConversations(JSON.parse(cached));
    }
  }, []);

  /* ACTIVE CONVERSATION */
  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const messages = useMemo(() => {
    return activeConversation?.messages ?? [];
  }, [activeConversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const getTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  /* SEND MESSAGE */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      time: getTime(),
    };

    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input, conversationId);

      const aiMessage: ChatMessage = {
        role: "assistant",
        content: res.reply,
        time: getTime(),
      };

      setConversationId(res.conversationId);
      setActiveConversationId(res.conversationId);

      setConversations((prev) => {
        const existing = prev.find((c) => c.id === res.conversationId);

        if (existing) {
          return prev.map((c) =>
            c.id === res.conversationId
              ? { ...c, messages: [...c.messages, userMessage, aiMessage] }
              : c
          );
        }

        return [
          ...prev,
          {
            id: res.conversationId,
            title: "Untitled Chat",
            messages: [userMessage, aiMessage],
          },
        ];
      });
    } catch {
      console.error("Message send failed");
    } finally {
      setLoading(false);
    }
  };

  /* NEW CHAT */
  const startNewChat = () => {
    setActiveConversationId(null);
    setConversationId(undefined);
    setInput("");
  };

  /* DELETE CHAT */
  const handleDelete = async (id: string) => {
    await deleteChat(id);

    setConversations((prev) => prev.filter((c) => c.id !== id));

    if (activeConversationId === id) {
      setActiveConversationId(null);
      setConversationId(undefined);
    }
  };

  /* AUTH GUARD */
  if (!user) {
    return <Login />;
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        {/* SIDEBAR */}
        <div className="w-64 border-r dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Chats</h2>
            <button
              onClick={() => setDark(!dark)}
              className="text-xs border rounded px-2 py-1"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>

          <button
            onClick={startNewChat}
            className="w-full mb-4 bg-blue-600 text-white rounded px-3 py-2 text-sm"
          >
            + New Chat
          </button>

          <div className="space-y-2">
            {conversations.map((c) => (
              <div
                key={c.id}
                className={`p-2 rounded text-sm cursor-pointer flex justify-between items-center
                  ${
                    c.id === activeConversationId
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                {editingId === c.id ? (
                  <input
                    className="w-full text-sm px-1 rounded text-black"
                    defaultValue={c.title}
                    autoFocus
                    onBlur={async (e) => {
                      const updated = await renameChat(c.id, e.target.value);
                      setEditingId(null);

                      setConversations((prev) =>
                        prev.map((chat) =>
                          chat.id === c.id
                            ? { ...chat, title: updated.title }
                            : chat
                        )
                      );
                    }}
                  />
                ) : (
                  <div
                    className="flex-1 truncate"
                    onClick={() => {
                      setActiveConversationId(c.id);
                      setConversationId(c.id);
                    }}
                    onDoubleClick={() => setEditingId(c.id)}
                  >
                    {c.title}
                  </div>
                )}

                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-400 ml-2 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex flex-col flex-1">
          <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <span className="font-semibold">Cognix</span>
            <UserMenu />
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <Message key={i} role={m.role} content={m.content} time={m.time} />
            ))}

            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          <div className="p-4 border-t dark:border-gray-700">
            <InputBox
              value={input}
              onChange={setInput}
              onSend={handleSend}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;