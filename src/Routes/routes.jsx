import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Login from "../Authentication/Login/Login";
import { Children } from "react";
import Signup from "../Authentication/Signup/Signup";
import Events from "../Events/Events";
import PrivateRoute from "../Authentication/PrivateRoute/PrivateRoute";

const routes = createBrowserRouter([
    {
        path: "/",
        element:<Root></Root>,
        children:[
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:"/signup",
                element:<Signup></Signup>
            },
            {
                path:"/events",
                element: <PrivateRoute><Events></Events></PrivateRoute>

            }
        ]
    },
])
export default routes