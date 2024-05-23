import React, { useState } from "react";
import "./RegisterForm.css";
import Footer from '../../footer/Footer.jsx';

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="registerForm">
      <form onSubmit={handleSubmit}>
        <input
          className="inputRegister"
          type="email"
          name="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleChange}
        />
        <input
          className="inputRegister"
          type="password"
          name="password"
          placeholder="Пароль"
          value={registerData.password}
          onChange={handleChange}
        />
        <input
          className="inputRegister"
          type="password"
          name="confirmPassword"
          placeholder="Подтвердите пароль"
          value={registerData.confirmPassword}
          onChange={handleChange}
        />
        <button className="buttonRegister" type="submit">
          Зарегистироваться
        </button>
        <Footer />
      </form>
      
    </div>
  );
};

export default RegisterForm;
