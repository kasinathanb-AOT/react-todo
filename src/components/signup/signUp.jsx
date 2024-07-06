import React, { useState } from 'react';
import "./signUp.css";
import { userSignup } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [error, setError] = useState("");
  const navigate= useNavigate();
  

  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignup(formData);
      if(response.data.authToken){
        navigate(`/index/${response.data.authToken}`)
      }
      if (response.error) {
        setError(response.error);
      } 
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="signUp">
      <h1>Sign Up</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className="row">
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Phone Number
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>
        </div>
        {error && <p className="error">{error}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
