import React, { useState } from "react";
import { userLogin } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoadng] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoadng(true)
      const response = await userLogin(username, password);
      setLoadng(false)
      if(response.data.authToken){
        navigate(`/index/${response.data.authToken}`)
      }else{
        setError("Auth Token Unknown")
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">{ loading ? "Loading..":"Login" }</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
