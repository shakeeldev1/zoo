import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, buyNow } from "../../redux/cartSlice";

const CartButtons = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center gap-2 whitespace-nowrap">
            {/* Add to Cart */}
            <button
                onClick={() => dispatch(addToCart(product))}
                className="px-3 sm:px-4 py-2 sm:py-2 rounded-lg bg-gradient-to-r from-[#085D2D] via-green-600 to-[#fdc500] text-white font-medium text-xs sm:text-sm shadow hover:from-emerald-600 hover:to-emerald-800 transition"
            >
                Add to Cart
            </button>

            {/* Buy Now */}
            <button
                onClick={() => dispatch(buyNow(product))}
                className="px-3 sm:px-4 py-2 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm hover:bg-gray-100 transition"
            >
                Buy Now
            </button>
        </div>
    );
};

export default CartButtons;
