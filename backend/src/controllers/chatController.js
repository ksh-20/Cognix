import Chat from "../models/Chat";

export const getChats = async(req, res) => {
    try {
        
    } catch (error) {
        console.error("Error in getChats Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const getChatById = async(req, res) => {
    try {
        
    } catch (error) {
        console.error("Error in getChatById Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const createChat = async(req, res) => {
    try {
        
    } catch (error) {
        console.error("Error in createChat Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateChat = async(req, res) => {
    try {
        
    } catch (error) {
        console.error("Error in updateChat Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const deleteChat = async(req, res) => {
    try {
        
    } catch (error) {
        console.error("Error in deleteChat Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};