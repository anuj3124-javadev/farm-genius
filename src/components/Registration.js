import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useAppContext } from '../context/AppContext';

const Registration = () => {
  const { baseURL} = useAppContext();
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
      farmer: `${baseURL}/public/register-farmer`,
      buyer: `${baseURL}/public/register-buyer`,
      seller: `${baseURL}/public/register-seller`,
    };

    const requestBody = {
      [`${formData.role}Name`]: formData.name,
      [`${formData.role}Email`]: formData.email,
      [`${formData.role}Password`]: formData.password,
       [`${formData.role}Role`]: formData.role,
      [`${formData.role}Contact`]: formData.contact,
      [`${formData.role}Address`]: formData.address,
    };

    const isFileUpload = !!formData.profile;
    let response;

    try {
      if (isFileUpload) {
        const formDataObj = new FormData();
        for (const key in requestBody) {
          formDataObj.append(key, requestBody[key]);
        }
        formDataObj.append(`${formData.role}ProfilePic`, formData.profile);

        response = await fetch(roleEndpoints[formData.role], {
          method: "POST",
          body: formDataObj,
        });
      } else {
        console.log(requestBody);
        console.log(formData);
        console.log(roleEndpoints[formData.role]);
        response = await fetch(roleEndpoints[formData.role], {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      }

      const contentType = response.headers.get("Content-Type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = { message: await response.text() };
      }

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
      <div className="form-column">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="reg-input" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="reg-input" required />
        <input type="file" accept="image/*" onChange={handleFileChange} className="reg-input" />
        {preview && <img src={preview} alt="Preview" className="profile-preview" />}
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="reg-input" required />
      </div>

      <div className="form-column">
        <select name="role" value={formData.role} onChange={handleChange} className="reg-input">
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="reg-input" required />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="reg-input" required></textarea>
        <button type="submit" className="reg-button">Register</button>
      </div>
    </form>
    <p className="login-link">
      Already have an account?{" "}
      <span onClick={() => navigate("/login")} className="login-text">
        Login here
      </span>
    </p>
  </div>  );
};

export default Registration;
