import './App.css'
import { useEffect, useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Cart from './components/common/Cart'
import Home from './pages/Home'
import BuyAnimalPage from './pages/BuyAnimalPage'
import AOS from "aos";
import "aos/dist/aos.css";
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/common/Footer'
import Services from './pages/Services'
import Events from './pages/Events'
import DashboardNavbar from './dashboard/common/Navbar'
import DashboardSidebar from './dashboard/common/SideBaar'
import OverviewPage from './pages/dashboard/overviewPage'
import Users from './pages/dashboard/Users'
import Reviews from './pages/dashboard/Reviews'
import AnimalsPage from './pages/dashboard/Animals'
import Tickets from './pages/dashboard/Tickets'
import ProfilePage from './components/profile/ProfilePage'
import Settings from './dashboard/pages/Settings'
import VisitSchools from './components/home/VisitSchools'
import ScrollToTop from './components/common/ScrollToTop'
import TicketCart from './components/common/TicketCart'
import TicketPages from './pages/TicketPages'
import { useAppContext } from './context/ContextApi';
import ChatBot from './components/chatbot/ChatBot'

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTicketCartOpen, setIsTicketCartOpen] = useState(false);

  const openCart = () => {
    setIsTicketCartOpen(false);
    setIsCartOpen(true);
  };

  const closeCart = () => setIsCartOpen(false);

  const openTicketCart = () => {
    setIsCartOpen(false);
    setIsTicketCartOpen(true);
  };

  const closeTicketCart = () => setIsTicketCartOpen(false);

  return (
    <div className="overflow-hidden">
      <ScrollToTop />
      <Navbar openCart={openCart} openTicketCart={openTicketCart} />
      {isCartOpen && <Cart close={closeCart} />}
      {isTicketCartOpen && <TicketCart close={closeTicketCart} />}
      <Outlet />
      <ChatBot />
      <Footer />
    </div>
  );
};

const AdminLayout = () => {
  const { user, isLogin, loading } = useAppContext();
  const navigate = useNavigate();

  // Wait for authentication check to complete
  if (loading) {
    return null; // Return null while checking auth state
  }

  // Redirect to login if not logged in (handles initial load and logout)
  if (!isLogin) {
    navigate("/login");
    return null;
  }

  // If logged in but not admin, redirect to home
  if (user?.role !== 'admin') {
    navigate("/");
    return null;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <DashboardNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto pt-16 md:pt-20 pb-8">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/visitschool', element: <VisitSchools /> },
      { path: "/services", element: <Services /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignupForm /> },
      { path: "/contact", element: <Contact /> },
      { path: "/events", element: <Events /> },
      { path: "/buyanimal", element: <BuyAnimalPage /> },
      { path: "/buyticket", element: <TicketPages /> },
      { path: "/profile", element: <ProfilePage /> }
    ]
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/dashboard", element: <OverviewPage /> },
      { path: '/dashboard/users', element: <Users /> },
      { path: '/dashboard/animals', element: <AnimalsPage /> },
      { path: '/dashboard/tickets', element: <Tickets /> },
      { path: '/dashboard/reviews', element: <Reviews/> },
      { path: '/dashboard/profile', element: <Settings /> },
      { path: '/dashboard/settings', element: <Settings /> }
    ]
  }
]);

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false })
  }, [])
   
  return <RouterProvider router={router} />
}

export default App