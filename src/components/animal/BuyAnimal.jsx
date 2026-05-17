import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/CartSlice";

function BuyAnimal() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (animal) => {
    const existing = cartItems.find((item) => item.id === animal.id);
    if (existing && existing.cartQuantity >= animal.quantity) {
      toast.error("No more quantity available");
      return;
    }

    dispatch(addToCart(animal));
    toast.success("Added to cart");
  };

  const animals = [
    {
      id: 1,
      name: "Sahiwal Cow",
      description: "Healthy and premium quality Sahiwal cow with excellent milk production.",
      price: 250000,
      quantity: 5,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "White Goat",
      description: "Beautiful healthy goat perfect for farming and breeding purposes.",
      price: 85000,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Brown Horse",
      description: "Strong and energetic horse trained for riding and racing activities.",
      price: 450000,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Farm Sheep",
      description: "Premium healthy sheep with soft wool and strong body condition.",
      price: 65000,
      quantity: 8,
      image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7f6] to-[#eef5f1] py-20 px-6">
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-extrabold text-[#00633E]"
        >
          Buy Premium Animals
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto leading-8"
        >
          Explore our verified collection of healthy and premium animals. Trusted sellers, secure deals, and high-quality breeds all in one place.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {animals.map((animal, index) => (
          <motion.div
            key={animal.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.02 }}
            className="group bg-white rounded-[35px] overflow-hidden shadow-xl hover:shadow-[0_25px_60px_rgba(0,99,62,0.25)] transition-all duration-500 border border-gray-100"
          >
            <div className="relative overflow-hidden">
              <img
                src={animal.image}
                alt={animal.name}
                className="h-[280px] w-full object-cover group-hover:scale-110 transition-all duration-700"
              />

              <div className="absolute top-4 left-4 bg-[#F8BE00] text-[#00633E] px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-md">
                {animal.quantity} Available
              </div>

              <div className="absolute bottom-4 right-4 bg-[#00633E] text-white px-5 py-2 rounded-xl shadow-2xl font-bold text-lg">
                Rs {animal.price.toLocaleString()}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-extrabold text-[#00633E] group-hover:text-[#004d30] transition-all duration-300">
                {animal.name}
              </h2>

              <p className="text-gray-600 leading-7 mt-4 text-sm min-h-[90px]">
                {animal.description}
              </p>

              <div className="flex items-center justify-between mt-6 gap-3">
                <div className="bg-[#f4f4f4] px-4 py-3 rounded-2xl flex-1">
                  <p className="text-gray-500 text-sm">Category</p>
                  <h3 className="font-bold text-[#00633E] mt-1">Premium</h3>
                </div>
                <div className="bg-[#f4f4f4] px-4 py-3 rounded-2xl flex-1">
                  <p className="text-gray-500 text-sm">Quantity</p>
                  <h3 className="font-bold text-[#00633E] mt-1">{animal.quantity}</h3>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(animal)}
                className="mt-7 w-full bg-[#00633E] hover:bg-[#004d30] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <FaShoppingCart className="text-xl" />
                Add To Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BuyAnimal;