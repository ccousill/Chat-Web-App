import React, { useState, useEffect } from "react";
import { AllChatRooms } from "../services/chats";
function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await AllChatRooms();
        console.log(response.data);
        setChatRooms(response.data);
      } catch (e) {
        console.log("Error fetching chat rooms", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return <div>
    <h2>Chat rooms</h2>
    {isLoading ? (<p>Loading...</p>) :
    (<ul>
        {chatRooms.map((room, index) => (
          <li key={index}>{room.name}</li>
        ))}
      </ul>)}

  </div>;
}

export default ChatRoomList;
