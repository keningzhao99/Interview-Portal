import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./routes/Login.jsx";
import  Home  from "./routes/Home.jsx";
import UserProfile  from "./routes/UserProfile.jsx";
import SelfRecording from "./routes/SelfRecording.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "",
        element: <Login />,
      },
      {
        path: "self-recording",
        element: <SelfRecording />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>
);