import React , {useState} from 'react'
import { CreateRoom } from "../services/chats";
import { useSelector } from "react-redux";
function CreateRoomForm() {
    const [roomName, setRoomName] = useState("");
    const user = useSelector((state) => state.user);
    const handleCreateRoom = async (e) =>{
        e.preventDefault();
        try{
            let response = await CreateRoom({user:user,roomName:roomName});
            console.log(response);

            setRoomName("");
        }catch(e){
            console.log(e);
        }
    }
  return (
    <div>
        <form onSubmit={handleCreateRoom}>
            <label htmlFor="roomname"> Room Name</label>
            <input name="roomname" onChange={(e) => setRoomName(e.target.value)} value ={roomName}></input>
            <button>Create Room</button>
        </form>
    </div>
  )
}

export default CreateRoomForm