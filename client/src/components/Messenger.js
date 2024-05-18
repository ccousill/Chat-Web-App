import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SendMessage } from "../services/chats";
import { useSelector } from "react-redux";
function Messenger({props}) {
  const user = useSelector((state) => state.user);
  const roomName = props.split(" ").join("")
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8000/ws/chat/" + roomName+ "/"
  );
  const handleSendMessage = async (e) => {
    e.preventDefault();
    sendMessage(JSON.stringify({ message: chatMessage }));

    try{
        const data = {
            content:chatMessage,
            email: user.user.email,
            roomName:props
        }
        const response = await SendMessage(data);
        console.log(response)
    }catch(e){
        console.log(e);
    }
    setChatMessage("");
  };

  useEffect(() => {
    if (lastMessage) {
      const messageData = JSON.parse(lastMessage.data);
      setChatLog((prevChatLog) => [...prevChatLog, messageData.message]);
    }
  }, [lastMessage]);
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
      <div>
        {chatLog.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <p>WebSocket State: {readyState}</p>
    </div>
  );
}

export default Messenger;
