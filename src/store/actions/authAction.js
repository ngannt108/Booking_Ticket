import axios from "axios";
import Swal from "sweetalert2";
import { SIGN_IN, SIGN_UP, SIGN_OUT } from "../const/authConst";

export const signInAction = (auth, history) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/account/signin",
        data: auth,
      });
      const { token, data, expiresIn /*taiKhoan, maLoaiNguoiDung, ...authSignIn*/ } =
        res.data;
      // set localStorage
      //const maLichChieu = JSON.parse(localStorage.getItem("maLichChieu"));
      localStorage.setItem("token", JSON.stringify(token));
      //localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
      localStorage.setItem(
        "maLoaiNguoiDung",
        JSON.stringify(data.maLoaiNguoiDung)
      );
      localStorage.setItem("taiKhoan", JSON.stringify(data.tentaiKhoan));
      localStorage.setItem("thoiHan", JSON.stringify(expiresIn));
      const maLichChieu = JSON.parse(localStorage.getItem("maLichChieu"));
      const biDanh = JSON.parse(localStorage.getItem("biDanh"));

      // đẩy userLogin lên store
      if (JSON.parse(localStorage.getItem("maLoaiNguoiDung")) === "0") {
        history.push("/admin");
      } else if (maLichChieu !== null && biDanh !== null) {
        history.push(`${biDanh}/booking/${maLichChieu}`);
      } else {
        history.push("/");
      }
      setTimeout(() => {
        localStorage.clear()
        Swal.fire(
          "Thông Báo",
          "Phiên dùng đã hết hạn, hãy đăng nhập lại",//, tổng tiền đã là: " + Format(res.data.tongTien),
          "error"
        );
        setTimeout(() => { window.location.reload() }, 2000)
      }, expiresIn * 1000)
      dispatch({
        type: SIGN_IN,
        payload: res.data, //authSignIn,
      });
      return res.data;
    } catch (error) {
      // console.log(error);
      return true;
    }
  };
};

export const signUpAction = (auth, history, setError) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "http://localhost:5000/account/signUp",
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
      //Swal.fire("Thông Báo", "Bạn đã đăng kí không thành công", "error");
      setError(error.response.data.error);
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
