import {createSlice} from "@reduxjs/toolkit";
let initialState = {user:{}, isAuth:false}

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
            state.isAuth = true;
            localStorage.setItem('authState', JSON.stringify({user:userData,isAuth:true}));
        },
        logout(state){ 
            state.user = {};
            state.isAuth = false;
            localStorage.removeItem('authState');
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