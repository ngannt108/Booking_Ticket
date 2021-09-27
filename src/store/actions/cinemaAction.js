import axios from "axios";
import { GET_DANH_SACH_RAP } from "../const/adminConst";
import {
  GET_CINEMA_CLUSTER,
  GET_CINEMA_LIST,
  GET_CINEMA_MOVIE,
  GET_MOVIE,
  LAM_MOI_TRANG,
  LAY_CHI_TIET_PHIM,
  LAY_GIO_CHIEU_PHIM,
  LAY_HE_THONG_RAP_CHIEU,
  LAY_LICH_CHIEU,
  LAY_MA_LICH_CHIEU,
  LAY_NGAY_XEM,
  LAY_TEN_PHIM,
  LAY_THONG_TIN_LICH_CHIEU_PHIM,
} from "../const/cinemaConst";

export const getCinemaListAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
        method: "GET",
      });
      //   console.log(res.data);
      dispatch({
        type: GET_CINEMA_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCinemaClusterAction = (maRap) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`,
        method: "GET",
      });
      dispatch({
        type: GET_CINEMA_CLUSTER,
        payload: res.data,
      });
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCinemaMovieAction = (maRap) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maRap}&maNhom=GP01`,
        method: "GET",
      });
      dispatch({
        type: GET_CINEMA_MOVIE,
        payload: res.data,
      });
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMovieAction = (rap) => {
  return {
    type: GET_MOVIE,
    payload: rap,
  };
};

export const layTenPhimAction = (tenPhim) => {
  return {
    type: LAY_TEN_PHIM,
    payload: tenPhim,
  };
};

export const layNgayXemAction = (ngayXem) => {
  return {
    type: LAY_NGAY_XEM,
    payload: ngayXem,
  };
};

export const layChiTietAction = (gio, ngayXem) => {
  return {
    type: LAY_CHI_TIET_PHIM,
    payload: [gio, ngayXem],
  };
};

export const getDanhSachRapAction = (maHeThongRap, maCumRap) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
        method: "GET",
      });
      dispatch({
        type: GET_DANH_SACH_RAP,
        payload: [res.data, maCumRap],
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const layThongTinLichChieuPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: "GET",
      });
      dispatch({
        type: LAY_THONG_TIN_LICH_CHIEU_PHIM,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const layCumRapChieuAction = (maHeThongRap) => {
  return {
    type: LAY_HE_THONG_RAP_CHIEU,
    payload: maHeThongRap,
  };
};

export const layLichChieuAction = (maCumRap) => {
  return {
    type: LAY_LICH_CHIEU,
    payload: maCumRap,
  };
};

export const layGioChieuPhimAction = (ngay) => {
  return {
    type: LAY_GIO_CHIEU_PHIM,
    payload: ngay,
  };
};

export const layMaLichChieuPhimAction = (ngay, gio) => {
  return {
    type: LAY_MA_LICH_CHIEU,
    payload: [ngay, gio],
  };
};

export const lamMoiTrangAction = () => {
  return {
    type: LAM_MOI_TRANG,
  };
};
