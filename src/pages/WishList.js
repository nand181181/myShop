import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";

function WishList() {
  //const isWishlisted = wishlistItems.some((w) => w.id === item.id);
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Wishlist Product Details</h2>
    <hr/>
      {wishlist.length === 0 ? (
        <p className="text-muted">No items in wishlist.</p>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="card shadow-sm h-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top mt-2"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body text-center">
                  <h6 className="fw-bold">{item.name}</h6>
                  <p className="text-success">₹{item.price}</p>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
