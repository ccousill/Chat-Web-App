import React from 'react'
import { useSubmit, Link} from "react-router-dom";
import { signOutOfGoogle } from '../firebase/firebase';
import { userActions } from '../store/user-slice';
import { useDispatch, useSelector } from 'react-redux'

function Navbar() {
    const dispatch = useDispatch();
    const submit = useSubmit();
    const user = useSelector((state) => state.user);
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

    const showEmail = () =>{
        console.log(user);
    }
  return (
    <header className='navbar'>
        <nav>
            <div>
            {user.user.email}
            <button onClick={showEmail}>Show user state info</button>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/chats">Back to ChatList</Link>
            </div>
        </nav>
    </header>
  )
}

export default Navbar