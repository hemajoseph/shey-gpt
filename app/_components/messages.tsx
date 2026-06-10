import { Bot, Check, Copy, Share } from 'lucide-react';
import React, { useEffect } from 'react'
import Markdown from 'react-markdown';
import ShareMessage from './share-message';

function Messages({ messages }: { messages: any[] }) {
    const [copiedMessage, setCopiedMessage] = React.useState<string>("");
    const messagesRef = React.useRef<any>(null);
    const [messageToShare, setMessageToShare] = React.useState<string>("");
    const [openShareModal, setOpenShareModal] = React.useState<boolean>(false);
    
    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    if (messages.length === 0 ) {
        return <div className='text-center text-gray-500 mt-10'>
            Heyy Hema!
        </div> 
    }
    
    const onCopy = (content: string) => {
        try {
            navigator.clipboard.writeText(content);
            setCopiedMessage(content);
        } catch (error) {
            console.error("Failed to copy text: ", error);
            alert("Failed to copy text.");
        }
    }

  return (
    <div className="flex flex-col gap-7 text-sm overflow-y-auto h-screen" ref={messagesRef}>
        {messages.map( (message) => {
            if (message.role === 'user') {
            return (
                <div key={message.id} className='flex justify-end'>
                        <span className='bg-gray-100 p-3 rounded'>{message.parts.map((part : any, index : any) =>
                                part.type === 'text' ? <span key={index}>{part.text}</span> : null,
                            )}</span>
                                            

                </div>
            );
        }
        const textToCopy = message.parts
                                    .filter((p: any) => p.type === "text")
                                    .map((p: any) => p.text)
                                    .join("\n");
        return <div key={message.id} className='flex gap-5'>
            <Bot size={16} />
            <div className="flex-1 flex flex-col gap-5">{message.parts.map((part : any, index : any) =>
                        part.type === 'text' ? <div  className="flex-1 flex flex-col gap-5" key={index}><Markdown>{part.text}</Markdown></div> : null,
                    )}
                    <div className='flex gap-5'>
                        
                        <button className='border border-gray-500 p-2 rounded cursor-pointer' 
                         onClick={() => copiedMessage !== textToCopy && onCopy(textToCopy)} >
                            {copiedMessage === textToCopy ? (<Check color="gray"/>) : (<Copy size={16} color="gray"/>) }
                            
                        </button> 
                        <button className='border border-gray-500 p-2 rounded cursor-pointer' 
                         onClick={() => {
                            setMessageToShare(textToCopy);
                            setOpenShareModal(true);
                         }} >
                            <Share size={16} color="gray" />
                        </button> 
                        
                    </div>
            </div>
        </div>;
        })     
        }
        {openShareModal && <ShareMessage open={openShareModal} setOpen={setOpenShareModal} messageToShare={messageToShare} />}
    </div>
  )
}
export default Messages;