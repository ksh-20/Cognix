import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResponse = async (messages) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        // Convert stored messages into Gemini format
        const formattedMessages = messages.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
        }));

        const result = await model.generateContent({
            contents: formattedMessages
        });

        const response = result.response.text();

        return response;
    } catch (error) {
        console.error("Error communicating with Gemini API", error);
        throw new Error("AI service failed");
    }
};