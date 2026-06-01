import React from 'react'
import { Ticket, ShoppingCart, Calendar, BarChart3, TrendingUp, Users, Clock, Activity } from 'lucide-react'
import { useGetAllBuyTicketsQuery } from '../../redux/api/BuyTicket'
import { useGetAllTicketsQuery } from '../../redux/api/TicketApi'

const StatCard = ({ label, value, icon: Icon, color, prefix = '', trend, trendValue }) => (
  <div className="flex-1 min-w-[140px] bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-3 rounded-xl shadow-md" style={{ backgroundColor: color }}>
        <Icon size={20} className="text-white" />
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-3xl font-black text-[#00633E] mb-2">
      {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
    </div>
    {trend && (
      <div className="flex items-center gap-1 text-xs">
        <TrendingUp size={14} className={trend === 'up' ? 'text-green-500' : 'text-red-500'} />
        <span className={trend === 'up' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          {trendValue}
        </span>
        <span className="text-gray-500">from last month</span>
      </div>
    )}
  </div>
)

const TicketHead = () => {
  const { data: ticketsData, isLoading: ticketsLoading, error: ticketsError } = useGetAllBuyTicketsQuery()
  const { data: allTicketsData, isLoading: eventsLoading } = useGetAllTicketsQuery()

  const ticketOrders = ticketsData?.data || []
  const allTickets = allTicketsData?.data || []

  const totalTicketsSold = ticketOrders.reduce((sum, t) => sum + (t.ticketQty || 0), 0)
  const totalRevenue = ticketOrders.reduce((sum, t) => sum + (t.ticketQty || 0) * (t.ticketId?.price || 0), 0)
  const totalBookings = ticketOrders.length
  const activeEvents = allTickets.filter(t => t.status === 'Active' || !t.status).length

  const soldOutEvents = allTickets.filter(t => t.soldOut || t.availableTickets === 0).length
  const upcomingEvents = allTickets.filter(t => {
    const eventDate = new Date(t.eventDate || t.date)
    return eventDate > new Date()
  }).length

  const avgTicketsPerBooking = totalBookings > 0 ? (totalTicketsSold / totalBookings).toFixed(1) : 0

  if (ticketsError) {
    return (
      <section className="mb-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium">Failed to load ticket analytics</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-[#00633E] flex items-center gap-2">
            <Activity size={28} />
            Ticket Analytics
          </h2>
          <p className="text-sm text-gray-500 mt-1">Real-time ticket sales, bookings, and event metrics</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={14} />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <StatCard 
          label="Tickets Sold" 
          value={totalTicketsSold} 
          icon={Ticket} 
          color="#00633E" 
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard 
          label="Total Revenue" 
          value={totalRevenue} 
          icon={BarChart3} 
          color="#F0B100" 
          prefix="Rs "
          trend="up"
          trendValue="+8.2%"
        />
        <StatCard 
          label="Total Bookings" 
          value={totalBookings} 
          icon={ShoppingCart} 
          color="#00633E" 
          trend="up"
          trendValue="+5.1%"
        />
        <StatCard 
          label="Active Events" 
          value={activeEvents} 
          icon={Calendar} 
          color="#10B981" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-[#00633E] to-[#10B981] rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} />
            <span className="text-xs opacity-90">Avg Tickets/Booking</span>
          </div>
          <div className="text-2xl font-bold">{avgTicketsPerBooking}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#F0B100] to-[#F5C447] rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={18} />
            <span className="text-xs opacity-90">Upcoming Events</span>
          </div>
          <div className="text-2xl font-bold">{upcomingEvents}</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Ticket size={18} />
            <span className="text-xs opacity-90">Sold Out Events</span>
          </div>
          <div className="text-2xl font-bold">{soldOutEvents}</div>
        </div>
      </div>
    </section>
  )
}

export default TicketHead