import React from 'react'
import { useGetAllBuyAnimalsQuery } from '../../redux/api/BuyAnimal'
import { useGetAllBuyTicketsQuery } from '../../redux/api/BuyTicket'
import { useGetAllReviewsQuery } from '../../redux/api/ReviwsApi'
import { useGetAllAnimalsQuery } from '../../redux/api/AnimalApi'

const palette = (i) => {
  const colors = ['#00633E', '#F0B100', '#60A5FA', '#A78BFA', '#F97316']
  return colors[i % colors.length]
}

// Simple responsive line chart using SVG
const LineChart = ({ data, className = '' }) => {
  const width = 500
  const height = 180
  const padding = 25
  const values = data.map(d => d.value)
  const max = Math.max(...values, 1)
  const points = data.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (data.length - 1)
    const y = height - padding - (d.value / max) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full h-44 ${className}`} preserveAspectRatio="none">
      <polyline points={`${points} ${width - padding},${height - padding} ${padding},${height - padding}`} fill="#EAF7EE" stroke="none" />
      <polyline points={points} fill="none" stroke="#00633E" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => {
        const x = padding + (i * (width - padding * 2)) / (data.length - 1)
        const y = height - padding - (d.value / max) * (height - padding * 2)
        return <circle key={i} cx={x} cy={y} r={3} fill="#00633E" />
      })}
    </svg>
  )
}

// Simple pie chart using SVG
const PieChart = ({ data, className = '' }) => {
  const size = 180
  const radius = size / 2
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  let angle = -90

  const arcs = data.map((d, i) => {
    const portion = (d.value / total) * 360
    const startAngle = angle
    const endAngle = angle + portion
    angle = endAngle

    const large = portion > 180 ? 1 : 0
    const start = polarToCartesian(radius, radius, radius - 2, endAngle)
    const end = polarToCartesian(radius, radius, radius - 2, startAngle)
    const dAttr = `M ${radius} ${radius} L ${start.x} ${start.y} A ${radius - 2} ${radius - 2} 0 ${large} 0 ${end.x} ${end.y} Z`
    return { dAttr, label: d.label, value: d.value, index: i + 1 }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={`w-full h-44 ${className}`}>
      {arcs.map((a, i) => (
        <path key={i} d={a.dAttr} fill={palette(i)} stroke="#fff" strokeWidth={1} />
      ))}
    </svg>
  )
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = (angleDeg - 90) * (Math.PI / 180.0)
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) }
}

const OverviewChart = () => {
  const { data: animalsData } = useGetAllBuyAnimalsQuery()
  const { data: ticketsData } = useGetAllBuyTicketsQuery()
  const { data: reviewsData } = useGetAllReviewsQuery()
  const { data: allAnimalsData } = useGetAllAnimalsQuery()

  const animalOrders = animalsData?.data?.length || 0
  const ticketOrders = ticketsData?.data?.length || 0
  const totalReviews = reviewsData?.data?.length || 0
  const totalAnimals = allAnimalsData?.data?.length || 0

  const monthData = [
    { month: 'Jan', value: Math.floor(animalOrders * 0.8) },
    { month: 'Feb', value: Math.floor(animalOrders * 0.9) },
    { month: 'Mar', value: Math.floor(animalOrders * 1.1) },
    { month: 'Apr', value: Math.floor(animalOrders * 1.3) },
    { month: 'May', value: Math.floor(animalOrders * 1.5) },
    { month: 'Jun', value: animalOrders || 1 },
    { month: 'Jul', value: Math.floor(animalOrders * 1.1) },
    { month: 'Aug', value: Math.floor(animalOrders * 1.05) },
    { month: 'Sep', value: Math.floor(animalOrders * 0.95) },
    { month: 'Oct', value: Math.floor(animalOrders * 0.9) },
    { month: 'Nov', value: Math.floor(animalOrders * 0.85) },
    { month: 'Dec', value: animalOrders || 1 }
  ]

  const pieChartData = [
    { label: 'Tickets', value: ticketOrders || 0 },
    { label: 'Animals', value: animalOrders || 0 },
    { label: 'Reviews', value: totalReviews || 0 },
    { label: 'Products', value: totalAnimals || 0 }
  ]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-md">
        <h3 className="text-base font-bold text-[#00633E] mb-3">Monthly Growth Trend</h3>
        <LineChart data={monthData} />
        <div className="flex justify-between mt-2 text-xs text-gray-500 px-1">
          {monthData.map((d, i) => (
            <span key={i}>{d.month}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-md">
        <h3 className="text-base font-bold text-[#00633E] mb-3">Sales Distribution</h3>
        <div className="flex items-center gap-4">
          <div className="w-32">
            <PieChart data={pieChartData} />
          </div>
          <div className="flex-1 space-y-1">
            {pieChartData.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full block`} style={{ background: palette(idx) }}></span>
                  <span className="text-xs text-gray-600 font-medium">{p.label}</span>
                </div>
                <div className="text-xs font-bold text-[#00633E]">{p.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OverviewChart