import React, { useState } from "react";
// import SignUp from "../../components/signup/signUp";
import Login from "../../components/login/login";
import "./authPage.css";
import SignUp from "../../components/signup/signUp";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="authPage">
      <div className="left">
        <div className="header">
          <h1>Welcome,</h1>
          <h1>TO-DO with JWT</h1>
          <button onClick={togglePage}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        <p>{isLogin ?  "Don't have an account?" :"Already have an account ?" }</p>

        </div>
      </div>
      <div className="right">
        {isLogin ? <Login /> : <SignUp />}
      </div>
    </div>
  );
}

export default Auth;
