import React from 'react'

const mockAnimals = [
  { id: 1, name: 'African Elephant', species: 'Loxodonta', status: 'Stable' },
  { id: 2, name: 'Blue Penguin', species: 'Eudyptula', status: 'Endangered' },
  { id: 3, name: 'Red Panda', species: 'Ailurus fulgens', status: 'Vulnerable' }
]

const AnimalCard = ({ a }) => (
  <div className="bg-white rounded-lg shadow p-4 border">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-lg font-semibold text-[#00633E]">{a.name}</div>
        <div className="text-sm text-gray-500">{a.species}</div>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm ${a.status === 'Endangered' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
        {a.status}
      </div>
    </div>
  </div>
)

const AnimalDetail = () => {
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mockAnimals.map(a => (
          <AnimalCard key={a.id} a={a} />
        ))}
      </section>

      <section className="bg-white rounded-lg shadow p-4 border">
        <h3 className="text-lg font-semibold text-[#00633E] mb-3">All Animals</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-gray-500">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Species</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAnimals.map(a => (
                <tr key={a.id} className="border-t">
                  <td className="py-3 px-3 text-sm text-gray-600">{a.id}</td>
                  <td className="py-3 px-3 font-medium text-gray-800">{a.name}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{a.species}</td>
                  <td className="py-3 px-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-sm ${a.status === 'Endangered' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{a.status}</span>
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

export default AnimalDetail
