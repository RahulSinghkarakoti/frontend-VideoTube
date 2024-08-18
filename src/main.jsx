import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import {
  Channel,
  MyPlaylist,
  LikedVideo,
  Signup,
  Login,
  Home,
  Followers,
  Following,
  History,
  Video,
  Publish,
  PlaylistById,
  Tweet
} from "./pages/index.js";
import Auth from "./pages/Auth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Default path for "/"
        element: <Home />,
      },
      {
        path: "likedvideo",
        element: <LikedVideo />,
      },
      {
        path: "playlist",
        element: <MyPlaylist />, 
       
      },
      {
        path: "playlist/:id",
        element: <PlaylistById/>,
      },
      {
        path: "channel",
        element: <Channel />,
      },
      {
        path: "followers",
        element: <Followers />,
      },
      {
        path:"following",
        element:<Following/>
      },
      {
        path:"tweets",
        element:<Tweet/>
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "video",
        element: <Video/>
      },
      {
        path:"publish",
        element:<Publish/>
      }
    ],
  },
  {
    path: "auth", // Use relative path for nested routes
    element: <Auth />,
    children: [
      {
        path: "login", // Relative path
        element: <Login />,
      },
      {
        path: "signup", // Relative path
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
