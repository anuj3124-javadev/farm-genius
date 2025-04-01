import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile: null,
    password: "",
    role: "farmer",
    contact: "",
    address: "",
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleEndpoints = {
      farmer: "https://new-api.productsscout.in/public/register-farmer",
      buyer: "https://new-api.productsscout.in/public/register-buyer",
      seller: "https://new-api.productsscout.in/public/register-seller",
    };

    // Prepare request body with correct field names
    const requestBody = {
      [`${formData.role}Name`]: formData.name,
      [`${formData.role}Email`]: formData.email,
      [`${formData.role}Password`]: formData.password,
      [`${formData.role}Contact`]: formData.contact,
      [`${formData.role}Address`]: formData.address,
    };

    const formDataObj = new FormData();
    for (const key in requestBody) {
      formDataObj.append(key, requestBody[key]);
    }
    if (formData.profile) {
      formDataObj.append(`${formData.role}ProfilePic`, formData.profile);
    }

    try {
      console.log("Sending request to:", roleEndpoints[formData.role]);
      console.log("FormData content:", [...formDataObj.entries()]); // Debugging

      const response = await fetch(roleEndpoints[formData.role], {
        method: "POST",
        body: formDataObj,
      });

      console.log("Response status:", response.status);

      
      const contentType = response.headers.get("Content-Type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = { message: await response.text() };
      }

      console.log("Server Response:", result);

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert("Registration Failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network or Server Error: " + error.message);
    }
  };

  return (
    <div className="reg-container fadeIn">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form-animated">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="reg-input" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="reg-input" required />
        <input type="file" accept="image/*" onChange={handleFileChange} className="reg-input" />
        {preview && <img src={preview} alt="Preview" className="profile-preview" />}
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="reg-input" required />
        <select name="role" value={formData.role} onChange={handleChange} className="reg-input">
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="reg-input" required />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="reg-input" required></textarea>
        <button type="submit" className="reg-button">Register</button>
      </form>
      <p className="login-link">Already have an account? <span onClick={() => navigate("/login")} className="login-text">Login here</span></p>
    </div>
  );
};

export default Registration;
