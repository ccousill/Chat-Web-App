import React from "react";
import {signInWithGoogle} from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'
function GoogleSignIn() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  let navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try{
        const result = await signInWithGoogle();
        const userLogin = {
            id: result.user.uid,
            email: result.user.email
          };
          dispatch(userActions.login(userLogin));
          navigate('/chats');
          console.log(user);
        }catch(e){
            console.log(e)
        }
  };

  const showState = async () => {
    console.log(user);
  };
  return (
    <div>
      <div>
      <GoogleButton onClick={handleGoogleSignIn}/>
      <button onClick={showState}> Show my user info</button>
      </div>
    </div>
  );
}

export default GoogleSignIn;