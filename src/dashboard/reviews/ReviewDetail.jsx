import React from 'react'
import { Star, Trash2, MessageSquare, Calendar, Tag } from 'lucide-react'
import { useGetAllReviewsQuery, useDeleteReviewMutation } from '../../redux/api/ReviwsApi'

const ReviewCard = ({ review, onDelete }) => {
  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-[#F0B100] text-[#F0B100]" : "text-gray-300"}
        />
      ))}
    </div>
  )

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00633E] to-[#10B981] flex items-center justify-center text-white font-bold text-lg">
            {review.userId?.fullName?.charAt(0) || review.user?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {review.userId?.fullName || review.user || 'Anonymous'}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(review.rating || 0)}
              <span className="text-xs text-gray-500 ml-2">#{review._id?.slice(-6) || review.id}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          review.status === 'Published' 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
        }`}>
          {review.status || 'Pending'}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {review.reviewText || review.text || 'No review text available'}
      </p>
      
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(review.createdAt)}</span>
          </div>
          {review.ticketId && (
            <div className="flex items-center gap-1">
              <Tag size={14} />
              <span>Ticket: {review.ticketId?.ticketType || 'N/A'}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => onDelete(review._id || review.id)}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
          title="Delete Review"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

const ReviewDetail = () => {
  const { data: reviewsData, isLoading, error, refetch } = useGetAllReviewsQuery()
  const [deleteReview] = useDeleteReviewMutation()

  const reviews = reviewsData?.data || reviewsData || []

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(id).unwrap()
        refetch()
      } catch (err) {
        console.error('Failed to delete review:', err)
      }
    }
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : 0

  const publishedCount = reviews.filter(r => r.status === 'Published').length
  const pendingCount = reviews.filter(r => r.status !== 'Published').length

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
        <p className="text-red-600 font-medium">Failed to load reviews</p>
        <button 
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 bg-[#00633E] text-white rounded-lg hover:bg-[#004f2f] transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <ReviewCard 
            key={review._id || review.id} 
            review={review} 
            onDelete={handleDelete} 
          />
        ))}
      </section>

      {reviews.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No reviews found</p>
        </div>
      )}

      <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h3 className="text-xl font-bold text-[#00633E] flex items-center gap-2">
            <MessageSquare size={24} />
            All Reviews
          </h3>
          <div className="flex items-center gap-4 mt-3">
            <div className="text-sm">
              <span className="text-gray-500">Average Rating:</span>
              <span className="font-bold text-[#F0B100] ml-1">{averageRating}/5</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Published:</span>
              <span className="font-bold text-green-600 ml-1">{publishedCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Pending:</span>
              <span className="font-bold text-yellow-600 ml-1">{pendingCount}</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-600 uppercase tracking-wider">
                <th className="py-4 px-4">ID</th>
                <th className="py-4 px-4">User</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-4">Review</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((review) => (
                <tr key={review._id || review.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-700">
                    #{review._id?.slice(-6) || review.id}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#00633E] flex items-center justify-center text-white text-xs font-bold">
                        {review.userId?.fullName?.charAt(0) || review.user?.charAt(0) || 'U'}
                      </div>
                      <span className="font-medium text-gray-800">
                        {review.userId?.fullName || review.user || 'Anonymous'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < (review.rating || 0) ? "fill-[#F0B100] text-[#F0B100]" : "text-gray-300"}
                        />
                      ))}
                      <span className="ml-1 text-sm font-semibold text-gray-600">
                        {review.rating || 0}/5
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 max-w-xs truncate">
                    {review.reviewText || review.text || 'No review text'}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(review.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      review.status === 'Published' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}>
                      {review.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleDelete(review._id || review.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default ReviewDetail