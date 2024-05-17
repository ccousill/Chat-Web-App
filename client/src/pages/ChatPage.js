import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Navbar from "../UI/Navbar";
import CreateRoomForm from "../components/CreateRoomForm";
import ChatRoomList from "../components/ChatRoomList";
function ChatPage() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8000/ws/chat/room1/"
  );
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog,setChatLog] = useState([])
  const user = useSelector((state) => state.user);
  const showState = async () => {
    console.log(user);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(JSON.stringify({ message: chatMessage }));
    setChatMessage("")
  };

  useEffect(() => {
    if(lastMessage) {
      const messageData = JSON.parse(lastMessage.data);
      setChatLog((prevChatLog)=> [...prevChatLog,messageData.message])
    }
  },[lastMessage])

  return (
    <div>
      <Navbar />
      <button onClick={showState} />
      <CreateRoomForm/>
      <ChatRoomList/>
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
      <div>{chatLog.map((message, index) => (
          <p key={index}>{message}</p>
        ))}</div>
      <p>WebSocket State: {readyState}</p>
    </div>
  );
}

export default ChatPage;
