'use server'
import ChatModel from "@/models/chat-model1";

export const createNewChat = async (payload:any) => {
    try {
        const response = await ChatModel.create(payload);

        return {
            success: true,
            message: "Chat saved successfully",
            data: JSON.parse(JSON.stringify(response))
        };
    } catch (error: any) {
        console.error("Error saving chat:", error);
        return {
            success: false,
            message: "Failed to save chat",
            error: error instanceof Error ? error.message : String(error)
        };
    }
};

//Added just for troubleshooting the Cababge chat not brining the second line 
export const getChatByChatId = async (chatId: string) => {

    try {
        //console.log("getChatByChatId chatid=", chatId);
        const response = await ChatModel.findById(chatId);
        
        //console.log(JSON.stringify(response?.messages, null, 2));
        return {            
            success: true,
            message: "Chat retrieved successfully",
            data: JSON.parse(JSON.stringify(response))
        };
    } catch (error: any) {
        console.error("Error retrieving chat:", error);
        return {            
            success: false,
            message: "Failed to retrieve chat",
            error: error instanceof Error ? error.message : String(error)
        };
    }
};
export const getChatsByUserId = async (userId: string) => {
    try {
        const response = await ChatModel.find({ user: userId }).sort({ createdAt: -1 });
        console.log("What is coming from database:", JSON.stringify(response, null, 2));
        
        response.forEach(chat => {
        console.log("CHAT ID:", chat._id.toString());
        console.log("TITLE:", chat.title);
        console.log("MESSAGES:", chat.messages.length);
        });
        return {
            success: true,
            message: "Chats retrieved successfully",
            data: JSON.parse(JSON.stringify(response))
        };
    } catch (error: any) {
        console.error("Error retrieving chats:", error);
        return {
            success: false,
            message: "Failed to retrieve chats",
            error: error instanceof Error ? error.message : String(error)
        };
    }
};

export const updateChat = async ({chatId = "", messages =[]}: {chatId?: string, messages?: any[]}) => {
    try {
         console.log("Messages passed in", messages.length);
        const responseBefore = await ChatModel.findById(chatId);
        console.log("Before save", responseBefore.messages.length);
        const response = await ChatModel.findByIdAndUpdate(chatId, { messages  }, { new: true });
        console.log("After save", response.messages.length);
        //console.log("AFTER DBUPDATE CAll! Updated Chat:", JSON.stringify(response, null, 2));
        return {
            success: true,
            message: "Chat updated successfully",
            data: JSON.parse(JSON.stringify(response))
        };
    } catch (error: any) {
        console.error("Error updating chat:", error);
        return {
            success: false,
            message: "Failed to update chat",
            error: error instanceof Error ? error.message : String(error)
        };
    }
};

export const deleteChat = async (chatId: string) => {
    try {
        const response = await ChatModel.findByIdAndDelete(chatId);
        return {
            success: true,  
            message: "Chat deleted successfully",
            data: JSON.parse(JSON.stringify(response))
        };
    } catch (error: any) {
        console.error("Error deleting chat:", error);
        return {
            success: false,
            message: "Failed to delete chat",
            error: error instanceof Error ? error.message : String(error)
        };

    };   
};

