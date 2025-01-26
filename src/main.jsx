
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import NavBar from "./components/NavBar.jsx";
import RoleModelProfile from "./pages/RoleModelProfilePage.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";

import { AuthProvider } from "./components/AuthProvider.jsx";
import Header from "./components/Header.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    // element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/role-model-profile", element: <RoleModelProfile /> },
      { path: "/signup", element: <SignUpForm /> },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);