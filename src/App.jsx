import { createBrowserRouter } from "react-router-dom"
import Homepage from "./components/pages/Home"
import { RouterProvider } from "react-router"
import MenuPage from "./components/pages/Menu"
import SubscriptionPage from "./components/pages/Subscription"
import ContactPage from "./components/pages/Contact"
import SignUpPage from "./components/pages/SignUp"
import SignInPage from "./components/pages/SignIn"
import DashboardPage from "./components/pages/Dashboard"

const App = () => {
  const router = createBrowserRouter([
    { path: '/', element: <Homepage /> },
    { path: '/menu', element: <MenuPage /> },
    { path: '/subscription', element: <SubscriptionPage /> },
    { path: '/contact', element: <ContactPage /> },
    { path: '/signup', element: <SignUpPage /> },
    { path: '/signin', element: <SignInPage /> },
    { path: '/dashboard', element: <DashboardPage /> },
    
  ])

  return (
    <RouterProvider router={router} />
  )

}

export default App