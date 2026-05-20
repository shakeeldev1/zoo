import React from 'react'

const mockReviews = [
  { id: 1, user: 'Alice', rating: 5, text: 'Amazing visit!', status: 'Published' },
  { id: 2, user: 'Bob', rating: 4, text: 'Great experience', status: 'Published' },
  { id: 3, user: 'Cathy', rating: 2, text: 'Not many animals visible', status: 'Pending' }
]

const ReviewCard = ({ r }) => (
  <div className="bg-white rounded-lg shadow p-4 border">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-[#F0B100] flex items-center justify-center text-[#004f2f] font-bold">{r.rating}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-[#00633E]">{r.user}</div>
          <div className="text-sm text-gray-400">#{r.id}</div>
        </div>
        <div className="text-sm text-gray-700 mt-1">{r.text}</div>
        <div className="mt-2">
          <span className={`px-2 py-1 rounded-full text-sm ${r.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {r.status}
          </span>
        </div>
      </div>
    </div>
  </div>
)

const ReviewDetail = () => {
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mockReviews.map(r => <ReviewCard key={r.id} r={r} />)}
      </section>

      <section className="bg-white rounded-lg shadow p-4 border">
        <h3 className="text-lg font-semibold text-[#00633E] mb-3">All Reviews</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-gray-500">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">User</th>
                <th className="py-2 px-3">Rating</th>
                <th className="py-2 px-3">Review</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockReviews.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="py-3 px-3 text-sm text-gray-600">{r.id}</td>
                  <td className="py-3 px-3 font-medium text-gray-800">{r.user}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{r.rating}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{r.text}</td>
                  <td className="py-3 px-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-sm ${r.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
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
