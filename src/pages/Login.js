import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // GET ALL USERS
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;

      // FIND USER
      const matchedUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (matchedUser) {
        dispatch(
          loginSuccess({
            name: matchedUser.name,
            username: matchedUser.username,
            email: matchedUser.email,
            id: matchedUser.id,
          })
        );

        navigate("/"); // REDIRECT
      } else {
        setError("Invalid Username or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="container mt-3 mb-2 d-flex justify-content-center">
      <div className="card p-3 shadow" style={{ width: "650px" }}>
        <h3 className="text-center mb-3 ">ACCOUNT LOGIN</h3>

        {error && <p className="alert alert-danger">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">USER NAME</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">PASSWORD</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label>
                <input type="checkbox" name="remember" /> Remember me
              </label>
            </div>
            <div className="col-sm-6 text-end">
              <span className="psw">
                Forgot <a href="#">password?</a>
              </span>
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-3 mb-3">LOG IN</button>

          <span className="psw">
            Don't have an account?
              <Link className="ms-2" to="Signup">Sign Up</Link>
            {/* <Link className="ms-2" to="/Signup">
              Sign Up
            </Link> */}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
