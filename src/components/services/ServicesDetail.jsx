import React, { useMemo, useState } from "react";
import {
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaInfoCircle
} from "react-icons/fa";

import animal from '../../assets/commonimages/animal.jpeg'
import dear from '../../assets/commonimages/dear.jpeg'
import ostrich from '../../assets/commonimages/ostrich.jpeg'
import camle from '../../assets/commonimages/camle.jpeg'
import oxeo from '../../assets/commonimages/oxeo.jpeg'
import sheeps from '../../assets/commonimages/sheeps.jpeg'
import oxea from '../../assets/commonimages/oxea.jpeg'
import oxe14 from '../../assets/commonimages/oxe (14).jpeg'

// Dummy CartButtons (if not already defined)
const CartButtons = () => (
  <div className="flex gap-2">
    <button className="text-xs bg-[#085D2D] text-white px-2 py-1 rounded">Add</button>
    <button className="text-xs bg-gray-200 px-2 py-1 rounded">Buy</button>
  </div>
);

const ServicesDetail = () => {
  const commonimages = [
    {
      id: 1,
      name: "Camel",
      type: "Mammal",
      origin: "Desert Regions",
      price: 2500,
      image: camle,
      description: "Desert survivor known for endurance and strength.",
      des_long: `Habitat: Deserts
Diet: Herbivore
Special Feature: Stores fat in hump
Use: Transport & farming`
    },
    {
      id: 2,
      name: "Deer",
      type: "Mammal",
      origin: "Forests",
      price: 1800,
      image: dear,
      description: "Graceful and fast herbivore found in forests.",
      des_long: `Habitat: Forests
Diet: Herbivore
Behavior: Fast runner
Special: Antlers (males)`
    },
    {
      id: 3,
      name: "Ostrich",
      type: "Bird",
      origin: "Africa",
      price: 2200,
      image: ostrich,
      description: "World’s largest bird, cannot fly but runs fast.",
      des_long: `Habitat: Grasslands
Diet: Omnivore
Speed: Up to 70 km/h
Feature: Largest eggs`
    },
    {
      id: 4,
      name: "Dear",
      type: "Mammal",
      origin: "Farms",
      price: 1500,
      image: oxeo,
      description: "Strong farm animal used for plowing.",
      des_long: `Habitat: Farms
Diet: Herbivore
Use: Agriculture
Strength: High endurance`
    },
    {
      id: 5,
      name: "Sheep",
      type: "Mammal",
      origin: "Grasslands",
      price: 900,
      image: sheeps,
      description: "Soft wool-producing animal.",
      des_long: `Habitat: Farms
Diet: Herbivore
Use: Wool & meat
Behavior: Calm`
    },
    {
      id: 6,
      name: "Dear",
      type: "Mammal",
      origin: "Asia",
      price: 3000,
      image: oxea,
      description: "Strong animal used in farming and milk production.",
      des_long: `Habitat: Wetlands
Diet: Herbivore
Use: Milk & farming
Strength: Powerful`
    },
    {
      id: 7,
      name: "Dear",
      type: "Mammal",
      origin: "Mountains",
      price: 800,
      image: oxe14,
      description: "Agile climber, useful for milk and meat.",
      des_long: `Habitat: Mountains
Diet: Herbivore
Use: Milk & meat
Skill: Climbing`
    },
    {
      id: 8,
      name: "Wild Animal",
      type: "Mammal",
      origin: "Various",
      price: 2000,
      image: animal,
      description: "General wildlife species for display.",
      des_long: `Habitat: Mixed
Diet: Depends
Use: Exhibition
Note: Varies by species`
    }
  ];

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [selected, setSelected] = useState(null);

  const types = useMemo(() => ["All", ...new Set(commonimages.map(a => a.type))], []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = commonimages.filter(a =>
      (a.name.toLowerCase().includes(q) || a.origin.toLowerCase().includes(q)) &&
      (typeFilter === "All" || a.type === typeFilter)
    );

    if (sortOrder === "asc") list.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [commonimages, query, typeFilter, sortOrder]);

  const currency = (n) => `$${n}`;

  return (
    <section className="w-full min-h-screen py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Animal Collection</h1>

          <div className="flex gap-2">
            <input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <select onChange={(e) => setTypeFilter(e.target.value)} className="border px-2">
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
              <img src={item.image} className="h-52 w-full object-cover" />
              <div className="p-4">
                <h2 className="font-bold text-lg">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex justify-between mt-3">
                  <span>{currency(item.price)}</span>
                  <button onClick={() => setSelected(item)}>
                    <FaInfoCircle />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-white p-6 rounded max-w-lg w-full">
              <img src={selected.image} className="w-full h-60 object-cover mb-4" />
              <h2 className="text-xl font-bold">{selected.name}</h2>
              <p className="text-gray-600">{selected.description}</p>
              <pre className="text-sm mt-3 whitespace-pre-wrap">{selected.des_long}</pre>
              <button onClick={() => setSelected(null)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ServicesDetail;