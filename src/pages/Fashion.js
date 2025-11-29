import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Fashion = () => {
  const navigate = useNavigate();
  const [fashion, setFashion] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); // show first 4 items

  useEffect(() => {
    axios
      .get("http://localhost:5000/fashion")
      .then((response) => {
        setFashion(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleBuyNow = () => {
    navigate("/login");
  };

  const handleViewNext = () => {
    setVisibleCount((prev) => prev + 4); // load next 4 items
  };

  return (
    <div className="mt-4 mb-2">
      <h2>Fashion</h2>
      <hr/>
      <div className="row mt-4">
        {fashion.slice(0, visibleCount).map((item) => (
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card shadow">
              <img
                src={"/" + item.image}
                alt={item.name}
                className="card-img-top"
                style={{ height: "330px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5>{item.name}</h5>
                <p className="text-muted">{item.category}</p>
                <p className="fw-bold text-danger">₹{item.price}</p>
                <p>{item.description}</p>

                <button className="btn btn-primary w-100" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW NEXT BUTTON */}
      {visibleCount < fashion.length && (
        <div className="text-center mt-1 mb-5">
          <button
            className="btn btn-outline-primary"
            onClick={handleViewNext}
          >
            View Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Fashion;
