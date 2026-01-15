import Conversation from "../models/Conversation.js";

import { getAIResponse } from '../services/aiService.js';

export const getChats = async(req, res) => {
    try {
        const chats = await Chat.find().sort({createdAt: -1});
        res.status(200).json(chats);
    } catch (error) {
        console.error("Error in getChats Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const getChatById = async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);

        if(!chat)
            return res.status(400).json({message: "Chat Not Found"});

        res.status(200).json(chat);
    } catch (error) {
        console.error("Error in getChatById Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const createChat = async(req, res) => {
    try {
        const {title, content} = req.body;
        const chat = new Chat({title: title, content:content});

        const saved = await chat.save();

        res.status(201).json(saved);
    } catch (error) {
        console.error("Error in createChat Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateChat = async(req, res) => {
    try {
        const {title} = req.body;
        
        const updated = await Chat.findByIdAndUpdate(req.params.id, {title}, {new: true});

        if(!updated)
            return res.status(404).json({message: "Chat Not Found"})

        res.status(200).json(updated);
    } catch (error) {
        console.error("Error in updateChat Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const deleteChat = async(req, res) => {
    try {
        const deleted = await Chat.findByIdAndDelete(req.params.id);

        if(!deleted)
            return res.status(404).json({message: "Chat Not Found"});

        res.status(200).json(deleted);
    } catch (error) {
        console.error("Error in deleteChat Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};


// For AI Chats

export const sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

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
    // const aiReply = "Test reply from AI";

    conversation.messages.push({
      role: "assistant",
      content: aiReply,
    });

    await conversation.save();

    return res.status(200).json({
      conversationId: conversation._id,
      reply: aiReply,
    });
  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({ user: req.user._id });

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        res.status(200).json(conversation);
    } catch (error) {
        console.error("Error in getConversation controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};