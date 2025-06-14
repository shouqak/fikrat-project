import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import Admin from "../Pages/Admin"
import Student from "../Pages/Student"
import Teacher from "../Pages/Teacher"
import AllIdeas from "../Pages/AllIdeas"



function Layout() {
  return (
    <>

      <Outlet />

    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home/> },
{ path: "/Login", element: <Login/> },
{ path: "/Signup", element: <Signup/> },
{ path: "/adminDashboard", element: <Admin/> },
{ path: "/homeDashboard/:id", element: <Student/> },
{ path: "/teacherDashboard/:id", element: <Teacher/>},
{ path: "/allIdeas", element: <AllIdeas/>},

    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router