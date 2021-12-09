import axios from "axios";
import Swal from "sweetalert2";
import { SIGN_IN, SIGN_UP, SIGN_OUT } from "../const/authConst";

export const signInAction = (auth, history) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/sign/signin",
        data: auth,
      });
      const { accessToken, tentaiKhoan, maLoaiNguoiDung, ...authSignIn } =
        res.data;
      // set localStorage
      // const maLichChieu = JSON.parse(localStorage.getItem("maLichChieu"));
      localStorage.setItem("token", JSON.stringify(accessToken));
      localStorage.setItem("tentaiKhoan", JSON.stringify(tentaiKhoan));
      localStorage.setItem("maLoaiNguoiDung", JSON.stringify(maLoaiNguoiDung));
      // đẩy userLogin lên store
      dispatch({
        type: SIGN_IN,
        payload: authSignIn,
      });
      // // chuyển trang
      // if (maLichChieu !== null) {
      //   history.push(`/booking/${maLichChieu}`);
      // } else {
      //   history.push("/");
      // }
      return res.data;
    } catch (error) {
      // console.log(error);
      return true;
    }
  };
};

export const signUpAction = (auth, history) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "http://localhost:5000/sign/signUp",
        method: "POST",
        data: auth,
      });
      const { ...authSignUp } = res.data;
      dispatch({
        type: SIGN_UP,
        payload: authSignUp,
      });
      Swal.fire("Thông Báo", "Bạn đã đăng kí thành công", "success");
      history.push("/sign-in");
    } catch (error) {
      Swal.fire("Thông Báo", "Bạn đã đăng kí không thành công", "error");
      console.log(error);
    }
  };
};

export const signOutActions = (history) => {
  return (dispatch) => {
    localStorage.clear();
    history.push("/");
    dispatch({
      type: SIGN_OUT,
    });
  };
};
