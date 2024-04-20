import './App.css';
import LoginPage from './pages/LoginPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ChatPage from './pages/ChatPage';
const router = createBrowserRouter([
  {
    path:"/",
    id: 'root',
    children:[
      {index: true, element: <LoginPage/>},
      {path:"chats",element: <ChatPage/>}
    ]
  }
])


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
