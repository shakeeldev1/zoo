import React from 'react'
import ReviewHead from '../../dashboard/reviews/ReviewHead'
import ReviewDetail from '../../dashboard/reviews/ReviewDetail'

const ReviewsPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#00633E]">Reviews</h1>
        <p className="text-sm text-gray-500">Manage user reviews and feedback</p>
      </div>

      <ReviewHead />
      <ReviewDetail />
    </div>
  )
}

export default ReviewsPage
