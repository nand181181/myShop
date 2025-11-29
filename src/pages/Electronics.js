import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Electronics = () => {
  const navigate = useNavigate();
  const [electronics, setElectronics] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/electronics")
      .then((response) => {
        setElectronics(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
const handleBuyNow = () => {
  navigate("/login");
};

  return (
    <div class="mt-4 mb-2">
      <h2>Electronics</h2>
      <hr/>
       <div className="row mt-4">
        {electronics.map((item) => (
          
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card shadow">
              <img
                src={"/" + item.image}   // IMPORTANT ✔ src={`/${product.image}`}
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
  )
}

export default Electronics
