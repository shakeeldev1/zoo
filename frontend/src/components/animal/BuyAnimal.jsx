import React from "react";
import { FaShoppingCart, FaPaw } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { useGetAllAnimalsQuery } from "../../redux/api/AnimalApi";
import { useAddBuyAnimalMutation } from "../../redux/api/BuyAnimal";

function BuyAnimal() {

  // ================= GET ALL ANIMALS =================
  const {
    data,
    isLoading,
    isError,
  } = useGetAllAnimalsQuery();

  // ================= ADD TO CART =================
  const [
    addBuyAnimal,
    { isLoading: cartLoading }
  ] = useAddBuyAnimalMutation();

  // ================= REAL DATA =================
  const animals = data?.data || [];

  // ================= ADD TO CART HANDLER =================
  const handleAddToCart = async (animalId) => {

    try {

      const response = await addBuyAnimal(animalId).unwrap();

      toast.success(
        response?.message || "Animal added into cart"
      );

    } catch (error) {

      toast.error(
        error?.data?.message || "Failed to add animal"
      );
    }
  };

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7f6] to-[#eef5f1]">

        <div className="flex flex-col items-center gap-4">

          <div className="w-16 h-16 border-4 border-[#00633E] border-t-transparent rounded-full animate-spin"></div>

          <h1 className="text-2xl font-bold text-[#00633E]">
            Loading Animals...
          </h1>

        </div>

      </div>
    );
  }

  // ================= ERROR =================
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7f6] to-[#eef5f1]">

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-red-100 text-center">

          <h1 className="text-3xl font-bold text-red-500">
            Failed To Load Animals
          </h1>

          <p className="text-gray-500 mt-3">
            Something went wrong while fetching animals.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faf8] via-[#f2f7f4] to-[#edf5f0] py-20 px-5 md:px-10">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-20">

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00633E] shadow-2xl mb-6"
        >
          <FaPaw className="text-white text-3xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-[#00633E] tracking-tight"
        >
          Buy Premium Animals
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto leading-8"
        >
          Explore healthy, verified and premium quality animals from trusted sellers with secure buying experience.
        </motion.p>

      </div>

      {/* ================= GRID ================= */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {animals.map((animal, index) => (

          <motion.div
            key={animal._id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -12,
            }}
            className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-lg hover:shadow-[0_25px_60px_rgba(0,99,62,0.18)] transition-all duration-500"
          >

            {/* ================= IMAGE ================= */}
            <div className="relative h-60 overflow-hidden">

              <img
                src={
                  animal?.animalimage?.url ||
                  "https://via.placeholder.com/400x300"
                }
                alt={animal.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* STOCK */}
              <div className="absolute top-4 left-4 bg-[#F8BE00] text-[#00633E] px-4 py-2 rounded-full text-xs font-extrabold shadow-lg">
                {animal.quantity} Available
              </div>

              {/* PRICE */}
              <div className="absolute bottom-4 right-4 bg-[#00633E] text-white px-5 py-2 rounded-2xl text-sm font-bold shadow-2xl">
                Rs {animal.price}
              </div>

            </div>

            {/* ================= CONTENT ================= */}
            <div className="p-6">

              {/* TITLE */}
              <h2 className="text-2xl font-black text-[#00633E] group-hover:text-[#004d30] transition-all duration-300">
                {animal.name}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm mt-4 leading-7 line-clamp-3 min-h-[80px]">
                {animal.description}
              </p>

              {/* INFO BOXES */}
              <div className="flex gap-3 mt-6">

                <div className="flex-1 bg-[#f7f7f7] rounded-2xl px-4 py-3">
                  <p className="text-xs text-gray-500">
                    Stock
                  </p>

                  <h3 className="font-bold text-[#00633E] text-lg mt-1">
                    {animal.quantity}
                  </h3>
                </div>

                <div className="flex-1 bg-[#f7f7f7] rounded-2xl px-4 py-3">
                  <p className="text-xs text-gray-500">
                    Category
                  </p>

                  <h3 className="font-bold text-[#00633E] text-lg mt-1">
                    Premium
                  </h3>
                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleAddToCart(animal._id)}
                disabled={cartLoading}
                className="mt-7 w-full bg-[#00633E] hover:bg-[#004d30] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg hover:shadow-2xl disabled:opacity-70"
              >

                <FaShoppingCart className="text-lg" />

                {cartLoading
                  ? "Adding..."
                  : "Add To Cart"}

              </button>

            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
}

export default BuyAnimal;