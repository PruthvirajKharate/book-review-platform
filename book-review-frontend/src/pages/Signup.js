import React from "react";
import { useState } from "react";
import { signup } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(formData);
      alert("Signup successful!");
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      alert(error || "Signup failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          name="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
};

export default Signup;
