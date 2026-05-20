import React from 'react'
import AnimalHead from '../../dashboard/animal/AnimalHead'
import AnimalDetail from '../../dashboard/animal/AnimalDetail'

const AnimalsPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#00633E]">Animals</h1>
        <p className="text-sm text-gray-500">Manage animals data and records</p>
      </div>

      <AnimalHead />
      <AnimalDetail />
    </div>
  )
}

export default AnimalsPage
