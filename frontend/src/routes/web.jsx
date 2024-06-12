import { createBrowserRouter } from "react-router-dom";
import Admin from "../layouts/Admin";
import Index from "../pages/admin/Index";

export default createBrowserRouter([
    {
        path: "/",
        element: <Admin />,
        children: [
            {
                path: "",
                element: <Index />
            },
        ],
    },
]);