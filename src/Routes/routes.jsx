import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Login from "../Authentication/Login/Login";
import { Children } from "react";
import Signup from "../Authentication/Signup/Signup";
import Events from "../Events/Events";
import PrivateRoute from "../Authentication/PrivateRoute/PrivateRoute";
import AddEvent from "../Events/AddEvent/AddEvent";
import EventAttendanceList from "../Events/EventAttendanceList/EventAttendanceList";
import Community from "../Community/Community";
import AddRequest from "../Community/AddRequest/AddRequest";

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

            },
            {
                path:"addEvent",
                element:<PrivateRoute><AddEvent></AddEvent></PrivateRoute>
            },
            {
                path:"/events/:eventId/attendanceList",
                element:<PrivateRoute><EventAttendanceList></EventAttendanceList></PrivateRoute>
            },
            {
                path:"/community",
                element:<PrivateRoute><Community></Community></PrivateRoute>
            },
            {
                path:"/addRequest",
                element:<PrivateRoute><AddRequest></AddRequest></PrivateRoute>
            }
        ]
    },
])
export default routes