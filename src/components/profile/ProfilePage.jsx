import React, { useState, useEffect } from 'react'
import { User, Mail, Lock, Save, X, Trash2, AlertCircle, Shield, Calendar, FileText } from 'lucide-react'
import { useGetProfileQuery, useUpdateProfileMutation, useDeleteProfileMutation } from '../../redux/api/AuthApi'

const ProfilePage = () => {
  const { data: profileData, isLoading, error, refetch } = useGetProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation()

  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const user = profileData?.data || profileData

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrorMessage('')
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Name and email are required')
      return
    }

    const updateData = {
      name: formData.name,
      email: formData.email
    }

    if (formData.password) {
      updateData.password = formData.password
    }

    try {
      await updateProfile(updateData).unwrap()
      setSuccessMessage('Profile updated successfully!')
      const updatedUser = { ...user, name: formData.name, email: formData.email }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      refetch()
      setFormData(prev => ({ ...prev, password: '' }))
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setErrorMessage(err?.data?.message || 'Update failed. Please try again.')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure? This action cannot be undone!')) return
    try {
      await deleteProfile().unwrap()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    } catch (err) {
      setErrorMessage('Delete failed. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00633E]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-600 font-medium">Failed to load profile</p>
        <button onClick={() => refetch()} className="mt-3 px-4 py-2 bg-[#00633E] text-white rounded-lg">Retry</button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#00633E] flex items-center gap-3">
          <Shield size={32} />
          My Profile
        </h1>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Save size={18} className="text-green-600" />
          </div>
          <p className="text-green-700 font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-600" />
          <p className="text-red-700 font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User size={24} className="text-[#00633E]" />
              Profile Information
            </h2>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00633E] focus:border-transparent"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00633E] focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">New Password (optional)</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00633E] focus:border-transparent"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-2.5 border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-6 py-2.5 bg-[#00633E] text-white rounded-xl font-medium hover:bg-[#004f2f] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} />
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-[#00633E]" />
              Account Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">User ID</span>
                <span className="text-sm font-medium text-gray-800">{user?._id?.slice(-8) || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Role</span>
                <span className="text-sm font-medium text-[#00633E]">{user?.role || 'Administrator'}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#00633E] to-[#10B981] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-lg">{user?.name}</p>
                <p className="text-sm opacity-90">{user?.role || 'Administrator'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Calendar size={16} />
              <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={24} className="text-red-500" />
              <h3 className="text-xl font-bold text-gray-800">Confirm Deletion</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage