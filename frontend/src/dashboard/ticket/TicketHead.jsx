import React from 'react'

const StatCard = ({ label, value }) => (
  <div className="flex-1 min-w-[150px] rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="mt-3 text-3xl font-bold text-[#00633E]">{value}</div>
  </div>
)

const TicketHead = ({ summary = { sales: '$48.3K', sold: 4120, bookings: 128, events: 6 } }) => {
  return (
    <section className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#00633E]">Tickets</h2>
          <p className="text-sm text-gray-500">Overview of ticket sales, bookings, and active offers.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <StatCard label="Total Sales" value={summary.sales} />
          <StatCard label="Tickets Sold" value={summary.sold} />
          <StatCard label="Bookings" value={summary.bookings} />
          <StatCard label="Active Events" value={summary.events} />
        </div>
      </div>
    </section>
  )
}

export default TicketHead
