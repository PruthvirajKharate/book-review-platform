import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { logout, token } = useContext(AuthContext);
  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      <p>Your token is : {token}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
