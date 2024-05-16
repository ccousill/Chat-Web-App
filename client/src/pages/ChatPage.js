import React from 'react'
import { useSelector } from 'react-redux';
import useWebSocket, {ReadyState}  from 'react-use-websocket';
import Navbar from '../UI/Navbar'
function ChatPage() {
    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8000/ws/chat/');
    const user = useSelector(state => state.user);
    const showState = async () => {
          console.log(user);
        };
    const handleSendMessage = () => {
      sendMessage(JSON.stringify({ message: 'Hello from client' }));
    };

  return (
    <div>
        <Navbar/>
        <button onClick={showState}/>
        <button onClick={handleSendMessage} disabled={readyState !== ReadyState.OPEN}>
        Send Message
      </button>
      <p>Last Message: {lastMessage ? lastMessage.data : 'None'}</p>
      <p>WebSocket State: {readyState}</p>
    </div>
  )
}

export default ChatPage