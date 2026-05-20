import React from 'react'

const UserHead = ({ stats = { total: 1248, admins: 4, active: 980 } }) => {
  return (
    <section className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#00633E]">Users</h2>
          <p className="text-sm text-gray-500">Manage users and permissions</p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white rounded-lg p-3 border shadow-sm text-center min-w-[120px]">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-lg font-bold text-[#00633E]">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg p-3 border shadow-sm text-center min-w-[120px]">
            <div className="text-sm text-gray-500">Admins</div>
            <div className="text-lg font-bold text-[#00633E]">{stats.admins}</div>
          </div>
          <div className="bg-white rounded-lg p-3 border shadow-sm text-center min-w-[120px]">
            <div className="text-sm text-gray-500">Active</div>
            <div className="text-lg font-bold text-[#00633E]">{stats.active}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserHead
