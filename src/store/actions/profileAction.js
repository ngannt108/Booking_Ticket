import axios from "axios";
import {
  GET_BOOK_TICKET_CHAIR,
  GET_PROFILE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
} from "../const/profileConst";

export const getProfileAction = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/user",
        // data: {
        //   tentaiKhoan: taiKhoan,
        // },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("thông tin người dùng", res.data);
      dispatch({
        type: GET_PROFILE, //CHANGE_PASSWORD
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBookTicketChairAction = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/user/history",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("history: ", res.data);
      dispatch({
        type: GET_BOOK_TICKET_CHAIR,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfileUserAction = (user) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await axios({
        url: "http://localhost:5000/user",
        method: "PUT",
        data: user,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data", res.data);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(getProfileAction());
      alert("cập nhật tài khoản thành công");
    } catch (error) {
      alert("cập nhật tài khoản thất bại");
      dispatch(getProfileAction());
      console.log(error);
    }
  };
};

export const changePasswordAction = (user) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await axios({
        url: "http://localhost:5000/user/editPassword",
        method: "PUT",
        data: user,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data", res.data);
      dispatch({
        type: CHANGE_PASSWORD,
        payload: res.data,
      });
      dispatch(getProfileAction());
      alert("Thay đổi mật khẩu thành công");
    } catch (error) {
      alert(error.response.data.error); //"Thay đổi mật khẩu thất bại"
      console.log("lỗi:", error);
    }
  };
};
