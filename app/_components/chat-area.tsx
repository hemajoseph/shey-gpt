import { Menu, Send } from 'lucide-react'
import React, { useEffect } from 'react' 
import Sidebar from './sidebar';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import Messages from './messages';
import chatsGlobalStore from '@/store/chats-store';
import { createNewChat, updateChat } from '@/actions/chats';

function ChatArea() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, setMessages } = useChat({
    initialMessages: [],
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const {selectedChat, setSelectedChat, userChats, setUserChats} = chatsGlobalStore();

  const addOrUpdateChat = async () => {
    try{
      if (!selectedChat) {
        const response = await createNewChat({
          user: "6a12cca5de57e2e05f3e1a94",
          messages: messages,
          title: messages[0]?.parts[0].text || "New Chat(default)"
        });
        if (response.success) {
          setSelectedChat(response.data);
          setUserChats([response.data,...userChats]);
        }
      }else
      {
        const response = await updateChat({
          chatId: selectedChat._id,
          messages: messages,
        })
      
      }
    } catch (error) {
      console.error("Error adding/updating chat:", error);
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      //console.log("Messages update: Len=", messages.length)
      addOrUpdateChat();
      //console.log(messages);
    }
  }, [messages]);

  useEffect(() => {
    if(selectedChat) {
      setMessages(selectedChat.messages);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  return (
    <div className='chatarea-bg h-full p-5 flex flex-col'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <Menu className='text-gray-400 flex lg:hidden'  onClick={() => setShowSidebar(true)} />
          <h1 className='text-xl font-bold text-yellow-700'> SHEY-GPT  </h1>
        </div>
      </div>
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
      <div className="flex flex-col justify-between flex-1"> 
           
        <Messages messages={messages} />

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
        className="relative flex items-center gap-2 border-gray-300"
      > 
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
          id="input"
          className="bg-sidebar border p-5 focus:outline-none focus:border-gray-500 w-full focus:border"
        />
        <button type="submit" disabled={status !== 'ready'} className="absolute right-2">
          <Send className='text-gray-400' />
        </button>
        
      </form>
      </div>
      </div>
  )
}

export default ChatArea