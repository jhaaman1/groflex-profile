import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Auth/Action";
import "./Login.css"


const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    const data = {
      email: credentials.email,
      password: credentials.password
    }
    e.preventDefault();
    dispatch(login(data));
    console.log('creden',credentials)
  };


  return (
    <div className="w-25 container">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" 
            value={credentials.email}
            onChange={handleInputChange}
            />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password" 
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary w-50 submit-btn">
          Submit
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
