import React, { useContext } from "react";
import { useState } from "react";
import { login as loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
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
      const res = await loginUser(formData);
      login(res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        required
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
