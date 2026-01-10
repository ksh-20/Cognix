import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db';

const app = express();
const PORT = process.env.PORT;

connectDB();

app.get("/", (req, res) => {
    res.send("API Endpoint");
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});