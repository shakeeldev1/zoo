import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useCreateReviewMutation, useGetAllReviewsQuery } from '../../redux/api/ReviwsApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaStar, FaUser } from 'react-icons/fa'

const TestimonialSwiper = () => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [hoveredStar, setHoveredStar] = useState(0)

  // Fetch reviews from API
  const { data: reviewsData, isLoading, refetch } = useGetAllReviewsQuery()
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation()

  // Get reviews array from API response
  const reviews = reviewsData?.data || reviewsData || []

  // Handle submit review
 const handleSubmitReview = async (e) => {
  e.preventDefault()
  
  if (!comment.trim()) {
    toast.error('Please write a review before submitting')
    return
  }

  if (comment.length < 10) {
    toast.error('Review must be at least 10 characters long')
    return
  }

  try {
    // REMOVE the userId field - backend will get it from token
    await createReview({ 
      rating, 
      comment: comment.trim()
      // DON'T send userId here
    }).unwrap()
    
    toast.success('Thank you for your review! 🎉')
    setComment('')
    setRating(5)
    refetch()
    
  } catch (error) {
    toast.error(error?.data?.message || 'Failed to submit review. Please try again.')
  }
}

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <div className='w-full bg-gradient-to-br from-green-900 via-green-900 to-[#fdc500] pt-16 pb-12'>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center lg:text-left'>
          <span
            className='inline-block text-lg font-semibold tracking-wider 
              text-green-800 uppercase bg-green-100 px-4 py-2 rounded-full mb-3 shadow-inner'
          >
            Testimonials
          </span>
        </div>

        <h2
          className='text-4xl font-bold text-white mb-3 tracking-tight text-center lg:text-left'
          data-aos='fade-up'
        >
          What Our Visitors Say
        </h2>

        {/* Two Column Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
          
          {/* LEFT SIDE - Reviews Swiper */}
          <div className='w-full'>
            <div
              className='rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] overflow-hidden bg-white h-full'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              {isLoading ? (
                <div className='p-8 text-center'>
                  <div className='animate-pulse'>
                    <div className='w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4'></div>
                    <div className='h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2'></div>
                    <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto'></div>
                  </div>
                </div>
              ) : reviews.length === 0 ? (
                <div className='p-8 text-center text-gray-500'>
                  <p>No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <Swiper
                  modules={[Pagination, Autoplay]}
                  pagination={{ el: '.custom-pagination', clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop={true}
                  spaceBetween={30}
                >
                  {reviews.map((item, index) => (
                    <SwiperSlide key={item._id || index}>
                      <div className='p-8 flex flex-col md:flex-row items-center md:items-start gap-6'>
                        {/* Profile Image */}
                        <div className='flex-shrink-0 relative'>
                          <div className='w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-green-900 flex items-center justify-center bg-green-50'>
                            {item.userId?.image ? (
                              <img
                                src={item.userId.image}
                                alt={item.userId?.name || 'User'}
                                className='w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-md transition-transform duration-300 ease-in-out hover:scale-105'
                              />
                            ) : (
                              <FaUser className='w-16 h-16 text-green-700' />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className='flex-1 text-center md:text-left'>
                          {/* Stars */}
                          <div className='flex justify-center md:justify-start mb-3 gap-1'>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-5 h-5 transition-colors duration-300 ${
                                  i < (item.rating || 5)
                                    ? 'text-[#fdc500]'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>

                          {/* Testimonial Text */}
                          <p className='text-gray-700 italic leading-relaxed mb-4 max-w-xl mx-auto md:mx-0'>
                            "{item.comment || item.text}"
                          </p>

                          {/* Name & Role */}
                          <h4 className='font-semibold text-green-900 text-lg'>
                            {item.userId?.name || item.name || 'Anonymous Visitor'}
                          </h4>
                          <p className='text-sm text-green-700'>
                            {item.userId?.role || item.role || 'Visitor'}
                          </p>
                          {item.createdAt && (
                            <p className='text-xs text-gray-400 mt-2'>
                              {formatDate(item.createdAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* Custom Pagination */}
              <div className='custom-pagination flex justify-center gap-2 pb-6'>
                <style jsx>{`
                  .custom-pagination .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    background-color: #14532d;
                    opacity: 0.6;
                    transition: all 0.3s ease;
                    border-radius: 50%;
                    display: inline-block;
                    margin: 0 4px;
                    cursor: pointer;
                  }
                  .custom-pagination .swiper-pagination-bullet-active {
                    background-color: #fdc500;
                    transform: scale(1.2);
                    opacity: 1;
                  }
                `}</style>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Review Form */}
          <div
            className='bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-8 h-full'
            data-aos='fade-up'
            data-aos-delay='400'
          >
            <h3 className='text-2xl font-bold text-green-900 mb-4 text-center'>
              Share Your Experience
            </h3>
            <p className='text-gray-600 text-center mb-6'>
              Tell us about your visit to our zoo
            </p>

            <form onSubmit={handleSubmitReview} className='space-y-6'>
              {/* Rating Stars */}
              <div>
                <label className='block text-gray-700 font-semibold mb-2'>
                  Your Rating
                </label>
                <div className='flex gap-2 justify-center lg:justify-start'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type='button'
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className='focus:outline-none transition-transform hover:scale-110'
                    >
                      <FaStar
                        className={`w-8 h-8 transition-colors duration-200 ${
                          star <= (hoveredStar || rating)
                            ? 'text-[#fdc500]'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className='block text-gray-700 font-semibold mb-2'>
                  Your Review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows='4'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none'
                  placeholder='Write your amazing experience here...'
                  maxLength='500'
                />
                <div className='text-right text-xs text-gray-400 mt-1'>
                  {comment.length}/500 characters
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg'
              >
                {isSubmitting ? (
                  <span className='flex items-center justify-center gap-2'>
                    <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </button>

              {/* Note */}
              <p className='text-xs text-gray-400 text-center mt-4'>
                Your review will help other visitors plan their trip
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSwiper