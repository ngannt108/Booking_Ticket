import axios from 'axios';
import Swal from 'sweetalert2';
import {
  CHOICE_CHAIR,
  DAT_VE_THANH_CONG,
  GET_CHAIR_LIST,
  SET_LOADING,
  SET_BTN_LOADING,
} from '../const/bookingConst';

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

export const getTicketListAction = (maLichChieu) => {
  let isLoading = true;
  return async (dispatch) => {
    dispatch(setLoadingAction(isLoading));
    try {
      const res = await axios({
        method: 'GET',
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
      });
      isLoading = false;
      dispatch(setLoadingAction(isLoading));
      dispatch({
        type: GET_CHAIR_LIST,
        payload: res.data,
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

export const bookingTicketAction = (maLichChieu, danhSachVe) => {
  let isLoading = true;
  return async (dispatch) => {
    dispatch(setBtnLoadingAction(isLoading));
    try {
      // get localStorage
      const token = JSON.parse(localStorage.getItem('token'));
      const taiKhoan = JSON.parse(localStorage.getItem('taiKhoan'));

      const res = await axios({
        url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe',
        method: 'POST',
        data: {
          maLichChieu,
          danhSachVe,
          taiKhoanNguoiDung: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      isLoading = false;
      dispatch(setBtnLoadingAction(isLoading));
      Swal.fire('Thông Báo', 'Bạn đã đặt vé thành công', 'success');
      dispatch(await getTicketListAction(maLichChieu));
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
