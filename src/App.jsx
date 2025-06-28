import { createBrowserRouter } from "react-router-dom"
import Homepage from "./components/pages/Home"
import { RouterProvider } from "react-router"
import MenuPage from "./components/pages/Menu"
import SubscriptionPage from "./components/pages/Subscription"
import ContactPage from "./components/pages/Contact"


const App = () => {
  const router = createBrowserRouter([
    { path: '/', element: <Homepage /> },
    { path: '/menu', element: <MenuPage /> },
    { path: '/subscription', element: <SubscriptionPage /> },
    { path: '/contact', element: <ContactPage /> }
  ])

  return (
    <RouterProvider router={router} />
  )

}

export default App