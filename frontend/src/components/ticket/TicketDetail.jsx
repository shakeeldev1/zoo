// ==============================
// FILE: TicketDetail.jsx
// ==============================

import React, {
  useMemo,
  useState,
} from "react";

import {
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
  FaTicketAlt,
  FaFilter,
  FaArrowRight,
  FaBoxes,
  FaSpinner,
} from "react-icons/fa";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  useGetTicketsQuery,
} from "../../redux/api/TicketApi";

import {
  useCreateBuyTicketMutation,
} from "../../redux/api/BuyTicket";

const TicketDetail = () => {

  // ================= API =================
  const {
    data,
    isLoading,
    isError,
  } = useGetTicketsQuery();

  // ================= BUY API =================
  const [
    createBuyTicket,
    { isLoading: buyLoading },
  ] = useCreateBuyTicketMutation();

  // ================= STATES =================
  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  // ================= DATA =================
  const tickets = data?.data || [];

  // ================= UNIQUE CATEGORIES =================
  const categories = useMemo(() => {

    const allCategories =
      tickets.map(
        (ticket) =>
          ticket.category || "General"
      );

    return [
      "All",
      ...new Set(allCategories),
    ];

  }, [tickets]);

  // ================= FILTERED TICKETS =================
  const filteredTickets =
    tickets.filter((ticket) => {

      const matchesSearch =
        ticket?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        filter === "All"
          ? true
          : (ticket.category ||
              "General") === filter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  // ================= HANDLE BUY =================
  const handleBuyTicket =
    async (ticket) => {

      try {

        // ================= TOKEN =================
        const token =
          localStorage.getItem("token");

        // ================= LOGIN CHECK =================
        if (!token) {

          toast.error(
            "Unauthorized! Please login first.",
            {
              position: "top-right",
            }
          );

          return;
        }

        // ================= STOCK CHECK =================
        if (
          ticket.ticketQty <= 0
        ) {

          toast.warning(
            "Ticket is sold out",
            {
              position: "top-right",
            }
          );

          return;
        }

        // ================= FORM DATA =================
        const formData = {
          ticketQty: 1,
        };

        // ================= API CALL =================
        const response =
          await createBuyTicket({
            ticketId: ticket._id,
            formData,
          }).unwrap();

        // ================= SUCCESS =================
        toast.success(
          response?.message ||
            "Ticket booked successfully",
          {
            position: "top-right",
          }
        );

      } catch (error) {

        console.log(error);

        // ================= UNAUTHORIZED =================
        if (
          error?.status === 401
        ) {

          toast.error(
            "Unauthorized! Please login first.",
            {
              position: "top-right",
            }
          );

        } else {

          toast.error(
            error?.data?.message ||
              "Failed to book ticket",
            {
              position: "top-right",
            }
          );
        }
      }
    };

  return (
    <>
      {/* ================= TOAST ================= */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />

      <div className="min-h-screen pt-24 pb-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ================= HERO ================= */}
          <div className="mb-12 text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFDA00]/30 bg-[#FFDA00]/10 px-5 py-2 text-xs font-bold tracking-wide text-[#FFDA00] backdrop-blur-xl">

              <FaTicketAlt />

              PREMIUM WILDLIFE TICKETS

            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-white lg:text-5xl">

              Explore Amazing

              <span className="block text-[#FFDA00]">
                Wildlife Experiences
              </span>

            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#074E3B] sm:text-base">

              Book premium safari experiences,
              zoo adventures, and luxury wildlife
              access with secure booking.

            </p>
          </div>

          {/* ================= SEARCH + FILTER ================= */}
          <div className="mb-10 flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFDA00]" />

              <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="h-13 w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 focus:border-[#FFDA00]/40"
              />
            </div>

            {/* FILTER */}
            <div className="flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-2 rounded-2xl bg-[#FFDA00] px-4 py-3 text-sm font-bold text-[#074F3B] shadow-lg">

                <FaFilter />

                Filter

              </div>

              {categories.map(
                (item, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setFilter(item)
                    }
                    className={`rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300
                    ${
                      filter === item
                        ? "bg-[#FFDA00] text-[#074F3B] shadow-lg"
                        : "border border-white/10 bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {/* ================= LOADING ================= */}
          {isLoading && (

            <div className="flex flex-col items-center justify-center py-32">

              <div className="h-14 w-14 rounded-full border-4 border-[#FFDA00] border-t-transparent animate-spin"></div>

              <p className="mt-5 text-lg font-bold text-white">
                Loading Premium Tickets...
              </p>

            </div>
          )}

          {/* ================= ERROR ================= */}
          {isError && (

            <div className="flex flex-col items-center justify-center py-32 text-center">

              <div className="rounded-full bg-red-500/20 p-6 text-4xl text-red-500">

                <FaTicketAlt />

              </div>

              <h2 className="mt-5 text-3xl font-black text-white">
                Failed To Load Tickets
              </h2>

            </div>
          )}

          {/* ================= TICKETS ================= */}
          {!isLoading &&
            !isError && (

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {filteredTickets.map(
                  (ticket) => (

                    <div
                      key={ticket._id}
                      className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#074E3B] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#FFDA00]/40"
                    >

                      {/* IMAGE */}
                      <div className="relative overflow-hidden">

                        <img
                          src={
                            ticket?.ticketimage
                              ?.url ||
                            "https://via.placeholder.com/500"
                          }
                          alt={
                            ticket.name
                          }
                          className="h-[220px] w-full object-cover transition-all duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#074E3B] via-transparent to-transparent"></div>

                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#FFDA00] px-3 py-1 text-[11px] font-black text-[#074F3B] shadow-lg">

                          <FaTicketAlt />

                          {ticket.category ||
                            "Premium"}

                        </div>

                        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-xl">

                          <FaStar className="text-[#FFDA00]" />

                          4.9

                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="p-5">

                        <h2 className="text-2xl font-black text-white transition-all duration-300 group-hover:text-[#FFDA00]">

                          {ticket.name}

                        </h2>

                        {/* INFO */}
                        <div className="mt-5 flex items-center justify-between">

                          {/* LOCATION */}
                          <div className="flex items-center gap-3">

                            <div className="rounded-xl bg-[#FFDA00] p-2 text-[#074F3B]">

                              <FaMapMarkerAlt />

                            </div>

                            <div>

                              <p className="text-[11px] text-gray-400">
                                Location
                              </p>

                              <h3 className="text-sm font-semibold text-white">
                                Safari Park
                              </h3>

                            </div>
                          </div>

                          {/* QUANTITY */}
                          <div className="flex items-center gap-3">

                            <div className="rounded-xl bg-emerald-500 p-2 text-white">

                              <FaBoxes />

                            </div>

                            <div>

                              <p className="text-[11px] text-gray-400">
                                Available
                              </p>

                              <h3 className="text-sm font-semibold text-white">
                                {ticket.ticketQty}
                              </h3>

                            </div>
                          </div>
                        </div>

                        {/* PRICE + BUTTON */}
                        <div className="mt-6 flex items-center justify-between">

                          <div>

                            <p className="text-xs text-gray-400">
                              Price
                            </p>

                            <h2 className="text-3xl font-black text-[#FFDA00]">

                              Rs {ticket.price}

                            </h2>

                          </div>

                          <button
                            onClick={() =>
                              handleBuyTicket(
                                ticket
                              )
                            }
                            disabled={
                              buyLoading ||
                              ticket.ticketQty <= 0
                            }
                            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FFDA00] to-yellow-400 px-5 py-3 text-sm font-black text-[#074F3B] transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
                          >

                            {buyLoading ? (
                              <>
                                <FaSpinner className="animate-spin text-xs" />
                                Processing
                              </>
                            ) : ticket.ticketQty <= 0 ? (
                              "Sold Out"
                            ) : (
                              <>
                                Buy
                                <FaArrowRight className="text-xs" />
                              </>
                            )}

                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default TicketDetail;