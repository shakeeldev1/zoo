import React from 'react'
import { Ticket, ShoppingCart, Calendar, BarChart3 } from 'lucide-react'
import { useGetAllBuyTicketsQuery } from '../../redux/api/BuyTicket'
import { useGetAllTicketsQuery } from '../../redux/api/TicketApi'

const StatCard = ({ label, value, icon: Icon, color, prefix = '' }) => (
  <div className="flex-1 min-w-[140px] bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-xl shadow-md" style={{ backgroundColor: color }}>
        <Icon size={18} className="text-white" />
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
    <div className="text-3xl font-black text-[#00633E]">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</div>
  </div>
)

const TicketHead = () => {
  const { data: ticketsData } = useGetAllBuyTicketsQuery()
  const { data: allTicketsData } = useGetAllTicketsQuery()

  const ticketOrders = ticketsData?.data || []
  const allTickets = allTicketsData?.data || []

  const totalTicketsSold = ticketOrders.reduce((sum, t) => sum + (t.ticketQty || 0), 0)
  const totalRevenue = ticketOrders.reduce((sum, t) => sum + (t.ticketQty || 0) * (t.ticketId?.price || 0), 0)
  const totalBookings = ticketOrders.length
  const activeEvents = allTickets.length

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-[#00633E]">Ticket Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Real-time ticket sales, bookings, and event metrics</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Tickets Sold" value={totalTicketsSold} icon={Ticket} color="#00633E" />
        <StatCard label="Total Revenue" value={totalRevenue} icon={BarChart3} color="#F0B100" prefix="Rs " />
        <StatCard label="Total Bookings" value={totalBookings} icon={ShoppingCart} color="#00633E" />
        <StatCard label="Active Events" value={activeEvents} icon={Calendar} color="#10B981" />
      </div>
    </section>
  )
}

export default TicketHead
