import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector } from "react-redux";
function Messenger({props,updateMessages}) {
  const user = useSelector((state) => state.user);
  const roomName = props.split(" ").join("")
  const [chatMessage, setChatMessage] = useState("");
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8000/ws/chat/" + roomName+ "/"
  );
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try{
        const data = {
            content:chatMessage,
            email: user.user.email,
            roomName:props
        }
        sendMessage(JSON.stringify(data));
    }catch(e){
        console.log(e);
    }
    setChatMessage("");
  };

  useEffect(() => {
    if (lastMessage) {
      const messageData = JSON.parse(lastMessage.data);
      console.log(messageData)
      updateMessages(messageData);
    }
  }, [lastMessage,updateMessages]);

  
  return (
    <div>
      <form>
        <textarea
          name="message"
          onChange={(e) => setChatMessage(e.target.value)}
          value={chatMessage}
        ></textarea>
        <button
          onClick={handleSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Send Message
        </button>
      </form>
      <p>WebSocket State: {readyState}</p>
    </div>
  );
}

export default Messenger;
