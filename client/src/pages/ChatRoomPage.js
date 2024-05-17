import React from "react";
import { useParams } from "react-router-dom";
import Messenger from "../components/Messenger";
function ChatRoomPage() {
  const { roomName } = useParams();
  console.log("hello");
  return (
    <div>
      <h1>{roomName}</h1>
      <Messenger props={roomName}/>
    </div>
  );
}

export default ChatRoomPage;
