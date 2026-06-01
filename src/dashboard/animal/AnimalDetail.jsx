import React, { useState, useEffect } from 'react'
import { useGetAllAnimalsQuery, useDeleteAnimalMutation, useUpdateAnimalMutation, useCreateAnimalMutation } from '../../redux/api/AnimalApi';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaEdit, FaTrashAlt, FaPlus, FaTimes, FaUpload, FaSpinner } from 'react-icons/fa'

const AnimalDetail = () => {
  // API Hooks
  const { data: animalsData, isLoading, refetch } = useGetAllAnimalsQuery()
  const [deleteAnimal, { isLoading: isDeleting }] = useDeleteAnimalMutation()
  const [updateAnimal, { isLoading: isUpdating }] = useUpdateAnimalMutation()
  const [createAnimal, { isLoading: isCreating }] = useCreateAnimalMutation()

  // State Management
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('add') // 'add' or 'edit'
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Get animals array from API response and limit to 4 for cards
  const animals = animalsData?.data || []
  const displayedAnimals = animals.slice(0, 4) // Only show first 4 in cards

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Open Add Modal
  const handleOpenAddModal = () => {
    setModalMode('add')
    setSelectedAnimal(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      quantity: '',
    })
    setImageFile(null)
    setImagePreview(null)
    setShowModal(true)
  }

  // Open Edit Modal
  const handleOpenEditModal = (animal) => {
    setModalMode('edit')
    setSelectedAnimal(animal)
    setFormData({
      name: animal.name || '',
      description: animal.description || '',
      price: animal.price || '',
      quantity: animal.quantity || '',
    })
    setImagePreview(animal.animalimage?.url || null)
    setImageFile(null)
    setShowModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedAnimal(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      quantity: '',
    })
    setImageFile(null)
    setImagePreview(null)
  }

  // Handle Submit (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.quantity) {
      toast.error('Please fill all fields')
      return
    }
    
    if (modalMode === 'add' && !imageFile) {
      toast.error('Please select an image')
      return
    }
    
    try {
      if (modalMode === 'add') {
        // Create FormData for file upload
        const submitData = new FormData()
        submitData.append('name', formData.name)
        submitData.append('description', formData.description)
        submitData.append('price', formData.price)
        submitData.append('quantity', formData.quantity)
        if (imageFile) {
          submitData.append('animalimage', imageFile)
        }
        
        await createAnimal(submitData).unwrap()
        toast.success('Animal added successfully! 🎉')
      } else {
        // Update - send as JSON, not FormData
        const updateData = {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        }
        
        // Only include image if a new one is selected
        if (imageFile) {
          const submitData = new FormData()
          submitData.append('name', formData.name)
          submitData.append('description', formData.description)
          submitData.append('price', formData.price)
          submitData.append('quantity', formData.quantity)
          submitData.append('animalimage', imageFile)
          
          await updateAnimal({ id: selectedAnimal._id, formData: submitData }).unwrap()
        } else {
          await updateAnimal({ id: selectedAnimal._id, data: updateData }).unwrap()
        }
        toast.success('Animal updated successfully! ✏️')
      }
      
      handleCloseModal()
      refetch()
    } catch (error) {
      console.error("Submit error:", error)
      toast.error(error?.data?.message || 'Operation failed. Please try again.')
    }
  }

  // Handle Delete
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteAnimal(id).unwrap()
        toast.success(`${name} deleted successfully`)
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to delete animal')
      }
    }
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="flex justify-between mb-6">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg shadow p-4 border">
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#00633E]">Animal Management</h2>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#00633E] text-white rounded-lg hover:bg-[#004d2e] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <FaPlus /> Add New Animal
        </button>
      </div>
      
      {/* Animal Cards Grid - Only showing 4 cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {displayedAnimals.map(animal => (
          <div key={animal._id} className="bg-white rounded-lg shadow p-3 border group hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              {animal.animalimage?.url ? (
                <img 
                  src={animal.animalimage.url} 
                  alt={animal.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#00633E]"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No img</span>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEditModal(animal)}
                  className="text-blue-500 hover:text-blue-700 transition-colors text-sm"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(animal._id, animal.name)}
                  disabled={isDeleting}
                  className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 text-sm"
                  title="Delete"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <div>
              <div className="text-base font-semibold text-[#00633E] truncate">{animal.name}</div>
              <div className="text-xs text-gray-500 mb-1 truncate">{animal.description?.substring(0, 40)}...</div>
              <div className="flex justify-between items-center text-xs">
                <div className="text-gray-600">Price: ${animal.price}</div>
                <div className="text-gray-600">Stock: {animal.quantity}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* View All Animals Link */}
      {animals.length > 4 && (
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            Showing 4 of {animals.length} animals. View all in the table below.
          </p>
        </div>
      )}

      {/* Animals Table - Shows all animals */}
      <section className="bg-white rounded-lg shadow p-4 border">
        <h3 className="text-lg font-semibold text-[#00633E] mb-3">All Animals ({animals.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-2 px-3">Image</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Stock</th>
                <th className="py-2 px-3">Actions</th>
               </tr>
            </thead>
            <tbody>
              {animals.map(animal => (
                <tr key={animal._id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3">
                    {animal.animalimage?.url ? (
                      <img src={animal.animalimage.url} alt={animal.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    )}
                  </td>
                  <td className="py-3 px-3 font-medium text-gray-800">{animal.name}</td>
                  <td className="py-3 px-3 text-sm text-gray-600 max-w-xs truncate">{animal.description}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">${animal.price}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{animal.quantity}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(animal)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(animal._id, animal.name)}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                   </td>
                </tr>
              ))}
              {animals.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No animals found. Click "Add New Animal" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add/Edit Modal - Made smaller */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={handleCloseModal} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#00633E]">
                  {modalMode === 'add' ? 'Add New Animal' : 'Edit Animal'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00633E] focus:border-transparent outline-none transition text-sm"
                    required
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00633E] focus:border-transparent outline-none transition resize-none text-sm"
                    required
                  />
                </div>
                
                {/* Price and Quantity Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00633E] focus:border-transparent outline-none transition text-sm"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00633E] focus:border-transparent outline-none transition text-sm"
                      required
                      min="0"
                    />
                  </div>
                </div>
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {modalMode === 'add' ? 'Image *' : 'Image (optional)'}
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-[#00633E] transition-colors">
                        <FaUpload className="mx-auto text-gray-400 mb-1 text-sm" />
                        <span className="text-xs text-gray-500">Click to upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    </label>
                    {imagePreview && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden border">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="w-full bg-gradient-to-r from-[#00633E] to-[#004d2e] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {(isCreating || isUpdating) ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" />
                      {modalMode === 'add' ? 'Creating...' : 'Updating...'}
                    </span>
                  ) : (
                    modalMode === 'add' ? 'Create Animal' : 'Update Animal'
                  )}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AnimalDetail