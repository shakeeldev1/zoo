import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import oxe from '../../assets/commonimages/oxe (7).jpeg'
const faqs = [
  {
    question: "What animals can I see at the zoo?",
    answer:
      "Our zoo is home to a wide variety of animals including lions, elephants, giraffes, pandas, monkeys, and exotic birds."
  },
  {
    question: "What are the zoo's opening hours?",
    answer:
      "The zoo is open daily from 9:00 AM to 6:00 PM, including weekends and public holidays."
  },
  {
    question: "Are there any discounts available?",
    answer:
      "Yes! We offer discounts for students, children under 12, senior citizens, and group bookings."
  },
  {
    question: "Can I bring outside food into the zoo?",
    answer:
      "Outside food is not allowed inside the zoo, but we have multiple food courts and cafes with family-friendly options."
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, we provide ample parking space with both standard and VIP parking options near the entrance."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white relative">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        
        <div className="mb-14 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-green-900 leading-snug">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - FAQ Content */}
          <div data-aos="fade-right">
            <div className="space-y-5">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border rounded-2xl bg-white shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full px-6 py-5 text-left text-lg font-semibold text-gray-800 focus:outline-none"
                  >
                    {faq.question}
                    <FaChevronDown
                      className={`text-green-600 transform transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      openIndex === index
                        ? "max-h-40 px-6 pb-5 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div
            className="relative w-full h-[500px] md:h-[700px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            data-aos="fade-left"
          >
            <img
              src={oxe}
              alt="Zoo Animals"
              className="w-full h-full object-cover transform hover:scale-110 transition duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
