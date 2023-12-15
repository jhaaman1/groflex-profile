import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Home from "../Home";
import { PrivateRoute } from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
