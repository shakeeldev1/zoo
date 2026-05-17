import React from 'react'
import UserHead from '../../dashboard/user/UserHead'
import UserDetail from '../../dashboard/user/UserDetail'

const Users = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#00633E]">Users</h1>
        <p className="text-sm text-gray-500">Manage and review users</p>
      </div>

      <UserHead />
      <UserDetail />
    </div>
  )
}

export default Users