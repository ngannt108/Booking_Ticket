import React from "react";
import { Redirect } from "react-router-dom";

function GuardBooking(props) {
  const taiKhoan = JSON.parse(localStorage.getItem("maLoaiNguoiDung"));
  if (taiKhoan === "1") {
    return props.children;
  } else {
    return <Redirect to="/sign-in" />;
  }
}

export default GuardBooking;
