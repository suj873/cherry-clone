import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  getCartTotal,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../services/cart";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCart = () => {
    setCart(getCart());
    setTotal(getCartTotal());
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleIncrease = (id) => {
    increaseQuantity(id);
    loadCart();
  };

  const handleDecrease = (id) => {
    decreaseQuantity(id);
    loadCart();
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    loadCart();
  };

  if (cart.length === 0) {
    return (
      <div className="bg-transparent min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <h1 className="text-5xl font-light text-[#2b2b2b] mb-8">
            Your cart
          </h1>

          <div className="text-center py-24">
            <p className="text-xl text-gray-500 mb-8">
              Your cart is empty
            </p>

            <button
              onClick={() => navigate("/products")}
              className="bg-[#7A0016] hover:bg-[#600012] text-white px-10 py-4 rounded-full transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Heading */}
        <div className="flex justify-between items-center mb-14">
          <h1 className="text-5xl md:text-6xl font-light text-[#2b2b2b]">
            Your cart
          </h1>

          <button
            onClick={() => navigate("/products")}
            className="underline underline-offset-4 text-[#2b2b2b]"
          >
            Continue shopping
          </button>
        </div>

        {/* Header */}
        <div className="hidden md:grid grid-cols-12 border-b border-gray-200 pb-5 text-xs tracking-[3px] uppercase text-gray-500">
          <div className="col-span-6">Product</div>
          <div className="col-span-3 text-center">
            Quantity
          </div>
          <div className="col-span-3 text-right">
            Total
          </div>
        </div>

        {/* Products */}
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 py-8 border-b border-gray-200"
            >
              {/* Product */}
              <div className="md:col-span-6 flex gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-36 md:w-32 md:h-40 object-cover"
                />

                <div>
                  <h2 className="text-xl text-[#2b2b2b]">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="mt-4 text-sm text-gray-500 underline"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="md:col-span-3 flex md:justify-center items-center">
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="px-5 py-2 min-w-[50px] text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="md:col-span-3 flex md:justify-end items-center">
                <p className="text-lg text-[#2b2b2b]">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-[#F7EEF3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-lg ml-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-3xl font-light text-[#2b2b2b]">
                Estimated total
              </h2>

              <span className="text-3xl font-light text-[#2b2b2b]">
                ₹{total}
              </span>
            </div>

            <p className="text-gray-500 text-right mb-8">
              Taxes, discounts and shipping calculated at checkout.
            </p>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#7A0016] hover:bg-[#600012] text-white py-5 rounded-full text-lg transition"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}