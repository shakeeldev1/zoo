import React from 'react'
import { FaPaw, FaShoppingCart, FaBox, FaStar } from 'react-icons/fa'
import { useGetAllAnimalsQuery } from '../../redux/api/AnimalApi'
import { useGetAllBuyAnimalsQuery } from '../../redux/api/BuyAnimal'

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

const AnimalHead = () => {
  const { data: animalsData, isLoading: animalsLoading } = useGetAllAnimalsQuery()
  const { data: ordersData, isLoading: ordersLoading } = useGetAllBuyAnimalsQuery()

  const animals = animalsData?.data || []
  const orders = ordersData?.data || []

  const totalAnimals = animals.length
  const totalInCart = orders.reduce((sum, o) => sum + (o.cartQty || 0), 0)
  const totalOrders = orders.length
  const totalStock = animals.reduce((sum, a) => sum + (a.quantity || 0), 0)

  if (animalsLoading || ordersLoading) {
    return (
      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 min-w-[140px] bg-gray-200 rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-3 w-24"></div>
              <div className="h-8 bg-gray-300 rounded w-20"></div>
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
          <h2 className="text-2xl font-bold text-[#00633E]">Animal Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Track animals, orders, stock, and purchases in real-time</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Animals" value={totalAnimals} icon={FaPaw} color="#00633E" />
        <StatCard label="In Cart" value={totalInCart} icon={FaShoppingCart} color="#F0B100" />
        <StatCard label="Total Orders" value={totalOrders} icon={FaBox} color="#00633E" />
        <StatCard label="Total Stock" value={totalStock} icon={FaStar} color="#10B981" />
      </div>
    </section>
  )
}

export default AnimalHead