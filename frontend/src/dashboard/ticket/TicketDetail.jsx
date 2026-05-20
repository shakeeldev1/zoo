import React, { useState } from 'react'

const initialTickets = [
  { id: 1, type: 'Adult', price: 20, availability: 'Available', status: 'Active' },
  { id: 2, type: 'Child', price: 12, availability: 'Available', status: 'Active' },
  { id: 3, type: 'Family', price: 55, availability: 'Limited', status: 'Active' }
]

const TicketDetail = () => {
  const [ticketTypes, setTicketTypes] = useState(initialTickets)
  const [form, setForm] = useState({ type: '', price: '', availability: 'Available', status: 'Active' })
  const [editingId, setEditingId] = useState(null)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanedPrice = Number(form.price)
    if (!form.type.trim() || Number.isNaN(cleanedPrice) || cleanedPrice <= 0) {
      return
    }

    if (editingId) {
      setTicketTypes(prev => prev.map(ticket => ticket.id === editingId ? { ...ticket, ...form, price: cleanedPrice } : ticket))
      setEditingId(null)
    } else {
      const nextId = Math.max(0, ...ticketTypes.map(ticket => ticket.id)) + 1
      setTicketTypes(prev => [...prev, { id: nextId, ...form, price: cleanedPrice }])
    }

    setForm({ type: '', price: '', availability: 'Available', status: 'Active' })
  }

  const handleEdit = (ticket) => {
    setEditingId(ticket.id)
    setForm({ type: ticket.type, price: ticket.price.toString(), availability: ticket.availability, status: ticket.status })
  }

  const handleDelete = (id) => {
    setTicketTypes(prev => prev.filter(ticket => ticket.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setForm({ type: '', price: '', availability: 'Available', status: 'Active' })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setForm({ type: '', price: '', availability: 'Available', status: 'Active' })
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#004f2f]">Ticket Catalog</h3>
          <p className="mt-2 text-sm text-gray-600">Manage ticket pricing, availability, and event categories.</p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ticketTypes.map(ticket => (
                  <tr key={ticket.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">#{ticket.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{ticket.type}</td>
                    <td className="py-3 px-4 text-gray-700">${ticket.price}</td>
                    <td className="py-3 px-4 text-gray-700">{ticket.availability}</td>
                    <td className="py-3 px-4 text-gray-700">{ticket.status}</td>
                    <td className="py-3 px-4 flex flex-wrap gap-2">
                      <button onClick={() => handleEdit(ticket)} className="rounded-full border border-[#00633E] px-3 py-1 text-sm font-medium text-[#00633E] transition hover:bg-[#00633E] hover:text-white">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(ticket.id)} className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-100">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-xl font-semibold text-[#004f2f]">{editingId ? 'Update Ticket' : 'Add Ticket'}</h3>
            <p className="text-sm text-gray-600">Use this form to create or edit ticket types quickly.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Ticket Type
            <input
              value={form.type}
              onChange={(event) => handleChange('type', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/10"
              placeholder="Adult, Child, Family"
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Price ($)
            <input
              type="number"
              value={form.price}
              onChange={(event) => handleChange('price', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/10"
              placeholder="20"
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Availability
            <select
              value={form.availability}
              onChange={(event) => handleChange('availability', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/10"
            >
              <option>Available</option>
              <option>Limited</option>
              <option>Sold Out</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Status
            <select
              value={form.status}
              onChange={(event) => handleChange('status', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/10"
            >
              <option>Active</option>
              <option>Paused</option>
              <option>Archived</option>
            </select>
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-2xl bg-[#00633E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004f2f]">
              {editingId ? 'Save Changes' : 'Add Ticket'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default TicketDetail
