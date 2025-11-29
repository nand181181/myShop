import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../redux/wishlistSlice";

const ProductList = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWishlist = (item) => {
    dispatch(addToWishlist(item));
  };

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }
        return res.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products || [];
        setProducts(items);
        setFiltered(items);
      })
      .catch(() => {
        setError("Unable to load product data.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((item) => selectedBrands.includes(item.brand));
    }

    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [products, selectedCategories, selectedBrands, search]);

  // Category & Brand lists
  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearch("");
    setFiltered(products);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* FILTER PANEL */}
        <div className="col-md-3 border-end left-panel_BG p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold">FILTERS</h5>
            <button
              className="btn btn-link text-danger text-decoration-none p-0"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>

          {/* Categories */}
          <h6 className="text-uppercase fw-bold">Categories</h6>
          {categories.map((cat) => (
            <div className="form-check" key={cat}>
              <input
                type="checkbox"
                className="form-check-input"
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategories((prev) =>
                    prev.includes(value)
                      ? prev.filter((c) => c !== value)
                      : [...prev, value]
                  );
                }}
              />
              <label className="form-check-label">{cat}</label>
            </div>
          ))}

          {/* Brands */}
          <h6 className="text-uppercase fw-bold mt-4">Brands</h6>
          {brands.map((brand) => (
            <div className="form-check" key={brand}>
              <input
                type="checkbox"
                className="form-check-input"
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedBrands((prev) =>
                    prev.includes(value)
                      ? prev.filter((b) => b !== value)
                      : [...prev, value]
                  );
                }}
              />
              <label className="form-check-label">{brand}</label>
            </div>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="col-md-9">
          {/* Search */}
          <div className="mb-4 d-flex justify-content-center">
            <input
              type="text"
              className="form-control text-center shadow p-3"
              style={{ maxWidth: "600px", borderRadius: "30px" }}
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Product Cards */}
          <div className="row">
            {filtered.length === 0 ? (
              <p className="text-center text-muted">No products found.</p>
            ) : (
              filtered.map((item) => {
                const isWishlisted = wishlistItems.some(
                  (w) => w.id === item.id
                );

                return (
                  <div
                    className="col-md-4 mb-4"
                    key={item.id}
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card shadow-sm h-100 border-0 position-relative">
                      {/* Wishlist Button */}
                      <button
                        className="btn btn-light position-absolute"
                        style={{
                          top: "10px",
                          right: "10px",
                          borderRadius: "50%",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlist(item);
                        }}
                      >
                        {isWishlisted ? (
                          <i className="bi bi-heart-fill text-danger fs-5"></i>
                        ) : (
                          <i className="bi bi-heart fs-5"></i>
                        )}
                      </button>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="card-img-top"
                        style={{
                          height: "230px",
                          objectFit: "contain",
                          padding: "10px",
                        }}
                      />

                      <div className="card-body text-center">
                        <h6 className="fw-bold">{item.name}</h6>
                        <p className="text-muted small mb-1">{item.category}</p>
                        <p className="text-success fw-bold mb-1">
                          ₹{item.price}
                        </p>
                        <p className="text-muted small">{item.brand}</p>

                        <button className="btn btn-outline-primary btn-sm mt-2">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
