import './App.css'
import { useEffect, useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import AOS from "aos";
import "aos/dist/aos.css";
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/common/Footer'
import Services from './pages/Services'
import Events from './pages/Events'
import Navbarr from './components/dashboard/common/Navbar'
import SideBaar from './components/dashboard/common/SideBaar'
import Overview from './pages/dashboard/Overview'
import Users from './pages/dashboard/Users'

const MainFunction = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div>
      <Navbar openCart={openCart} />   {/* pass openCart function */}
      <Outlet />
      <Footer />
      {isCartOpen && <CartModal close={closeCart} />}   {/* render modal */}
    </div>
  )
}

const AdminLayout = () => {
  return (
    <div>
      <SideBaar />
      <Navbarr />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <MainFunction />,
    children: [{ path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: "/services", element: <Services /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/signup", element: <SignupForm /> },
    { path: "/contact", element: <Contact /> },
    { path: "/events", element: <Events /> }
    ]
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/dashboard", element: <Overview /> },
      { path: '/users', element: <Users /> }
    ]
  }
])

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false })
  }, [])
  return <RouterProvider router={router} />
}

export default App
