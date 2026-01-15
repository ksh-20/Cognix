import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import { connectDB } from './config/db.js';

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from './routes/chatRoutes.js';

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Endpoint");
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});