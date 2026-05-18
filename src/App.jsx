import './App.css'
import { useEffect, useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
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
import VisitSchools from './components/home/VisitSchools'
import ScrollToTop from './components/common/ScrollToTop'

// ============================================
// MAIN LAYOUT - User facing pages
// ============================================
const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div>
      <ScrollToTop />
      <Navbar openCart={openCart} />
      {isCartOpen && <Cart close={closeCart} />}
      <Outlet />
      <Footer />
    </div>
  )
}

// ============================================
// ADMIN LAYOUT - Dashboard pages
// ============================================
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Navbar */}
        <DashboardNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pt-16 md:pt-20 pb-8">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

// ============================================
// PLACEHOLDER COMPONENTS FOR NEW ROUTES
// ============================================
// Animals Management
const AnimalsList = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Animals Management</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
)

const AddAnimal = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Add New Animal</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
)

const AnimalCategories = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Animal Categories</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
)

// Shop Management
const BuyAnimalsList = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Buy Animals</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
)

const OrdersList = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Orders</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
)

const Inventory = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Inventory</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
)

// Reviews Management
// (page now provided in src/pages/dashboard/Reviews.jsx)

// Admin Settings & Profile
const AdminProfile = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">My Profile</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
)

const AdminSettings = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
)

// ============================================
// ROUTER CONFIGURATION
// ============================================
const router = createBrowserRouter([
  // User-facing routes
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
      { path: "/buyanimal", element: <BuyAnimalPage /> }
    ]
  },
  // Admin/Dashboard routes
  {
    element: <AdminLayout />,
    children: [
      // Dashboard
      { path: "/dashboard", element: <OverviewPage /> },
      
      // Users Management
      { path: '/dashboard/users', element: <Users /> },
      
      // Animals Management
      { path: '/dashboard/animals', element: <AnimalsPage /> },
      
      
      // Tickets Management
      { path: '/dashboard/tickets', element: <Tickets /> },
      
      // Reviews Management
      { path: '/dashboard/reviews', element: <Reviews/> },
      
      // Admin Profile & Settings
      { path: '/dashboard/profile', element: <AdminProfile /> },
      { path: '/dashboard/settings', element: <AdminSettings /> }
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
