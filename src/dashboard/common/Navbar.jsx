import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User, Settings, Bell } from 'lucide-react'

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleProfile = () => {
    navigate('/dashboard/profile')
    setIsProfileOpen(false)
  }

  const handleSettings = () => {
    navigate('/dashboard/settings')
    setIsProfileOpen(false)
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-40 bg-[#ffffff] border-b border-[#e6e6e6] shadow-sm transition-all duration-300 md:left-64">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X size={24} className="text-[#00633E]" />
              ) : (
                <Menu size={24} className="text-[#00633E]" />
              )}
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-[#00633E]">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell size={20} className="text-[#00633E]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F0B100] rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-[#00633E] rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium text-[#004f2f] hidden sm:inline">Admin</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#e6e6e6] py-2 z-50">
                  <button
                    onClick={handleProfile}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-[#004f2f]"
                  >
                    <User size={18} />
                    My Profile
                  </button>
                  <button
                    onClick={handleSettings}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-[#004f2f]"
                  >
                    <Settings size={18} />
                    Settings
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-[#fff4e0] transition-colors flex items-center gap-3 text-[#b33a00] font-medium"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
