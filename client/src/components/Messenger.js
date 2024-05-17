import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
function Messenger({props}) {
    
  const roomName = props.split(" ").join("")
  console.log(roomName);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8000/ws/chat/" + roomName+ "/"
  );
  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(JSON.stringify({ message: chatMessage }));
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
