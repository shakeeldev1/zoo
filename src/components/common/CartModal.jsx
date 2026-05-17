import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQty, removeFromCart } from "../../redux/cartSlice";

const CartModal = ({ close }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total cart price
  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={close}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl rounded-l-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
            onClick={close}
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500 mt-10 text-center">Your cart is empty.</p>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b pb-3"
              >
                {/* Product Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.product.price} x {item.qty}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    {/* Decrease Button */}
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      onClick={() => dispatch(decreaseQty(item.id))}
                      disabled={item.qty <= 1}
                    >
                      -
                    </button>

                    <span className="px-2">{item.qty}</span>

                    {/* Increase Button */}
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => dispatch(addToCart(item.product))}
                    >
                      +
                    </button>

                    {/* Remove Button */}
                    <button
                      className="ml-auto text-red-600 text-sm hover:underline"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <p className="font-medium">${item.product.price * item.qty}</p>
              </div>
            ))}
          </div>
        )}

        {/* Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 flex flex-col gap-3">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${total}</span>
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
