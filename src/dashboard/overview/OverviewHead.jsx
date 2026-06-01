import React from 'react'
import { Users, ShoppingCart, Ticket, Star } from 'lucide-react'
import { useGetAllUsersQuery } from '../../redux/api/AuthApi'
import { useGetAllBuyAnimalsQuery } from '../../redux/api/BuyAnimal'
import { useGetAllBuyTicketsQuery } from '../../redux/api/BuyTicket'
import { useGetAllReviewsQuery } from '../../redux/api/ReviwsApi'
import { useGetAllAnimalsQuery } from '../../redux/api/AnimalApi'

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="flex-1 min-w-[140px] bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2.5 rounded-xl shadow-md" style={{ backgroundColor: color }}>
        <Icon size={18} className="text-white" />
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
    <div className="text-3xl font-black text-[#00633E]">{typeof value === 'number' ? value.toLocaleString() : value}</div>
  </div>
)

const OverviewHead = () => {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery()
  const { data: animalsData, isLoading: animalsLoading } = useGetAllBuyAnimalsQuery()
  const { data: ticketsData, isLoading: ticketsLoading } = useGetAllBuyTicketsQuery()
  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviewsQuery()
  const { data: allAnimalsData, isLoading: allAnimalsLoading } = useGetAllAnimalsQuery()

  const users = usersData?.data || []
  const buyAnimals = animalsData?.data || []
  const tickets = ticketsData?.data || []
  const reviews = reviewsData?.data || []

  const userCount = users.length
  const buyAnimalCount = buyAnimals.reduce((sum, a) => sum + (a.cartQty || 0), 0)
  const ticketCount = tickets.reduce((sum, t) => sum + (t.ticketQty || 0), 0)
  const reviewCount = reviews.length

  if (usersLoading || animalsLoading || ticketsLoading || reviewsLoading || allAnimalsLoading) {
    return (
      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 min-w-[140px] bg-gray-200 rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-3 w-20"></div>
              <div className="h-8 bg-gray-300 rounded w-16"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-[#00633E]">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Real-time analytics for your zoo management</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Users" value={userCount} icon={Users} color="#00633E" />
        <StatCard label="Animals Bought" value={buyAnimalCount} icon={ShoppingCart} color="#F0B100" />
        <StatCard label="Tickets Sold" value={ticketCount} icon={Ticket} color="#00633E" />
        <StatCard label="Total Reviews" value={reviewCount} icon={Star} color="#00633E" />
      </div>
    </section>
  )
}

export default OverviewHead