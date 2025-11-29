import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: ""
  });

  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.password || !user.email) {
      alert("Please fill all fields");
      return;
    }

    if (!validateEmail(user.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");

    try {
      await axios.post("http://localhost:5000/users", user);
      alert("Signup successful!");

      setUser({ username: "", password: "", email: "" });

      // Redirect to Home
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Error saving user");
    }
  };

  return (
    <div className="container mt-3 mb-3 border shadow rounded-2" style={{ maxWidth: "650px" }}>
      <h2 className="mb-4 text-center">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label class="form-label fw-b">User/Mobile</label>
          <input
            type="text"
            className="form-control "
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          {emailError && <small className="text-danger">{emailError}</small>}
        </div>



        <button type="submit" className="btn btn-primary w-100 mb-4">
          Signup
        </button>

      </form>
    </div>
  );
};

export default Signup;
