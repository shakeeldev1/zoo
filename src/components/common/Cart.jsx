import React from "react";
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, removeFromCart, addToCart } from "../../redux/cartbilling/CartSlice";

const Cart = ({ close }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.cartItems);
  const total = items.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

  const handleUpdateQty = (id, delta) => {
    if (delta === -1) {
      dispatch(decreaseQty(id));
    } else if (delta === 1) {
      const item = items.find((cartItem) => cartItem.id === id);
      if (item && item.cartQuantity < item.quantity) {
        dispatch(addToCart(item));
      }
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      ></div>

      <div className="relative w-full max-w-lg h-full bg-white shadow-2xl rounded-l-3xl overflow-hidden border-l border-slate-200 flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
          <div>
            <p className="text-lg font-semibold text-slate-900">Shopping Cart</p>
            <p className="text-sm text-slate-500">Review your chosen animals before checkout.</p>
          </div>
          <button
            onClick={close}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center">
              <p className="text-xl font-semibold text-slate-900">Your cart is empty</p>
              <p className="mt-3 text-sm text-slate-500">Add a few animals to see them here.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-3xl object-cover border border-slate-200"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-sm font-medium text-red-600 transition hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-2 py-1">
                        <button
                          onClick={() => handleUpdateQty(item.id, -1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                        >
                          <FaMinus />
                        </button>

                        <span className="w-8 text-center font-semibold">{item.cartQuantity}</span>

                        <button
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <p className="text-lg font-semibold text-slate-900">${(item.price * item.cartQuantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>

          <button
            className="mt-5 w-full rounded-2xl bg-emerald-700 px-5 py-3 text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;