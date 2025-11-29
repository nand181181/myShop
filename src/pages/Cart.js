import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="container mt-4">
      <h2>🛒 Your Cart</h2>
      <hr/>
      
      {cartItems.length === 0 ? (
        <h4>No items added yet.</h4>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              className="d-flex align-items-center border-bottom py-3"
              key={item.id}
            >
              <img
                src={`/${item.image}`}
                width="80"
                className="me-3 rounded"
                alt={item.name}
              />
              <div className="flex-grow-1">
                <h5>{item.name}</h5>
                <p>
                  ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                </p>
                <button
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => dispatch(decreaseQty(item.id))}
                >
                  -
                </button>
                <button
                  className="btn btn-sm btn-outline-dark ms-2"
                  onClick={() => dispatch(increaseQty(item.id))}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <h3 className="mt-3">Total Amount: ₹{totalAmount}</h3>

          {/* ✅ Correct Navigation */}
          <button
            className="btn btn-success w-100 mt-3"
            onClick={() => navigate("/Payment")}
          >
            💳 Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
