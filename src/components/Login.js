import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import { useAppContext } from "../context/AppContext";

const Login = ({ setRole }) => {
  const { baseURL } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/public/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
          userPassword: password,
        }),
      });
     
      console.log("before if");
      
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role?.[1]);
        setRole(data.role?.[1]); // ✅ Update App state

        window.dispatchEvent(new Event("storage"));

        alert("Login Successful!");

        if (data.role === "ROLE_FARMER") {
          navigate("/Fa-Home");
        } else if (data.role === "ROLE_BUYER") {
          navigate("/Bu-Home");
        } else if (data.role === "ROLE_SELLER") {
          navigate("/Sel-Home");
        } else {
          navigate("/");
        }
      } else {
        setError(response.error || "Invalid email or password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
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
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
