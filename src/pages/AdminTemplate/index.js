import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default class AdminTemplate extends Component {
  render() {
    //kiểm tra có login vào hệ thống chưa?
    if (!localStorage.getItem("UserAdmin")) {
      // redirect => auth
      return <Navigate to="/auth" replace />;
    }

    return (
      <div>
        <Outlet />
      </div>
    );
  }
}
