import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Ticket,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  X
} from 'lucide-react'

const SideBaar = ({ isOpen, toggleSidebar }) => {
  const [expandedMenu, setExpandedMenu] = useState(null)

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Users', icon: Users, path: '/dashboard/users' },
    { label: 'Animals', icon: Users, path: '/dashboard/animals' },
    { label: 'Tickets', icon: Ticket, path: '/dashboard/tickets' },
    { label: 'Reviews', icon: MessageSquare, path: '/dashboard/reviews' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' }
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const toggleSubmenu = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index)
  }

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar()
    }
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30" onClick={toggleSidebar} />}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-[#00633E] text-white shadow-xl transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b border-[#05523a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F0B100] rounded-lg flex items-center justify-center font-bold text-lg text-[#004f2f]">Z</div>
            <div>
              <h2 className="text-lg font-bold">ZOO</h2>
              <p className="text-xs text-[#d1f0df]">Admin</p>
            </div>
          </div>
          <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-[#05523a] rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#F0B100] text-[#004f2f] shadow-lg' : 'text-[#d8f6e9] hover:bg-[#05523a]/60 hover:text-white'}`} onClick={handleNavClick}>
                  <item.icon size={20} className="text-[#d8f6e9]" />
                  <span className="font-medium text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#05523a]">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#F0B100] hover:bg-[#e0a800] transition-colors font-medium text-[#004f2f]">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default SideBaar
