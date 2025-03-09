import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Login from "../Authentication/Login/Login";
import { Children } from "react";
import Signup from "../Authentication/Signup/Signup";

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
            }
        ]
    },
])
export default routes