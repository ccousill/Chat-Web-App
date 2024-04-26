import "./App.css";
import LoginPage from "./pages/LoginPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import { action as logoutAction } from "./pages/Logout";
import { RequireAuth } from "./util/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "./firebase/firebase";
const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "chats",
        element: <RequireAuth component={<ChatPage />} />,
        children: [{ path: "logout", action: logoutAction }],
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      console.log("google state change", user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
