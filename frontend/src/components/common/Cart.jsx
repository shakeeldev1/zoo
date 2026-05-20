import React from "react";
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";

import {
  useGetBuyAnimalsQuery,
} from "../../redux/api/BuyAnimal";

const Cart = ({ close }) => {

  // ================= GET CART DATA =================
  const {
    data,
    isLoading,
    isError,
  } = useGetBuyAnimalsQuery();

  // ================= CART ITEMS =================
  const items = data?.items || [];

  // ================= TOTAL =================
  const total = data?.totalBill || 0;

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">

        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={close}
        ></div>

        <div className="relative w-full max-w-lg h-full bg-white flex items-center justify-center">

          <div className="text-2xl font-bold text-[#00633E]">
            Loading Cart...
          </div>

        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">

        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={close}
        ></div>

        <div className="relative w-full max-w-lg h-full bg-white flex items-center justify-center">

          <div className="text-2xl font-bold text-red-500">
            Failed To Load Cart
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      ></div>

      {/* CART PANEL */}
      <div className="relative w-full max-w-lg h-full bg-white shadow-2xl rounded-l-3xl overflow-hidden border-l border-slate-200 flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">

          <div>
            <p className="text-xl font-bold text-[#00633E]">
              Shopping Cart
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Review your selected animals before checkout.
            </p>
          </div>

          <button
            onClick={close}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
          >
            <FaTimes />
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {items.length === 0 ? (

            <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center p-6">

              <p className="text-2xl font-bold text-slate-800">
                Your cart is empty
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Add some premium animals to continue shopping.
              </p>

            </div>

          ) : (

            items.map((item) => (

              <div
                key={item.cartId}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm hover:shadow-md transition-all"
              >

                <div className="flex items-start gap-4">

                  {/* IMAGE */}
                  <img
                    src={
                      item?.animal?.image ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item?.animal?.name}
                    className="h-24 w-24 rounded-2xl object-cover border border-slate-200"
                  />

                  {/* CONTENT */}
                  <div className="flex-1">

                    {/* TOP */}
                    <div className="flex items-center justify-between gap-2">

                      <h3 className="text-lg font-bold text-[#00633E]">
                        {item?.animal?.name}
                      </h3>

                      <button
                        className="text-sm font-medium text-red-500 transition hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {item?.animal?.description}
                    </p>

                    {/* PRICE + QTY */}
                    <div className="mt-4 flex items-center justify-between gap-3">

                      {/* QUANTITY */}
                      <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-2 py-1 shadow-sm">

                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                        >
                          <FaMinus size={12} />
                        </button>

                        <span className="w-8 text-center font-semibold text-slate-800">
                          1
                        </span>

                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                        >
                          <FaPlus size={12} />
                        </button>

                      </div>

                      {/* PRICE */}
                      <p className="text-lg font-bold text-[#00633E]">
                        Rs{" "}
                        {item?.animal?.price?.toLocaleString()}
                      </p>

                    </div>

                    {/* STOCK */}
                    <p className="mt-3 text-xs text-slate-500">

                      Available Stock:{" "}

                      <span className="font-semibold text-[#00633E]">
                        {item?.animal?.quantity}
                      </span>

                    </p>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-200 bg-white p-6">

          <div className="flex items-center justify-between text-xl font-bold text-slate-900">

            <span>Total</span>

            <span className="text-[#00633E]">
              Rs {total.toLocaleString()}
            </span>

          </div>

          <button
            disabled={items.length === 0}
            className="mt-5 w-full rounded-2xl bg-[#00633E] px-5 py-4 text-white font-semibold transition hover:bg-[#004d30] disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Proceed To Checkout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Cart;