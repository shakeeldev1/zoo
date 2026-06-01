import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User, Settings, Bell, ChevronDown, Edit3, UserCircle2 } from 'lucide-react'
import { useGetProfileQuery } from '../../redux/api/AuthApi'

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [userData, setUserData] = useState({ name: 'Admin', email: '' })
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const { data: profileData, refetch } = useGetProfileQuery()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser))
      } catch (e) {
        // Ignore parse errors
      }
    }
    if (profileData?.data) {
      setUserData(profileData.data)
    }
  }, [profileData])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  const getInitials = (name) => {
    if (!name) return 'A'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm transition-all duration-300 md:left-64">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X size={22} className="text-[#00633E]" />
              ) : (
                <Menu size={22} className="text-[#00633E]" />
              )}
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#00633E] tracking-tight">Dashboard</h1>
              <p className="text-xs text-gray-500 hidden md:block">Manage your zoo operations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200">
              <Bell size={20} className="text-[#00633E]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#F0B100] rounded-full animate-pulse"></span>
            </button>

            <div className="relative" ref={dropdownRef}>
<button
               onClick={() => setIsProfileOpen(!isProfileOpen)}
               className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 pr-4 border border-transparent hover:border-gray-200 relative"
             >
               <div className="relative">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00633E] to-[#10B981] flex items-center justify-center text-white font-bold text-sm shadow-md">
                   {getInitials(userData?.name)}
                 </div>
                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
               </div>
               <UserCircle2 size={20} className="text-[#00633E] hidden sm:block" />
               <div className="hidden sm:block text-left">
                 <p className="text-sm font-semibold text-gray-800">{userData?.name || 'Admin'}</p>
                 <p className="text-xs text-gray-500">{userData?.role || 'Administrator'}</p>
               </div>
               <ChevronDown size={16} className={`text-gray-500 hidden sm:block transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
             </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{userData?.name}</p>
                    <p className="text-xs text-gray-500">{userData?.email}</p>
                  </div>
                  
                  <button
                    onClick={handleProfile}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 font-medium"
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                  
                  <button
                    onClick={handleSettings}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 font-medium"
                  >
                    <Settings size={18} />
                    Settings
                  </button>
                  
                  <hr className="my-1" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 font-medium"
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