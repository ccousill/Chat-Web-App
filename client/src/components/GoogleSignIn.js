import React, {useEffect} from "react";
import {signInWithGoogle} from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'
import { login } from "../services/chats";

function GoogleSignIn() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user)
    if (user.isAuth) {
      navigate("/chats");
    }
  }, [user, navigate]);


  const handleGoogleSignIn = async () => {
    try{
        const result = await signInWithGoogle();
        const userLogin = {
            id: result.user.uid,
            email: result.user.email
          };
          dispatch(userActions.login(userLogin));
          let response = await login(userLogin);
          console.log(response);
          navigate('/chats');
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