import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './Layouts/MainLayout.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx'
import Home from './Components/Home/Home.jsx'
import AuthProvider from './FirebaseAuth/AuthProvider.jsx'
import ThemeProvider from './Contexts/ThemeProvider.jsx'
import AddService from './Pages/AddService/AddService.jsx'
import AllServices from './Pages/AllServices/AllServices.jsx'
import ManageServices from './Pages/ManageServices/ManageServices.jsx'
import UpdateService from './Pages/UpdateService/UpdateService.jsx'
import axios from 'axios'
import ServiceDetails from './Pages/SeviceDetails/ServiceDetails.jsx'
import BookedService from './Pages/BookedService/BookedService.jsx'
import ServiceTodo from './Pages/ServiceTodo/ServiceTodo.jsx'
import PrivateRoute from './Router/PrivateRoute.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => fetch(''),
        Component: Home
      },
      {
        path: 'addservice',
        element: <PrivateRoute><AddService></AddService></PrivateRoute>
      },
      {
        path: 'updateservice/:id',
        element: <PrivateRoute> <UpdateService></UpdateService> </PrivateRoute> ,
        loader: ({params}) => axios.get(`https://learnxyz-server.onrender.com/services/${params.id}`)
      },
      {
        path: 'allservices',
        Component: AllServices
      },
      {
        path: 'servicedetails/:id',
        element: <PrivateRoute> <ServiceDetails></ServiceDetails> </PrivateRoute>,
        loader: ({params}) => axios.get(`https://learnxyz-server.onrender.com/services/${params.id}`)
      },
      {
        path: 'myservices',
        element: <PrivateRoute> <ManageServices></ManageServices> </PrivateRoute> 
        
      },
      {
        path: 'bookedservices',
        element: <PrivateRoute> <BookedService></BookedService> </PrivateRoute> 
      },
      {
        path: 'servicestodo',
        element: <PrivateRoute> <ServiceTodo></ServiceTodo> </PrivateRoute> 
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: '*',
        Component: ErrorPage
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>

  </StrictMode>,
)
