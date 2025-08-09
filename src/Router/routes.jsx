import { createBrowserRouter } from "react-router";
import axios from "axios";

// Layouts & Pages
import MainLayout from "../Layouts/MainLayout.jsx";
import Home from "../Components/Home/Home.jsx";
import Login from "../Components/Login/Login.jsx";
import Register from "../Components/Register/Register.jsx";
import ErrorPage from "../Components/ErrorPage/ErrorPage.jsx";
import AddService from "../Pages/AddService/AddService.jsx";
import AllServices from "../Pages/AllServices/AllServices.jsx";
import ManageServices from "../Pages/ManageServices/ManageServices.jsx";
import UpdateService from "../Pages/UpdateService/UpdateService.jsx";
import ServiceDetails from "../Pages/SeviceDetails/ServiceDetails.jsx";
import BookedService from "../Pages/BookedService/BookedService.jsx";
import ServiceTodo from "../Pages/ServiceTodo/ServiceTodo.jsx";
import DashboardLayout from "../Layouts/DashboardLayout.jsx";
import DashboardHome from "../Pages/DashboardHome/DashboardHome.jsx";
// Auth
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                loader: () => fetch(""),
                Component: Home,
            },
            {
                path: "addservice",
                element: (
                    <PrivateRoute>
                        <AddService />
                    </PrivateRoute>
                ),
            },
            {
                path: "updateservice/:id",
                element: (
                    <PrivateRoute>
                        <UpdateService />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    axios.get(`https://learnxyz-server.onrender.com/services/${params.id}`),
            },
            {
                path: "allservices",
                Component: AllServices,
            },
            {
                path: "servicedetails/:id",
                element: (
                    <PrivateRoute>
                        <ServiceDetails />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    axios.get(`https://learnxyz-server.onrender.com/services/${params.id}`),
            },
            {
                path: "myservices",
                element: (
                    <PrivateRoute>
                        <ManageServices />
                    </PrivateRoute>
                ),
            },

            {
                path: "bookedservices",
                element: (
                    <PrivateRoute>
                        <BookedService />
                    </PrivateRoute>
                ),
            },
            {
                path: "servicestodo",
                element: (
                    <PrivateRoute>
                        <ServiceTodo />
                    </PrivateRoute>
                ),
            },
            {
                path: "login",
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path: "register",
                element: (
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                ),
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardHome />,
            },
            {
                path: "addservice",
                element: <AddService />,
            },
            {
                path: "myservices",
                element: <ManageServices />,
            },
            {
                path: "servicestodo",
                element: <ServiceTodo />,
            },
        ],
    }
]);

export default router;
