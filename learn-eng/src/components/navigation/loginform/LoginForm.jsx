import React, { useState } from "react";
import "./LoginForm.css";
import Footer from '../../footer/Footer';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <input
            className="inputLogin"
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
          />
          <input
            className="inputLogin"
            type="password"
            name="password"
            placeholder="Пароль"
            value={loginData.password}
            onChange={handleChange}
          />
          <button type="submit">Войти</button>
        </form>
      </div>
      <div>
      <Footer />
      </div>
    </div>
  );
};

export default LoginForm;
