import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/Admin";
import Index from "../pages/admin/Index";
import LoginLayout from "../layouts/Login";
import LoginPage from "../pages/auth/Login";
import SignUpPage from "../pages/auth/SignUp";

export default createBrowserRouter([
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                element: <Index />
            },
        ],
    },
    {
        path: "auth",
        element: <LoginLayout />,
        children: [
            { 
                path: "login", 
                element: <LoginPage /> 
            },
            { 
                path: "signup", 
                element: <SignUpPage /> 
            },
        ]
    },
]);