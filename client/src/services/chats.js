import axios from 'axios'

export const login = async(userData) => {
    try{
        return await axios.post('http://127.0.0.1:8000/chats/login/',userData);
    }catch(e){
        console.log('Error:',e)
    }
}

export const CreateRoom = async(roomData) => {
    try{
        return await axios.post('http://127.0.0.1:8000/chats/createroom/',roomData);
    }catch(e){
        console.log('Error:',e)
    }
}

export const AllChatRooms = async () => {
    try{
        return await axios.get('http://127.0.0.1:8000/chats/rooms/');
    }catch(e){
        console.log('Error:',e)
    }
}

export const SendMessage = async (messageData) => {
    try{
        return await axios.post('http://127.0.0.1:8000/chats/sendmessage/',messageData);
    }catch(e){
        console.log('Error:',e)
    }
}