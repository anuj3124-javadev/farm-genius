import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirecting after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://new-api.productsscout.in/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "userEmail": email,
          "userPassword": password 
        }),
      });

      const data = await response.text();

      if (response.ok) {
        localStorage.setItem("token", data); // Save token for authentication
        alert("Login Successful!");
        navigate("/"); // Redirect to homepage after login
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email or Username</label>
            <input
              type="text"
              placeholder="Enter Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link> {/* ✅ Link to Registration */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
