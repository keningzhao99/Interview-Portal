import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import { Login } from './routes/Login.jsx';
import { Home } from './routes/Home.jsx';
import { UserProfile } from './routes/UserProfile.jsx';
import { SelfRecording } from './routes/SelfRecording.jsx';
import { EducationalResources } from "./routes/EduactionalResources.jsx";
import { LessonDetail } from './routes/LessonDetail.jsx';
import Login from "./routes/Login.jsx";
import  Home  from "./routes/Home.jsx";
import UserProfile  from "./routes/UserProfile.jsx";
import SelfRecording from "./routes/SelfRecording.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/self-recording",
    element: <SelfRecording />,
  },
  {
    /* Add more if necessary for Forum page*/
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>
);
