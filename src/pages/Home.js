import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useTranslation } from "react-i18next";

const Home = () => {
   //const { t } = useTranslation();
  const navigate = useNavigate();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/star")
      .then((response) => {
        setStars(response.data);
        console.log(stars)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
const handleBuyNow = () => {
  navigate("/login");
};

  return (
    <div class="mt-1">
       <div class="row">
        <div class="col-sm-12" >
        <div className="moving-wrapper">
          {/* {t("welcome")} */}
      <div className="moving-text">
        ⭐ BEST DEALS TODAY — UP TO 70% OFF | 🛒 FREE DELIVERY ON ORDERS ABOVE ₹499 |
        🔥 FLASH SALE LIVE | 💳 EXTRA 10% OFF WITH SBI / HDFC CARDS | 🎁 NEW ARRIVALS
        EVERY DAY | ⏳ LIMITED STOCK – HURRY!
      </div>
    </div>
    
</div>
        <div class="col-sm-12" >
  <div id="carouselExampleControls" class="carousel slide mt-1" data-bs-ride="carousel">
  <div class="carousel-inner" style={{height:300}}>
    <div class="carousel-item active" >
       <img className="d-block w-100 img-fluid" src="/assets/images/banner/001.png" alt="First slide" />
    </div>
    <div class="carousel-item">
       <img className="d-block w-100 img-fluid" src="/assets/images/banner/002.jpg" alt="First slide" />
    </div>
    <div class="carousel-item">
       <img className="d-block w-100 img-fluid" src="/assets/images/banner/003.jpg" alt="First slide" />
    </div>
     <div class="carousel-item">
       <img className="d-block w-100 img-fluid" src="/assets/images/banner/004.jpg" alt="First slide" />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


        </div>
<div class="col-sm-12">
   <h2 className="text-center mb-3">⭐ Star Product</h2>

     <div className="row">
        {stars.map((item) => (
          
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card shadow">
              <img
                src={"/" + item.image}   // IMPORTANT ✔
                alt={item.name}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5>{item.name}</h5>
                <p className="text-muted">{item.category}</p>
                <p className="fw-bold text-danger">₹{item.price}</p>
                <p>{item.description}</p>

              <button 
                className="btn btn-primary w-100" 
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
</div>

        <div class="col-sm-8">
              <h2>Shopping Cart – Key Features</h2>
          <p>
            <i style={{ fontSize: 18 }}>
              A shopping cart in an e-commerce platform is a critical component that enhances user experience and drives conversions. Here are the key features typically included:
            </i>
          </p>
          <ul>
            <li><strong>1. Product Management</strong> </li>
            <li>Display list of products in cart (image, name, price, quantity, total).
              Ability to increase/decrease quantity.</li>
            <li>Search items by name and Remove items</li>
            <li>Empty Cart button.</li>

          </ul>
          <ul>
            <li><strong>2. Price Summary Section</strong> </li>
            <li>Subtotal: total price of all items</li>
            <li>Grand Total: final payable amount</li>
            <li>Auto update total price dynamically.</li>
          </ul>
          <ul>
            <li><strong>3. Checkout & Payment</strong> </li>
            <li>Proceed to Checkout → navigate to Payment Page</li>
            <li>
              <ul>
                <li>Payment options:</li>
                <li>Razorpay / Stripe / PayPal (Integration-ready)</li>
                <li>Cash on Delivery (dummy mode)</li>
                <li>Save Card / UPI / Wallet</li>
              </ul>
            </li>
            <li>Auto update total price dynamically.</li>
          </ul>

          <ul>
            <li><strong>4. User Experience</strong> </li>
            <li>Responsive design (Bootstrap Grid)</li>
            <li>Real-time updates using Redux Toolkit</li>
            <li>“Continue Shopping” link</li>
          </ul>
        </div>
        <div class="col-sm-4">
          <img style={{
            border: "2px solid #f0f0f0ff",
            padding: "5px"
          }} src="assets/img/shop1.jpg" alt="Shirt" />
        </div>
      </div>

    </div>
  )
}

export default Home
