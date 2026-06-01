import React from "react";
import {
  FaTimes,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import {
  useDeleteBuyAnimalMutation,
  useGetBuyAnimalsQuery,
  useIncreaseBuyAnimalQtyMutation,
  useDecreaseBuyAnimalQtyMutation,
} from "../../redux/api/BuyAnimal";

const CartModal = ({ close }) => {

  // ================= GET CART ITEMS =================
  const {
    data,
    isLoading,
    isError,
  } = useGetBuyAnimalsQuery();

  // ================= MUTATIONS =================
  const [deleteBuyAnimal] =
    useDeleteBuyAnimalMutation();

  const [increaseBuyAnimalQty] =
    useIncreaseBuyAnimalQtyMutation();

  const [decreaseBuyAnimalQty] =
    useDecreaseBuyAnimalQtyMutation();

  // ================= ITEMS =================
  const cartItems = data?.items || [];

  // ================= TOTAL =================
  const total =
    data?.totalBill || 0;

  // ================= REMOVE ITEM =================
  const handleRemove = async (id) => {
    try {
      await deleteBuyAnimal(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= UPDATE QUANTITY =================
  const handleQty = async (id, type) => {
    try {

      if (type === "increase") {
        await increaseBuyAnimalQty(id).unwrap();
      }

      if (type === "decrease") {
        await decreaseBuyAnimalQty(id).unwrap();
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={close}
      ></div>

      {/* MODAL */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl rounded-l-2xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">

          <h2 className="text-2xl font-bold">
            Your Cart
          </h2>

          <button
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
            onClick={close}
          >
            <FaTimes />
          </button>

        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold">
              Loading Cart...
            </p>
          </div>
        )}

        {/* ERROR */}
        {isError && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-red-500 font-semibold">
              Failed To Load Cart
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!isLoading &&
          cartItems.length === 0 && (
            <p className="text-gray-500 mt-10 text-center">
              Your cart is empty.
            </p>
          )}

        {/* CART ITEMS */}
        {!isLoading &&
          cartItems.length > 0 && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

              {cartItems.map((item) => (

                <div
                  key={item.cartId}
                  className="flex gap-4 items-center border-b pb-3"
                >

                  {/* IMAGE */}
                  <img
                    src={
                      item?.animal?.image ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item?.animal?.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* INFO */}
                  <div className="flex-1 flex flex-col">

                    <p className="font-semibold">
                      {item?.animal?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Rs {item?.animal?.price}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-2 mt-2">

                      {/* DECREASE */}
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          handleQty(
                            item.cartId,
                            "decrease"
                          )
                        }
                      >
                        <FaMinus size={12} />
                      </button>

                      <span className="px-2">
                        {item?.animal?.quantity}
                      </span>

                      {/* INCREASE */}
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          handleQty(
                            item.cartId,
                            "increase"
                          )
                        }
                      >
                        <FaPlus size={12} />
                      </button>

                      {/* REMOVE */}
                      <button
                        className="ml-auto text-red-600 text-sm hover:underline"
                        onClick={() =>
                          handleRemove(item.cartId)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                  {/* PRICE */}
                  <p className="font-medium">
                    Rs {item?.animal?.price}
                  </p>

                </div>
              ))}
            </div>
          )}

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 flex flex-col gap-3">

            <div className="flex justify-between font-semibold text-lg">

              <span>Total:</span>

              <span>
                Rs {total}
              </span>

            </div>

            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition">
              Checkout
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default CartModal;