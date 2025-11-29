import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";


export const Navbar = () => {
  
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // 🔥 Using your existing logic (state.cartItems)
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div>
      <nav class="navbar navbar-expand-lg ">

  {/* TOP-LEFT CART LOGO */}
  <Link className="navbar-brand d-flex align-items-center" to="/">
    <i className="bi bi-cart4 text-warning" style={{ fontSize: "28px" }}></i>
    <span className="ms-2 fw-bold text-light">MyShop</span>
  </Link>

        {/* LEFT MENU */}
        <ul className="navbar-nav me-auto">

          {/* Always Show Home */}
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Mobile">Mobile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Fashion">Fashion</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Electronics">Electronics</Link>
          </li> 
          <li className="nav-item">
            <Link className="nav-link" to="Api">Api</Link>
          </li>

          {/* After login show Products */}
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/productlist">Products</Link>
            </li>
          )}

          {/* After login show Orders */}
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/WishList">WishList</Link>
            </li>
          )}
        </ul>
   

        {/* RIGHT MENU */}

        <ul className="navbar-nav ms-auto">

          {/* BEFORE LOGIN → Show only Login button */}
          {!isLoggedIn && (
            <li className="nav-item">
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
            </li>
          )}

          {/* AFTER LOGIN → Show Username and Logout button */}
          {isLoggedIn && (
            <>
              <div className="ms-auto  align-items-center btn btn-outline-info me-2">

                {/*  CART ICON WITH ORANGE BADGE */}
                <Link
                  to="/cart"
                  className="text-white position-relative pb-2"
                  style={{ textDecoration: "none", fontSize: "22px" }}
                >
                  <i className="bi bi-cart3"></i>

                  <span
                    className="badge bg-warning text-dark"
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-10px",
                      fontSize: "11px",
                      borderRadius: "50%",
                      padding: "1px 5px",
                    }}
                  >
                    {cartCount}
                  </span>

                  <span className="ms-1" style={{ fontSize: "16px" }}>Cart</span>
                </Link>

              </div>

              <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle pb-3" type="button" id="dropdownFormButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="text-light me-2">{user?.username}</span>
                </button>
                <div class="dropdown-menu pl-2" aria-labelledby="dropdownFormButton">
                  <form>
                   
                      <Link className="nav-link" to="/">My Account</Link>
                      <Link className="nav-link" to="Profile">Profile</Link>
                      <Link className="nav-link" to="WishList">Order</Link>
                      
                      <button className="btn btn-danger ml-2 mt-2" onClick={handleLogout}>
                        Sign Out
                      </button>
                   
                  </form>
                </div>
              </div>

              {/* <Link className="btn btn-success me-2" to="Cart">
                Cart
              </Link> */}



            </>
          )}
        </ul>



      </nav>
    </div>
  )
}

export default Navbar
