import {createSlice} from "@reduxjs/toolkit";
let initialState = {user:null}

const storedAuthState = localStorage.getItem('authState');
initialState = storedAuthState ? JSON.parse(storedAuthState) : initialState;

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        login(state,action){
            const data = action.payload
            const userData = {
                id: data.id,
                email: data.email,
            }
            state.user = userData;
            localStorage.setItem('authState', JSON.stringify(userData));
        },
        logout(state){ 
            state.user = null;
            localStorage.setItem('authState', JSON.stringify(null));
        },
        setUserState(state,action){
            const data = action.payload
            const userData = {
                id: data.user._id,
                email: data.user.email,
            }
            state.user = userData;
        }
    }
})

export const userActions = userSlice.actions
export default userSlice;