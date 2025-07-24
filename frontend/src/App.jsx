import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import BookReviewDashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <div className="login-bg">
                <Signup />
              </div>
            }
          ></Route>
          <Route
            path="/"
            element={
              <div className="login-bg">
                <Login />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <BookReviewDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
