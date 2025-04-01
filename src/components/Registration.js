import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    
    const apiEndpoints = {
      farmer: "https://new-api.productsscout.in/register-farmer",
      buyer: "https://new-api.productsscout.in/register-buyer",
      seller: "https://new-api.productsscout.in/register-seller",
    };
    
    const roleKey = formData.role;
    const apiUrl = apiEndpoints[roleKey];
    
    const formDataToSend = new FormData();
    formDataToSend.append(`${roleKey}Name`, formData.name);
    formDataToSend.append(`${roleKey}Email`, formData.email);
    formDataToSend.append(`${roleKey}Password`, formData.password);
    formDataToSend.append(`${roleKey}ProfilePic`, formData.profile);
    formDataToSend.append(`${roleKey}Contact`, formData.contact);
    formDataToSend.append(`${roleKey}Address`, formData.address);
    
    try {
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Registration Successful:", response.data);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);
      alert("Registration Failed! Please try again.");
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
