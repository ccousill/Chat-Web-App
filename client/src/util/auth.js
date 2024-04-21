import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const RequireAuth = ({ component }) => {
    const user = useSelector(state => state.user.isAuth)
    console.log(user)
    return user ? component : <Navigate to="/" />;
  };