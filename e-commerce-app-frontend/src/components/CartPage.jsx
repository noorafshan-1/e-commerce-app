import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!firstName || !lastName || !address) {
      toast.error(" Please fill all required fields.");
      return;
    }

    try {
      const orderData = {
        firstName,
        lastName,
        address,
        cart,
      };

      const response = await placeOrder(orderData);

      toast.success(response.message || "Order placed successfully");

      clearCart();
      setFirstName("");
      setLastName("");
      setAddress("");
    } catch (error) {
      console.error("Order failed", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          "❌ Failed to place order. Please try again."
      );
    }
  };

  return (
    <div className="cart-page-container">
      <h2>🛒 My Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">🛒 Your cart is empty. Start shopping!</p>
      ) : (
        <>
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />

                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item)}>+</button>
                      <button onClick={() => removeFromCart(item.id)}>
                        🗑️
                      </button>
                    </div>
                  </div>
                  <span>{item.name}</span>
                  <div className="cart-item-right">
                    <p className="item-total">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                Total Amount <strong>₹{total}</strong>
              </div>
            </div>
            <div className="cart-form">
              <h3>Checkout</h3>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <button
                onClick={handlePlaceOrder}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
export default CartPage;
