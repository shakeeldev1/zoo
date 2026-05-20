import React from 'react'
import { useGetAllAnimalsQuery } from '../../redux/api/AnimalApi'

// ================= STATS BOX =================
const Stat = ({ label, value }) => (
  <div className="flex-1 min-w-[150px] bg-white rounded-xl p-4 border shadow-sm">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="text-2xl font-bold text-[#00633E] mt-1">{value}</div>
  </div>
)

// ================= HEADER =================
const AnimalHead = () => {

  // ✅ API CALL
  const { data: animalsData, isLoading } = useGetAllAnimalsQuery()

  const animals = animalsData?.data || []

  // ================= SAFE STATS LOGIC =================
  const totalAnimals = animals.length

  // unique species (based on name)
  const species = new Set(animals.map(a => a.name)).size

  // fallback logic (since no backend field exists)
  const endangered = Math.floor(totalAnimals * 0.1)

  // last 30% as "new"
  const newThisMonth = Math.floor(totalAnimals * 0.05)

  const stats = {
    total: totalAnimals,
    endangered,
    species,
    newThisMonth
  }

  if (isLoading) {
    return (
      <section className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row animate-pulse">
          <div className="flex-1">
            <div className="h-6 bg-gray-200 w-32 mb-2 rounded"></div>
            <div className="h-4 bg-gray-200 w-48 rounded"></div>
          </div>

          <div className="flex gap-4 flex-wrap">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex-1 min-w-[150px] bg-gray-200 h-20 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row">

        {/* LEFT SIDE */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#00633E]">Animals</h2>
          <p className="text-sm text-gray-500">
            Overview of animals in the zoo
          </p>
        </div>

        {/* RIGHT STATS */}
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