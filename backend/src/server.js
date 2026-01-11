import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db.js';

import chatRoutes from './routes/chatRoutes.js';

const app = express();
const PORT = process.env.PORT;

connectDB();

app.get("/", (req, res) => {
    res.send("API Endpoint");
});

app.use("/api/chats", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});