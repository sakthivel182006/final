import React, { useState } from "react";
import { useUserStore } from "../store/product"; // Ensure the correct import path and store name
import "./Createpage.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Dashboard from "./Dashboard";

const Createpage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isRegisterForm, setIsRegisterForm] = useState(true); // State to toggle between Register and Login form

  const { createUser, loginUser } = useUserStore(); // Assuming you have a loginUser function in your store
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    const result = await createUser(formData);

    if (result.success) {
      alert(result.message);
      setFormData({ name: "", email: "", password: "" });
    } else {
      alert(result.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please fill in both fields.");
      return;
    }

    const result = await loginUser(loginData);

    if (result.success) {
      alert(result.message);
      navigate("/dashboard"); // Use navigate correctly to redirect to Dashboard
    } else {
      alert(result.message);
    }
  };

  const toggleForm = () => {
    setIsRegisterForm(!isRegisterForm); // Toggle between Register and Login form
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>{isRegisterForm ? "Create User" : "Login"}</h1>
        
        {/* Toggle Buttons */}
        <div className="form-toggle">
          <button onClick={toggleForm}>
            {isRegisterForm ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>

        {/* Register Form */}
        {isRegisterForm ? (
          <form onSubmit={handleCreateSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleCreateChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleCreateChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleCreateChange}
              />
            </div>
            <button type="submit">Create User</button>
          </form>
        ) : (
          // Login Form
          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label htmlFor="loginEmail">Email:</label>
              <input
                type="email"
                id="loginEmail"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="loginPassword">Password:</label>
              <input
                type="password"
                id="loginPassword"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        )}
      </div>

      <div className="content">
        <h2>Welcome to Create Page</h2>
        <p>
          This page allows you to create a new user or log in. Please choose
          the appropriate form above.
        </p>
      </div>
    </div>
  );
};

export default Createpage;
