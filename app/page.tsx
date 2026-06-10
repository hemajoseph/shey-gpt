
'use client';

import { saveAndGetCurrentUser } from "@/actions/users";
import { useEffect, useState } from "react";
import Sidebar from "./_components/sidebar";
import ChatArea from "./_components/chat-area";

export default function Home() {
  const [userData, setUserData] = useState<any>({});
  

  // const name = userData?.name || "defaultUser";
  // const email = userData?.email || "defaultUser@gmail.com";
  // const password = userData?.password || "defaultpwd";

  useEffect(() => {
    async function getUser() {
      const response = await saveAndGetCurrentUser();
      console.log("UseEffective running in page.tsx");
      setUserData(response.data);
    }

    getUser();
  }, []);

  
  return (
    <div className="flex h-screen">
  
        <div className="hidden lg:flex"><Sidebar /></div>
 
      <div className="flex-1 h-full">
        <ChatArea />
      </div>
    </div>
  );
}
