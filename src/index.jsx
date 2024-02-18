import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from "./routes/Root";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UserListPage from "./components/UserListPage";
import UserDetailsPage from "./components/UserDetailsPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/user",
        element: <UserListPage/>,
      },
      {
        path: "/user/:username",
        element: <UserDetailsPage/>,
      },
    ],
  },

]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
