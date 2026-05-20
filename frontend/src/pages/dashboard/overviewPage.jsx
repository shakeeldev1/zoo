import React from 'react'
import OverviewHead from '../../dashboard/overview/OverviewHead'
import OverviewChart from '../../dashboard/overview/OverviewChart'

const OverviewPage = () => {
  return (
    <div className="max-w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#00633E]">Overview</h1>
        <p className="text-sm text-gray-500">Summary of recent activity and KPIs</p>
      </div>

      <OverviewHead />
      <OverviewChart />
    </div>
  )
}

export default OverviewPage
