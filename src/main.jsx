
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import NavBar from "./components/NavBar.jsx";
import ProfilePage from "./pages/RoleModelProfilePage.jsx";
import SignUpForm from "./components/SignUpPageForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import InvitePage from "./components/InvitePage.jsx";

import { AuthProvider } from "./components/AuthProvider.jsx";
import Header from "./components/Header.jsx";



const router = createBrowserRouter([


  // element: <NavBar />,

  { path: "/", element: <HomePage /> },
  { path: "/profile/:id", element: <ProfilePage /> },
  { path: "/signup", element: <SignUpForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/invite", element: <InvitePage /> },



]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);