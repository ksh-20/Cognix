import Conversation from "../models/Conversation.js";
import { getAIResponse } from "../services/aiService.js";


export const getChats = async (req, res) => {
  try {
    const chats = await Conversation.find({ user: req.user._id })
      .select("_id title updatedAt")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error in getChats Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Conversation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error in getChatById Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateChat = async (req, res) => {
  try {
    const { title } = req.body;

    const updated = await Conversation.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in updateChat Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const deleted = await Conversation.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    console.error("Error in deleteChat Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    let conversation;

    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        user: req.user._id,
      });

      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
    } else {
      conversation = new Conversation({
        user: req.user._id,
        title: "Untitled Chat",
        messages: [],
      });
    }

    conversation.messages.push({
      role: "user",
      content: message,
    });

    const aiReply = await getAIResponse(conversation.messages);

    conversation.messages.push({
      role: "assistant",
      content: aiReply,
    });

    await conversation.save();

    res.status(200).json({
      conversationId: conversation._id,
      reply: aiReply,
    });
  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      user: req.user._id,
    }).sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error in getConversations Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};