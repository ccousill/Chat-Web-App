import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../UI/Navbar'
function ChatPage() {
    const user = useSelector(state => state.user)
    const showState = async () => {
        console.log(user);
      };
  return (
    <div>
        <Navbar/>
        <button onClick={showState}/>
    </div>
  )
}

export default ChatPage