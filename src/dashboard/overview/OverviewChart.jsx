import React from 'react'
import { lineData, pieData } from './overviewData'

// Simple responsive line chart using SVG
const LineChart = ({ data, className = '' }) => {
  const width = 700
  const height = 220
  const padding = 30
  const values = data.map(d => d.value)
  const max = Math.max(...values)
  const points = data.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (data.length - 1)
    const y = height - padding - (d.value / max) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full h-52 ${className}`} preserveAspectRatio="none">
      {/* area under line - subtle solid fill */}
      <polyline points={`${points} ${width - padding},${height - padding} ${padding},${height - padding}`} fill="#EAF7EE" stroke="none" />
      {/* line */}
      <polyline points={points} fill="none" stroke="#00633E" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {/* points */}
      {data.map((d, i) => {
        const x = padding + (i * (width - padding * 2)) / (data.length - 1)
        const y = height - padding - (d.value / max) * (height - padding * 2)
        return <circle key={i} cx={x} cy={y} r={3.5} fill="#00633E" />
      })}
    </svg>
  )
}

// Simple pie chart using SVG
const PieChart = ({ data, className = '' }) => {
  const size = 220
  const radius = size / 2
  const total = data.reduce((s, d) => s + d.value, 0)
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
    return { dAttr, label: d.label, value: d.value }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={`w-full h-52 ${className}`}>
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

function palette(i) {
  const colors = ['#00633E', '#F0B100', '#60A5FA', '#A78BFA', '#F97316']
  return colors[i % colors.length]
}

const OverviewChart = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-sm">
        <h3 className="text-lg font-semibold text-white mb-3">Monthly Growth</h3>
        <LineChart data={lineData} />
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-sm">
        <h3 className="text-lg font-semibold text-white mb-3">Sales Breakdown</h3>
        <div className="flex items-center gap-4">
          <div className="w-36">
            <PieChart data={pieData} />
          </div>
          <div className="flex-1">
            {pieData.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full block`} style={{ background: palette(idx) }}></span>
                  <span className="text-sm text-white/90">{p.label}</span>
                </div>
                <div className="text-sm text-white/80">{p.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OverviewChart
