import React from "react";

import {
  FaTimes,
  FaMinus,
  FaPlus,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  useGetBuyAnimalsQuery,
  useIncreaseBuyAnimalQtyMutation,
  useDecreaseBuyAnimalQtyMutation,
  useDeleteBuyAnimalMutation,
} from "../../redux/api/BuyAnimal";

const Cart = ({ close }) => {

  // ================= GET CART =================
  const {
    data,
    isLoading,
    isError,
  } = useGetBuyAnimalsQuery();

  // ================= MUTATIONS =================
  const [increaseBuyAnimalQty, { isLoading: increaseLoading }] =
    useIncreaseBuyAnimalQtyMutation();

  const [decreaseBuyAnimalQty, { isLoading: decreaseLoading }] =
    useDecreaseBuyAnimalQtyMutation();

  const [deleteBuyAnimal, { isLoading: deleteLoading }] =
    useDeleteBuyAnimalMutation();

  // ================= DATA =================
  const items = data?.items || [];

  // ================= TOTAL BILL =================
  const total =
    items.reduce((acc, item) => {
      return (
        acc +
        (item?.animal?.price || 0) *
          (item?.cartQty || 1)
      );
    }, 0) || 0;

  // ================= TOTAL ITEMS =================
  const totalItems =
    items.reduce((acc, item) => {
      return acc + (item?.cartQty || 1);
    }, 0) || 0;

  // ================= INCREASE =================
  const handleIncrease = async (id) => {
    try {
      const res =
        await increaseBuyAnimalQty({ id, quantity: 1 }).unwrap();

      toast.success(
        res?.message || "Quantity increased"
      );

    } catch (error) {

      toast.error(
        error?.data?.message ||
          "Failed to increase quantity"
      );

      console.log(error);
    }
  };

  // ================= DECREASE =================
  const handleDecrease = async (id, qty) => {

    // STOP AT 1
    if (qty <= 1) {

      toast.warning(
        "Minimum quantity is 1"
      );

      return;
    }

    try {

      const res =
        await decreaseBuyAnimalQty({ id, quantity: 1 }).unwrap();

      toast.success(
        res?.message || "Quantity decreased"
      );

    } catch (error) {

      toast.error(
        error?.data?.message ||
          "Failed to decrease quantity"
      );

      console.log(error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {

      const res =
        await deleteBuyAnimal(id).unwrap();

      toast.success(
        res?.message || "Item removed"
      );

    } catch (error) {

      toast.error(
        error?.data?.message ||
          "Failed to remove item"
      );

      console.log(error);
    }
  };

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">

        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={close}
        ></div>

        <div className="relative w-full max-w-lg h-full bg-white flex items-center justify-center">

          <div className="flex flex-col items-center gap-4">

            <div className="w-14 h-14 border-4 border-[#00633E] border-t-transparent rounded-full animate-spin"></div>

            <p className="text-2xl font-bold text-[#00633E]">
              Loading Cart...
            </p>

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
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={close}
        ></div>

        <div className="relative w-full max-w-lg h-full bg-white flex items-center justify-center">

          <div className="text-center">

            <p className="text-3xl font-bold text-red-500">
              Failed To Load Cart
            </p>

            <p className="mt-2 text-slate-500">
              Please try again later
            </p>

          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ================= TOAST ================= */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />

      <div className="fixed inset-0 z-50 flex justify-end">

        {/* ================= BACKDROP ================= */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={close}
        ></div>

        {/* ================= PANEL ================= */}
        <div className="relative w-full max-w-lg h-full bg-gradient-to-b from-white to-slate-100 shadow-2xl rounded-l-3xl overflow-hidden border-l border-slate-200 flex flex-col animate-slideLeft">

          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white sticky top-0 z-20">

            <div className="flex items-center gap-4">

              {/* ICON */}
              <div className="relative">

                <div className="bg-[#00633E] text-white p-3 rounded-2xl shadow-lg">
                  <FaShoppingCart size={22} />
                </div>

                {/* ITEM BADGE */}
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[24px] h-6 px-1 rounded-full flex items-center justify-center text-xs font-bold shadow-md animate-bounce">
                    {totalItems}
                  </div>
                )}
              </div>

              <div>

                <h2 className="text-2xl font-extrabold text-[#00633E]">
                  Shopping Cart
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {totalItems} items added
                </p>

              </div>
            </div>

            {/* CLOSE */}
            <button
              onClick={close}
              className="rounded-full bg-slate-100 p-3 text-slate-600 transition-all duration-300 hover:bg-red-500 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          {/* ================= BODY ================= */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">

            {items.length === 0 ? (

              <div className="h-full flex flex-col items-center justify-center text-center">

                <div className="bg-slate-200 p-8 rounded-full mb-6">

                  <FaShoppingCart
                    className="text-slate-500"
                    size={50}
                  />

                </div>

                <h2 className="text-3xl font-bold text-slate-700">
                  Your Cart Is Empty
                </h2>

                <p className="mt-3 text-slate-500 max-w-sm">
                  Add premium animals into your cart
                  and continue shopping.
                </p>

              </div>

            ) : (

              items.map((item) => (

                <div
                  key={item.cartId}
                  className="group rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >

                  <div className="flex gap-4 p-4">

                    {/* IMAGE */}
                    <div className="relative">

                      <img
                        src={
                          item?.animal?.image ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item?.animal?.name}
                        className="w-20 h-20 object-cover rounded-2xl border border-slate-200"
                      />

                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 flex flex-col justify-between">

                      {/* TOP */}
                      <div className="flex items-start justify-between gap-2">

                        <div>

                          <h3 className="text-xl font-bold text-[#00633E] line-clamp-1">
                            {item?.animal?.name}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                            {item?.animal?.description}
                          </p>

                        </div>

                        {/* DELETE */}
                        <button
                          disabled={deleteLoading}
                          onClick={() =>
                            handleDelete(item.cartId)
                          }
                          className="bg-red-100 text-red-500 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          <FaTrash />
                        </button>

                      </div>

                      {/* PRICE + QTY */}
                      <div className="mt-4 flex items-center justify-between">

                        {/* QUANTITY */}
                        <div className="flex items-center gap-3 bg-slate-100 rounded-full px-3 py-2 border border-slate-200">

                          {/* MINUS */}
                          <button
                            disabled={decreaseLoading}
                            onClick={() =>
                              handleDecrease(
                                item.cartId,
                                item?.cartQty || 1
                              )
                            }
                            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-[#00633E] hover:text-white transition-all duration-300"
                          >
                            <FaMinus size={12} />
                          </button>

                          {/* QTY */}
                          <span className="min-w-[20px] text-center text-lg font-bold text-slate-800">
                            {item?.cartQty || 1}
                          </span>

                          {/* PLUS */}
                          <button
                            disabled={increaseLoading}
                            onClick={() =>
                              handleIncrease(item.cartId)
                            }
                            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-[#00633E] hover:text-white transition-all duration-300"
                          >
                            <FaPlus size={12} />
                          </button>

                        </div>

                        {/* PRICE */}
                        <div className="text-right">

                          <p className="text-xs text-slate-500">
                            Total Price
                          </p>

                          <p className="text-2xl font-extrabold text-[#00633E]">
                            Rs{" "}
                            {(
                              (item?.animal?.price || 0) *
                              (item?.cartQty || 1)
                            ).toLocaleString()}
                          </p>

                        </div>
                      </div>

                      {/* STOCK */}
                      <div className="mt-3 flex items-center justify-between">

                        <p className="text-xs text-slate-500">
                          Available Stock:
                        </p>

                        <span className="bg-green-100 text-[#00633E] text-xs font-bold px-3 py-1 rounded-full">
                          {item?.animal?.quantity}
                        </span>

                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ================= FOOTER ================= */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 bg-white p-6 shadow-inner">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Grand Total
                  </p>

                  <h2 className="text-3xl font-extrabold text-[#00633E]">
                    Rs {total.toLocaleString()}
                  </h2>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-500">
                    Total Items
                  </p>

                  <h3 className="text-2xl font-bold text-slate-800">
                    {totalItems}
                  </h3>

                </div>
              </div>

              {/* CHECKOUT */}
              <button
                disabled={items.length === 0}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#00633E] to-[#008552] py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed To Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;