import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((res) => res.json())
      .then((data) => {
        let products = [];

        // API returns array
        if (Array.isArray(data)) {
          products = data;
        }

        // API returns { product: [...] }
        if (data.product && Array.isArray(data.product)) {
          products = data.product;
        }

        // FIX: Match id as string (important!)
        const item = products.find((p) => String(p.id) === String(id));

        console.log("Searching for ID:", id);
        console.log("Found Product:", item);

        setProduct(item);
      })
      .catch((err) => console.log("Error fetching:", err));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setMessage("✅ Item added to cart successfully!");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  if (!product) {
    return <h3 className="text-center mt-5 text-danger">Loading...</h3>;
  }

  return (
    <div className="container mt-4">
      
      <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
        ⬅ Back to product list
      </button>

      {message && <div className="alert alert-success text-center">{message}</div>}

      <div className="row">
        
        {/* LEFT IMAGE SECTION */}
        <div className="col-md-5 mb-3 text-left">
          <img
            src={"/" + product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />

          <h5 className="mt-3">{product.name}</h5>
        </div>

        {/* RIGHT DETAILS */}
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <p><strong>Brand:</strong> {product.brand}</p>

          <h4 className="text-success">₹{product.price}</h4>

          <button className="btn btn-primary me-2" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>

          <button className="btn btn-success" onClick={handleBuyNow}>
            🚀 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
