// File: MissionVision.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Shield, Target, Eye, Heart, Ticket, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Model from "../common/Model";
import { useState } from "react";
import missionimg from '../../assets/About/lion.jpeg'
function MissionVision() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false)
  const MotionLink = motion(Link);

  const coreValues = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Conservation First",
      desc: "We safeguard endangered species through research and habitat restoration.",
      iconGradient: "from-green-900 to-[#fdc500]",
      iconHoverGradient: "from-[#fdc500] to-green-900",
      cardHoverGradient: "from-green-900 to-[#fdc500]",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Education & Community",
      desc: "Hands-on learning, school programs, and inclusive experiences for all ages.",
      iconGradient: "from-[#fdc500] to-green-900",
      iconHoverGradient: "from-green-900 to-[#fdc500]",
      cardHoverGradient: "from-[#fdc500] to-green-900",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Ethical Care",
      desc: "World-class veterinary care and welfare standards lead everything we do.",
      iconGradient: "from-green-900 to-[#fdc500]",
      iconHoverGradient: "from-[#fdc500] to-green-900",
      cardHoverGradient: "from-green-900 to-[#fdc500]",
    },
  ];

  const missionVisionCards = [
    {
      title: "Our Mission",
      desc: "To protect endangered species, advance scientific research, and inspire communities to actively participate in conservation efforts through education and engaging experiences.",
      icon: <Target className="w-8 h-8" />,
      iconGradient: "from-green-900 to-[#fdc500]",
      iconHoverGradient: "from-[#fdc500] to-green-900",
      cardHoverGradient: "from-green-900 to-[#fdc500]",
    },
    {
      title: "Our Vision",
      desc: "A world where wildlife thrives in healthy habitats, and people live in harmony with nature, valuing biodiversity as essential to our collective future.",
      icon: <Eye className="w-8 h-8" />,
      iconGradient: "from-[#fdc500] to-green-900",
      iconHoverGradient: "from-green-900 to-[#fdc500]",
      cardHoverGradient: "from-[#fdc500] to-green-900",
    },
  ];

  // Animation variants for framer-motion
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
      scale: 0.95
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const iconVariants = {
    normal: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const fadeInZoom = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16" 
          data-aos="fade-up"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our <span className="bg-gradient-to-r from-green-900 to-[#fdc500] bg-clip-text text-transparent">Mission</span> & <span className="bg-gradient-to-r from-[#fdc500] to-green-900 bg-clip-text text-transparent">Vision</span>
          </motion.h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
            Dedicated to wildlife conservation, education, and ethical animal
            care for a sustainable future.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {missionVisionCards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.4 }}
              data-aos={i === 0 ? "fade-right" : "fade-left"}
              className={`relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden transition-all duration-500 group`}
            >
              {/* Enhanced gradient overlay with subtle color effects */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${card.cardHoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}
                whileHover={{
                  background: `linear-gradient(45deg, var(--tw-gradient-stops))`,
                  transition: { duration: 0.7 }
                }}
              />
              
              {/* Subtle light overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5" />
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <motion.div
                    variants={iconVariants}
                    initial="normal"
                    whileHover="hover"
                    className={`inline-flex text-white items-center justify-center rounded-xl p-3 mr-4 bg-gradient-to-r ${card.iconGradient} group-hover:bg-gradient-to-r ${card.iconHoverGradient}`}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-500">
                    {card.title}
                  </h3>
                </div>
                <p className="text-slate-700 group-hover:text-white transition-colors duration-500">
                  {card.desc}
                </p>
              </div>
              
              {/* Shine effect on hover */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <motion.div 
          className="text-center mb-12" 
          data-aos="fade-up"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Our <span className="bg-gradient-to-r from-green-900 to-[#fdc500] bg-clip-text text-transparent">Core Values</span>
          </h3>
          <p className="text-slate-600 max-w-3xl mx-auto">
            These principles guide everything we do at Wildlife Sanctuary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1 }}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className={`relative rounded-2xl bg-white shadow-lg p-8 overflow-hidden group`}
            >
              {/* Enhanced gradient overlay with subtle color effects */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${card.cardHoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}
                whileHover={{
                  background: `linear-gradient(45deg, var(--tw-gradient-stops))`,
                  transition: { duration: 0.7 }
                }}
              />
              
              {/* Subtle light overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5" />
              
              <div className="relative z-10">
                <motion.div
                  variants={iconVariants}
                  initial="normal"
                  whileHover="hover"
                  className={`inline-flex text-white items-center justify-center rounded-2xl p-4 mb-6 bg-gradient-to-r ${card.iconGradient} group-hover:bg-gradient-to-r ${card.iconHoverGradient}`}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors duration-500">
                  {card.title}
                </h3>
                <p className="text-slate-600 group-hover:text-white transition-colors duration-500">
                  {card.desc}
                </p>
              </div>
              
              {/* Shine effect on hover */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInZoom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-16 rounded-2xl p-10 text-center text-white relative overflow-hidden group"
          style={{
            background:
            `url(${missionimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Enhanced gradient with subtle color effects */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-700/70 to-[#fdc500]/80 group-hover:from-green-900/90 group-hover:via-green-800/80 group-hover:to-[#fdc500]/60 transition-all duration-700"
            whileHover={{
              background: "linear-gradient(45deg, rgba(1, 50, 32, 0.9), rgba(1, 50, 32, 0.8), rgba(253, 197, 0, 0.6))",
              transition: { duration: 0.8 }
            }}
          />
          
          {/* Subtle light effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <motion.div 
            className="relative z-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Heart className="w-12 h-12 mx-auto mb-6 text-white" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Join Our Conservation Efforts
            </h3>
            <p className="text-white/90 text-lg mb-6">
              Your support helps us continue our vital work in animal care,
              conservation, and education.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <MotionLink
              to="/services"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-green-900 to-[#fdc500] text-white font-semibold rounded-xl hover:from-[#fdc500] hover:to-green-900 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Heart className="w-5 h-5" /> Adopt an Animal
              </MotionLink>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>setIsOpen(true)}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Ticket className="w-5 h-5" /> Buy Tickets
              </motion.button>
            </div>
          </motion.div>
          
          {/* Floating sparkles for added effect */}
          <motion.div 
            className="absolute top-4 right-4 text-white/30"
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles size={24} />
          </motion.div>
          <motion.div 
            className="absolute bottom-4 left-4 text-white/30"
            animate={{ 
              rotate: -360,
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
    <Model isOpen={isOpen} onClose={()=>setIsOpen(false)
    }/>
    </>
  );
}

export default MissionVision;