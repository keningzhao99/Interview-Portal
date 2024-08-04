import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { VideoProvider } from "./components/VideoContext.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./routes/Login.jsx";
import Home from "./routes/Home.jsx";
import { UserProfile } from "./routes/UserProfile.jsx";
import SelfRecording from "./routes/SelfRecording.jsx";
import { EducationalResources } from "./routes/EduactionalResources.jsx";
import { LessonDetail } from "./routes/LessonDetail.jsx";
import { FeedbackDetail } from "./components/FeedbackDetail.jsx";

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
      {
        path: "educational-resources",
        element: <EducationalResources />,
      },
      {
        path: "educational-resources/:lessonId",
        element: <LessonDetail />,
      },
      {
        path: "feedback-detail/:videoId",
        element: <FeedbackDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <React.StrictMode>
      <VideoProvider>
        <RouterProvider router={router} />
      </VideoProvider>
    </React.StrictMode>
  </ChakraProvider>
);
