import express from 'express';

import { getChats } from '../controllers/chatController';
import { getChatById } from '../controllers/chatController';
import { createChat } from '../controllers/chatController';
import { updateChat } from '../controllers/chatController';
import { deleteChat } from '../controllers/chatController';

import { sendMessage } from '../controllers/chatController';
import { getConversation } from '../controllers/chatController';

const router = express.Router();

router.get("/", getChats);
router.get("/:id", getChatById);
router.post("/", createChat);
router.put("/:id", updateChat);
router.delete("/:id", deleteChat);

router.post("/message", sendMessage);
router.get("/:conversationId", getConversation);

export default router;