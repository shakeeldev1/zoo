import React from 'react'

const Stat = ({ label, value }) => (
  <div className="flex-1 min-w-[140px] bg-white rounded-xl p-4 border shadow-sm text-center">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="text-2xl font-bold text-[#00633E] mt-1">{value}</div>
  </div>
)

const ReviewHead = ({ stats = { total: 412, positive: 320, negative: 60, pending: 32 } }) => {
  return (
    <section className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#00633E]">Reviews</h2>
          <p className="text-sm text-gray-500">Overview of user feedback and ratings</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Stat label="Total Reviews" value={stats.total} />
          <Stat label="Positive" value={stats.positive} />
          <Stat label="Negative" value={stats.negative} />
          <Stat label="Pending" value={stats.pending} />
        </div>
      </div>
    </section>
  )
}

export default ReviewHead
