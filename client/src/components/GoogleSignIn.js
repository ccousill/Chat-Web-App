import React from "react";
import {signInWithGoogle} from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useSelector } from 'react-redux';
function GoogleSignIn() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const handleGoogleSignIn = async () => {
    try{
        const result = await signInWithGoogle();
        const userLogin = {
            id: result.user.uid,
            email: result.user.email
          };
          console.log(userLogin);
          dispatch(userActions.login(userLogin));
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
      <button onClick={handleGoogleSignIn}/>
      <button onClick={showState}/>
      </div>
    </div>
  );
}

export default GoogleSignIn;