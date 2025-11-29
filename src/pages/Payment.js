import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [method, setMethod] = useState("upi");
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setIsPaying(true);

    // Simulate payment delay
    setTimeout(() => {
      setIsPaying(false);
      setIsPaid(true);

      // clear cart if you want
      localStorage.removeItem("cart");

      // redirect after success
      setTimeout(() => navigate("/ProductList"), 3000);
    }, 2000);
  };

  if (isPaid) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-success p-4 shadow">
          <h2>✅ Payment Successful!</h2>
          <p>Your order has been placed successfully.</p>
          <p>Redirecting to Product List...</p>
        </div>
      </div>
    );
  }

  return (
    <div class="mt-5">
         <h2>Multiple Payment Methods: </h2>
        <hr/>
   
    <div className="container mt-3 mb-4" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">💳 Choose Payment Method</h3>

        <form onSubmit={handlePayment}>
          <div className="form-check mb-2">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={method === "upi"}
              onChange={(e) => setMethod(e.target.value)}
              className="form-check-input"
            />
            <label className="form-check-label">UPI / QR</label>
          </div>

          <div className="form-check mb-2">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={method === "card"}
              onChange={(e) => setMethod(e.target.value)}
              className="form-check-input"
            />
            <label className="form-check-label">Credit / Debit Card</label>
          </div>

          <div className="form-check mb-2">
            <input
              type="radio"
              name="payment"
              value="netbanking"
              checked={method === "netbanking"}
              onChange={(e) => setMethod(e.target.value)}
              className="form-check-input"
            />
            <label className="form-check-label">Net Banking</label>
          </div>

          <div className="form-check mb-3">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={method === "cod"}
              onChange={(e) => setMethod(e.target.value)}
              className="form-check-input"
            />
            <label className="form-check-label">Cash on Delivery</label>
          </div>

          {/* Conditional Inputs */}
          {method === "upi" && (
            <input
              className="form-control mb-3"
              placeholder="Enter your UPI ID (e.g., user@upi)"
              required
            />
          )}

          {method === "card" && (
            <>
              <input
                className="form-control mb-2"
                placeholder="Card Number"
                required
              />
              <div className="d-flex gap-2">
                <input className="form-control mb-2" placeholder="MM/YY" required />
                <input className="form-control mb-2" placeholder="CVV" required />
              </div>
            </>
          )}

          {method === "netbanking" && (
            <select className="form-select mb-3" required>
              <option value="">Select Bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>PNB</option>
            </select>
          )}

          {isPaying ? (
            <button className="btn btn-secondary w-100 mt-2" disabled>
              💸 Processing Payment...
            </button>
          ) : (
            <button className="btn btn-success w-100 mt-2">Pay Now</button>
          )}
        </form>
      </div>
    </div>
     </div>
  );
};

export default Payment;
