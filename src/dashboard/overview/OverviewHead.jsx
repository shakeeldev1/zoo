import React from 'react'
import { Users, ShoppingCart, Ticket, Star } from 'lucide-react'
import { summary } from './overviewData'

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="flex-1 min-w-[160px] bg-white shadow-sm rounded-xl p-4 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-2xl font-bold text-[#00633E] mt-1">{value.toLocaleString()}</div>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ background: color }}>
        <Icon size={22} className="text-white" />
      </div>
    </div>
  </div>
)

const OverviewHead = () => {
  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={summary.users} icon={Users} color="#00633E" />
        <StatCard label="Buy Animals" value={summary.buyAnimals} icon={ShoppingCart} color="#F0B100" />
        <StatCard label="Ticket Sales" value={summary.tickets} icon={Ticket} color="#00633E" />
        <StatCard label="Total Reviews" value={summary.reviews} icon={Star} color="#00633E" />
      </div>
    </section>
  )
}

export default OverviewHead
