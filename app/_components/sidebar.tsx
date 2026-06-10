import { getChatsByUserId,getChatByChatId, deleteChat } from '@/actions/chats';
import chatsGlobalStore from '@/store/chats-store';
import { Plus, Trash2 } from 'lucide-react'
import React, {useEffect, useState} from 'react'

function Sidebar({
  setShowSidebar = () => {}
}: {
  setShowSidebar: (show: boolean) => void;
}) {
  const [loading = false, setLoading] = useState<boolean>(false);
  const {userChats, setUserChats, selectedChat, setSelectedChat} = chatsGlobalStore();
  const [hoveredChatId, setHoveredChatId] = useState<string>("");
  const [selectedChatForDelete, setSelectedChatForDelete] = useState<any>("");
  const getChats = async () => {
    try{
      setLoading(true);
      const response = await getChatsByUserId("6a12cca5de57e2e05f3e1a94");
      //const responseChat = await getChatByChatId("6a2144134be999ca97428455"); //Just for troubleshooting Cabbage chat array
      //console.log("ChatsCabbage:", responseChat.data);
      if (response.success) {
        setUserChats(response.data);
        //console.log("UserChats:", response.data);
      }else {
        console.error("Failed to fetch chats:", response.message);
      }
    }
    catch (error) {      
      console.error("Error fetching chats:", error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    console.log("Selected chat changed in sidebar:", selectedChat);
  }, [selectedChat]);

  const deleteChatHandler = async (chatId : string) => {
    try {
      const response = await deleteChat(chatId);
      setSelectedChatForDelete(chatId);
      if (response.success) {
          const updatedChats = userChats.filter((chat: any) => chat._id !== chatId);
          setUserChats(updatedChats);
        }
    } catch (error) {
      console.error("Error deleting chat:", error);
      setSelectedChatForDelete(null);
    }
  };

  return (
    <div className='w-80 sidebar-bg h-screen flex flex-col'>
      <div className='flex gap-2 border border-gray-200 border-solid text-gray-200 p-1 rounded-sm w-max
         items-center cursor-pointer'
         onClick={() => {
            console.log(`New chat clicked ${ (selectedChat as any)?.title}`);
              setSelectedChat(null);
              setShowSidebar(false);
            } }>
      <Plus /> New Chat
      </div>
      <div className='flex flex-col'>
        <h1 className='text-sm text-gray-300 font-bold mt-7 p-3'>Your recent chats...</h1>
        {
          userChats?.length === 0 && <div className='text-gray-400 text-sm p-3'>No chats yet. Start a new chat!</div> 
        }
        <div className='flex flex-col gap-3 p-3'>
          {userChats.map((chat: any) => (
            <div className={`cursor-pointer flex justify-between p-2 rounded w-full ${((selectedChat as any)?._id === chat._id ? "bg-yellow-700" : "")}`} 
             onClick={async () => {
                const response = await getChatByChatId(chat._id);

                if (response.success) {
                  setSelectedChat(response.data);
                }
              }}
            onMouseEnter={() => setHoveredChatId(chat._id)}
            onMouseLeave={() => setHoveredChatId("")} 
            key={chat._id}>
              <span className="text-sm text-gray-300">{chat.title}</span>
              {hoveredChatId === chat._id && <Trash2 size={15} className='text-red-500' onClick={() => deleteChatHandler(chat._id)} />}

              {setSelectedChatForDelete === chat._id && <span className='text-red-500 text-xs'>Deleting...</span>}
            </div>
          ))}
        </div>
      </div>
      
      <div className='mt-auto flex flex-col gap-1 text-gray-500 p-3' >
      <hr className='flex-1 border-gray-600 border-solid w-10' />
      <span>Designed and developed by</span>
      <span>Hema</span>
      </div>
    </div>  
  )
}

export default Sidebar