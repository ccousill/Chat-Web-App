import React from 'react'
import { useSubmit} from "react-router-dom";
import { signOutOfGoogle } from '../firebase/firebase';
import { userActions } from '../store/user-slice';
import { useDispatch } from 'react-redux'

function Navbar() {
    const dispatch = useDispatch();
    const submit = useSubmit();
    const handleLogout = async () =>{
        try{
            await signOutOfGoogle();
            dispatch(userActions.logout());
            submit(null, { action: "logout", method: "post" });
        }
        catch(e){
            console.log(e)
        }
    }
  return (
    <header className='navbar'>
        <nav>
            <div>
            <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar