import React from 'react'
import { Star, ThumbsUp, ThumbsDown, Clock } from 'lucide-react'
import { useGetAllReviewsQuery } from '../../redux/api/ReviwsApi'

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="flex-1 min-w-[140px] bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-xl shadow-md" style={{ backgroundColor: color }}>
        <Icon size={18} className="text-white" />
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
    <div className="text-3xl font-black text-[#00633E]">{value.toLocaleString()}</div>
  </div>
)

const ReviewHead = () => {
  const { data: reviewsData, isLoading } = useGetAllReviewsQuery()

  const reviews = reviewsData?.data || []

  const totalReviews = reviews.length
  const positiveReviews = reviews.filter(r => r.rating >= 4).length
  const negativeReviews = reviews.filter(r => r.rating <= 2).length

  if (isLoading) {
    return (
      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 min-w-[140px] bg-gray-200 rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-3 w-20"></div>
              <div className="h-8 bg-gray-300 rounded w-16"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-[#00633E]">Reviews</h2>
          <p className="text-sm text-gray-500 mt-1">User feedback and ratings management</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard label="Total Reviews" value={totalReviews} icon={Star} color="#00633E" />
        <StatCard label="Positive" value={positiveReviews} icon={ThumbsUp} color="#10B981" />
        <StatCard label="Negative" value={negativeReviews} icon={ThumbsDown} color="#EF4444" />
      </div>
    </section>
  )
}

export default ReviewHead
