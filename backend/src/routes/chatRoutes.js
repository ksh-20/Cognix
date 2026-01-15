import express from 'express';

import { getChats } from '../controllers/chatController.js';
import { getChatById } from '../controllers/chatController.js';
import { createChat } from '../controllers/chatController.js';
import { updateChat } from '../controllers/chatController.js';
import { deleteChat } from '../controllers/chatController.js';

import { sendMessage } from '../controllers/chatController.js';
import { getConversation } from '../controllers/chatController.js';

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getChats);
router.get("/:id", protect, getChatById);
router.post("/", protect, createChat);
router.put("/:id", protect, updateChat);
router.delete("/:id", protect, deleteChat);

router.post("/message", protect, sendMessage);
router.get("/:conversationId", protect, getConversation);

export default router;