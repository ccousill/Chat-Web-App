import axios from 'axios'

export const login = async(userData) => {
    try{
        return await axios.post('http://127.0.0.1:8000/chats/login/',userData);
    }catch(e){
        console.log('Error:',e)
    }
}