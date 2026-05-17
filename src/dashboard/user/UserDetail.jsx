import React from 'react'

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Member' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Member' },
  { id: 3, name: 'Cathy Brown', email: 'cathy@example.com', role: 'Admin' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Member' }
]

const UserDetail = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {mockUsers.map(u => (
          <div key={u.id} className="bg-white rounded-lg shadow p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">{u.role}</div>
                <div className="text-lg font-semibold text-[#00633E]">{u.name}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </div>
              <div className="text-sm text-gray-400">ID #{u.id}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4 border">
        <h3 className="text-lg font-semibold text-[#00633E] mb-3">All Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-gray-500">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="py-3 px-3 text-sm text-gray-600">{u.id}</td>
                  <td className="py-3 px-3 font-medium text-gray-800">{u.name}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{u.email}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default UserDetail
