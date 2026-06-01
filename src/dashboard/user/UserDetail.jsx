import React from 'react'
import { useGetAllUsersQuery, useDeleteUserMutation } from '../../redux/api/AuthApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaTrashAlt } from 'react-icons/fa'

const UserDetail = () => {
  // Fetch users from API
  const { data: usersData, isLoading, isError, refetch } = useGetAllUsersQuery()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  // Get users array from API response
  const users = usersData?.data || []

  // Handle delete user
  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await deleteUser(userId).unwrap()
        toast.success(`${userName} deleted successfully`)
        refetch() // Refresh the user list
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to delete user')
      }
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 border animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-4 border animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (isError) {
    return (
      <section>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">Failed to load users. Please try again later.</p>
          <button 
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Users Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {users.map(u => (
          <div key={u._id} className="bg-white rounded-lg shadow p-4 border group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">{u.role || 'User'}</div>
                <div className="text-lg font-semibold text-[#00633E]">{u.name}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-400">ID #{u._id?.slice(-6) || u.id}</div>
                {/* Delete Icon */}
                <button
                  onClick={() => handleDeleteUser(u._id, u.name)}
                  disabled={isDeleting}
                  className="text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-50"
                  title="Delete user"
                >
                  <FaTrashAlt className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table View */}
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
                <th className="py-2 px-3">Actions</th>
               </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-t">
                  <td className="py-3 px-3 text-sm text-gray-600">{u._id?.slice(-6) || u.id}</td>
                  <td className="py-3 px-3 font-medium text-gray-800">{u.name}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{u.email}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{u.role || 'User'}</td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => handleDeleteUser(u._id, u.name)}
                      disabled={isDeleting}
                      className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                      title="Delete user"
                    >
                      <FaTrashAlt className="text-sm" />
                    </button>
                  </td>
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