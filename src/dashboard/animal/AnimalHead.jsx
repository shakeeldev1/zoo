import React from 'react'

const Stat = ({ label, value, bg }) => (
  <div className="flex-1 min-w-[150px] bg-white rounded-xl p-4 border shadow-sm">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="text-2xl font-bold text-[#00633E] mt-1">{value}</div>
  </div>
)

const AnimalHead = ({ stats = { total: 124, endangered: 12, species: 34, newThisMonth: 5 } }) => {
  return (
    <section className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#00633E]">Animals</h2>
          <p className="text-sm text-gray-500">Overview of animals in the zoo</p>
        </div>
        <div className="flex gap-4 flex-wrap">
          <Stat label="Total Animals" value={stats.total} />
          <Stat label="Endangered" value={stats.endangered} />
          <Stat label="Species" value={stats.species} />
          <Stat label="New This Month" value={stats.newThisMonth} />
        </div>
      </div>
    </section>
  )
}

export default AnimalHead
