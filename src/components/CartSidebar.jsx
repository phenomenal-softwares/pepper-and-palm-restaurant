// CartSidebar.jsx
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";

function CartSidebar({ isOpen, onClose }) {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 pb-10 bg-yellow-50 shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <FiX size={20} />
        </button>
      </div>

      {/* Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-150px)]">
        {cartItems.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-b pb-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-500">
                ₦{item.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="p-1 border rounded"
                >
                  <FiMinus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="p-1 border rounded"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-600"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-bold">₦{totalPrice.toLocaleString()}</span>
        </div>
        <button className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartSidebar;
