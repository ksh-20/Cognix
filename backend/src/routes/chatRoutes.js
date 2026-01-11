import express from 'express';

import { getChats } from '../controllers/chatController.js';
import { getChatById } from '../controllers/chatController.js';
import { createChat } from '../controllers/chatController.js';
import { updateChat } from '../controllers/chatController.js';
import { deleteChat } from '../controllers/chatController.js';

import { sendMessage } from '../controllers/chatController.js';
import { getConversation } from '../controllers/chatController.js';

const router = express.Router();

router.get("/", getChats);
router.get("/:id", getChatById);
router.post("/", createChat);
router.put("/:id", updateChat);
router.delete("/:id", deleteChat);

router.post("/message", sendMessage);
router.get("/:conversationId", getConversation);

export default router;