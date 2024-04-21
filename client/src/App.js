import './App.css';
import LoginPage from './pages/LoginPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ChatPage from './pages/ChatPage';
import {action as logoutAction} from './pages/Logout'
import { RequireAuth } from './util/auth';
const router = createBrowserRouter([
  {
    path:"/",
    id: 'root',
    children:[
      {index: true, element: <LoginPage/>},
      {path:"chats",element: <RequireAuth component={<ChatPage/>}/>, children:[
        {path: "logout", action: logoutAction}
      ]}
    ]
  }
])


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
