import React from 'react'
import { useSelector } from 'react-redux';

function ChatPage() {
    const user = useSelector(state => state.user)
    const showState = async () => {
        console.log(user);
      };
  return (
    <div>
        
        <button onClick={showState}/>
    </div>
  )
}

export default ChatPage