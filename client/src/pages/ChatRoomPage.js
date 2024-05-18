import React, {useState,useEffect, useCallback} from "react";
import { useParams } from "react-router-dom";
import Messenger from "../components/Messenger";
import { FetchMessages } from "../services/chats";
function ChatRoomPage() {
  const { roomName } = useParams();
  const [messages,setMessages] = useState([]);
  
  useEffect(() =>{
    const fetch = async () =>{
      try{
        const response = await FetchMessages(roomName);
        setMessages(response.data)
        console.log(response.data)
      }catch(e){
        console.log("Error getting messages", e);
      }
    }
    fetch();
  },[roomName])

  const updateMessages = useCallback((newMessage) => {
    setMessages((prev) => [...prev,newMessage])
  },[])

  return (
    <div>
      <h1>{roomName}</h1>
      <Messenger props={roomName} updateMessages={updateMessages}/>
      <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <strong>{message.user}</strong>: {message.content}
                    </li>
                ))}
            </ul>
    </div>
  );
}

export default ChatRoomPage;
