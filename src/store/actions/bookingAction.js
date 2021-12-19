import axios from "axios";
import Swal from "sweetalert2";
import {
  CHOICE_CHAIR,
  DAT_VE_THANH_CONG,
  GET_CHAIR_LIST,
  SET_LOADING,
  SET_BTN_LOADING,
  GET_CHAIR_BOOKED_LIST,
  GET_INFO_MOVIE,
} from "../const/bookingConst";

export const setLoadingAction = (data) => {
  return {
    type: SET_LOADING,
    payload: data,
  };
};

export const setBtnLoadingAction = (data) => {
  return {
    type: SET_BTN_LOADING,
    payload: data,
  };
};

export const getTicketListAction = (biDanh, showTimeCode) => {
  //XONG
  let isLoading = true;
  return async (dispatch) => {
    dispatch(setLoadingAction(isLoading));
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:5000/movie/${biDanh}`,
      });
      isLoading = false;
      var rap;
      dispatch(setLoadingAction(isLoading));

      res.data[0].lichChieu.forEach((lich) => {
        if (lich._id == showTimeCode) rap = lich;
      });
      console.log("data", rap);
      dispatch({
        type: GET_CHAIR_LIST,
        payload: rap.tenRap, //res.data
      });
      dispatch({
        type: GET_CHAIR_BOOKED_LIST,
        payload: rap.gheDaChon, //res.data
      });
      dispatch({
        type: GET_INFO_MOVIE,
        payload: rap, //res.data
      });
    } catch (error) {
      console.log(error);
      isLoading = false;
      dispatch(setLoadingAction(isLoading));
    }
  };
};

export const choiceChairAction = (chair) => {
  return {
    type: CHOICE_CHAIR,
    payload: chair,
  };
};

export const bookingTicketAction = (IDshowtime, biDanh, { danhSachGhe }) => {
  let isLoading = true;
  return async (dispatch) => {
    dispatch(setBtnLoadingAction(isLoading));
    try {
      const Format = (x) => {
        return x.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
      };
      // get localStorage
      const token = JSON.parse(localStorage.getItem("token"));
      //const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan"));
      console.log("danh sách ghế, dispatch", danhSachGhe);
      const res = await axios({
        url: `http://localhost:5000/user/${biDanh}/showtime/${IDshowtime}`,
        method: "POST",
        data: { danhSachGhe },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      isLoading = false;
      dispatch(setBtnLoadingAction(isLoading));
      Swal.fire(
        "Thông Báo",
        "Bạn đã đặt vé thành công",//, tổng tiền đã là: " + Format(res.data.tongTien),
        "success"
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      dispatch(await getTicketListAction(biDanh, IDshowtime));
      dispatch({
        type: DAT_VE_THANH_CONG,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      isLoading = false;
      dispatch(setBtnLoadingAction(isLoading));
    }
  };
};
