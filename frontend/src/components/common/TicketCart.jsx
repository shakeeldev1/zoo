// ==============================
// FILE: TicketCart.jsx
// ==============================

import React from "react";

import {
  FaTimes,
  FaTrash,
  FaTicketAlt,
  FaMinus,
  FaPlus,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  useGetBuyTicketsQuery,
  useDeleteBuyTicketMutation,
  useIncreaseBuyTicketQuantityMutation,
  useDecreaseBuyTicketQuantityMutation,
} from "../../redux/api/BuyTicket";

function TicketCart({ close }) {

  // ================= API =================
  const {
    data,
    isLoading,
    refetch,
  } = useGetBuyTicketsQuery();

  const [
    deleteBuyTicket,
  ] = useDeleteBuyTicketMutation();

  const [
    increaseBuyTicketQuantity,
  ] =
    useIncreaseBuyTicketQuantityMutation();

  const [
    decreaseBuyTicketQuantity,
  ] =
    useDecreaseBuyTicketQuantityMutation();

  // ================= DATA =================
  const tickets =
    data?.data || [];

  // ================= TOTAL =================
  const total =
    tickets.reduce(
      (acc, item) =>
        acc +
        item.ticketQty *
          item.ticketId?.price,
      0
    );

  // ================= DELETE =================
  const handleDelete =
    async (id) => {

      try {

        const response =
          await deleteBuyTicket(
            id
          ).unwrap();

        toast.success(
          response?.message
        );

        refetch();

      } catch (error) {

        toast.error(
          error?.data?.message ||
            "Delete failed"
        );
      }
    };

  // ================= INCREASE =================
  const handleIncrease =
    async (item) => {

      try {

        // ================= AVAILABLE =================
        const availableQty =
          item.ticketId
            ?.ticketQty;

        // ================= LIMIT CHECK =================
        if (
          availableQty <= 0
        ) {

          toast.warning(
            "You reached ticket limit"
          );

          return;
        }

        const response =
          await increaseBuyTicketQuantity(
            {
              id: item._id,
              quantity: 1,
            }
          ).unwrap();

        toast.success(
          response?.message
        );

        refetch();

      } catch (error) {

        toast.error(
          error?.data?.message ||
            "Failed to increase"
        );
      }
    };

  // ================= DECREASE =================
  const handleDecrease =
    async (item) => {

      try {

        if (
          item.ticketQty <= 1
        ) {

          toast.warning(
            "Minimum quantity is 1"
          );

          return;
        }

        const response =
          await decreaseBuyTicketQuantity(
            {
              id: item._id,
              quantity: 1,
            }
          ).unwrap();

        toast.success(
          response?.message
        );

        refetch();

      } catch (error) {

        toast.error(
          error?.data?.message ||
            "Failed to decrease"
        );
      }
    };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />

      <div className="fixed inset-0 z-50 flex justify-end">

        {/* OVERLAY */}
        <div
          onClick={close}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        ></div>

        {/* CART */}
        <div className="relative h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl">

          {/* HEADER */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-[#00633E] p-3 text-white">

                <FaTicketAlt />

              </div>

              <div>

                <h2 className="text-2xl font-black text-[#00633E]">
                  Ticket Cart
                </h2>

                <p className="text-sm text-gray-500">
                  {tickets.length} Items
                </p>

              </div>
            </div>

            <button
              onClick={close}
              className="rounded-full bg-red-100 p-3 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          {/* BODY */}
          <div className="space-y-5 p-5">

            {isLoading ? (

              <div className="flex items-center justify-center py-32">

                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00633E] border-t-transparent"></div>

              </div>

            ) : tickets.length ===
              0 ? (

              <div className="flex flex-col items-center justify-center py-32 text-center">

                <div className="rounded-full bg-[#00633E]/10 p-6 text-[#00633E]">

                  <FaTicketAlt size={45} />

                </div>

                <h2 className="mt-5 text-3xl font-black text-[#00633E]">
                  Cart Empty
                </h2>

              </div>

            ) : (

              tickets.map(
                (item) => (

                  <div
                    key={item._id}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md"
                  >

                    <div className="flex gap-4 p-4">

                      {/* IMAGE */}
                      <img
                        src={
                          item
                            ?.ticketId
                            ?.ticketimage
                            ?.url ||
                          "https://via.placeholder.com/300"
                        }
                        alt={
                          item
                            ?.ticketId
                            ?.name
                        }
                        className="h-32 w-28 rounded-2xl object-cover"
                      />

                      {/* CONTENT */}
                      <div className="flex flex-1 flex-col justify-between">

                        <div className="flex items-start justify-between">

                          <div>

                            <h2 className="text-xl font-black text-[#00633E]">

                              {
                                item
                                  ?.ticketId
                                  ?.name
                              }

                            </h2>

                            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                              <FaMapMarkerAlt />

                              Safari Park

                            </div>
                          </div>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(
                                item._id
                              )
                            }
                            className="rounded-xl bg-red-100 p-2 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                          >

                            <FaTrash />

                          </button>
                        </div>

                        {/* BOTTOM */}
                        <div className="mt-5 flex items-center justify-between">

                          {/* QTY */}
                          <div className="flex items-center gap-3 rounded-2xl border bg-slate-100 px-3 py-2">

                            <button
                              onClick={() =>
                                handleDecrease(
                                  item
                                )
                              }
                              className="rounded-lg bg-white p-2 shadow"
                            >

                              <FaMinus size={12} />

                            </button>

                            <span className="min-w-[25px] text-center text-lg font-bold">

                              {
                                item.ticketQty
                              }

                            </span>

                            <button
                              onClick={() =>
                                handleIncrease(
                                  item
                                )
                              }
                              className="rounded-lg bg-white p-2 shadow"
                            >

                              <FaPlus size={12} />

                            </button>
                          </div>

                          {/* PRICE */}
                          <div className="text-right">

                            <p className="text-xs text-gray-400">
                              Total
                            </p>

                            <h2 className="text-2xl font-black text-[#00633E]">

                              Rs{" "}
                              {(
                                item
                                  ?.ticketId
                                  ?.price *
                                item.ticketQty
                              ).toLocaleString()}

                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>

          {/* FOOTER */}
          {tickets.length > 0 && (

            <div className="sticky bottom-0 border-t bg-white p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Grand Total
                  </p>

                  <h2 className="text-3xl font-black text-[#00633E]">

                    Rs{" "}
                    {total.toLocaleString()}

                  </h2>

                </div>

                <button className="rounded-2xl bg-gradient-to-r from-[#00633E] to-[#008552] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105">

                  Confirm Booking

                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TicketCart;