import axios from "axios";
import Swal from "sweetalert2";
import {
  ADD_NEW_MOVIE,
  ADD_NEW_USER,
  CHANGE_MOVIE,
  DELETE_MOVIE,
  DELETE_USER,
  GET_CUM_RAP_CHIEU,
  GET_GIO_CHIEU_ADMIN,
  GET_LIST_MOVIE_PAGE,
  GET_LIST_SEARCH_USER_PAGE,
  GET_LIST_USER_PAGE,
  GET_NGAY_CHIEU,
  GET_RAP_CHIEU_ADMIN,
  TAO_LICH_CHIEU,
  UPDATE_MOVIE,
  UPDATE_USER,
} from "../const/adminConst";

export const getListUserPageAction = (maNhom, soTrang, soPhanTuTrenTrang) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
        method: "GET",
      });
      //   console.log(res.data);
      dispatch({
        type: GET_LIST_USER_PAGE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserAction = (
  tuKhoa,
  taiKhoan,
  maNhom,
  soTrang,
  soPhanTuTrenTrang
) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        method: "DELETE",
        data: taiKhoan,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      dispatch({
        type: DELETE_USER,
        payload: taiKhoan,
      });
      dispatch(await getListUserPageAction(maNhom, soTrang, soPhanTuTrenTrang));
      dispatch(
        await getListSearchUserPageAction(
          tuKhoa,
          maNhom,
          soTrang,
          soPhanTuTrenTrang
        )
      );
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
};

export const updateUserAction = (user, index, tuKhoa) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "PUT",
        data: user,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: UPDATE_USER,
        payload: [res.data, index, tuKhoa],
      });
      alert("cập nhật tài khoản thành công");
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };
};

export const getListSearchUserPageAction = (
  tuKhoa,
  maNhom,
  soTrang,
  soPhanTuTrenTrang
) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=${maNhom}&tuKhoa=${tuKhoa}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
        data: "",
      });
      //   console.log("data" ,res.data);
      dispatch({
        type: GET_LIST_SEARCH_USER_PAGE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewUserAction = (
  user,
  maNhom,
  soTrang,
  soPhanTuTrenTrang,
  tuKhoa
) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: user,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("thêm người dùng thành công");
      dispatch(await getListUserPageAction(maNhom, soTrang, soPhanTuTrenTrang));
      dispatch(
        await getListSearchUserPageAction(
          tuKhoa,
          maNhom,
          soTrang,
          soPhanTuTrenTrang
        )
      );
      dispatch({
        type: ADD_NEW_USER,
        payload: res.data,
      });
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
};

// --------------------MOVIE-------------
export const getListMoviePageAction = (maNhom, soTrang, soPhanTuTrenTrang) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
        method: "GET",
      });
      //   console.log(res.data);
      dispatch({
        type: GET_LIST_MOVIE_PAGE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMovieAction = (
  maPhim,
  maNhom,
  soTrang,
  soPhanTuTrenTrang
) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
        method: "DELETE",
        data: maPhim,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      dispatch(
        await getListMoviePageAction(maNhom, soTrang, soPhanTuTrenTrang)
      );
      dispatch({
        type: DELETE_MOVIE,
        payload: maPhim,
      });
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
};

export const updateMovieAction = (
  form_data,
  index,
  maNhom,
  soTrang,
  soPhanTuTrenTrang
) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
        method: "POST",
        data: form_data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: UPDATE_MOVIE,
        payload: [res.data, index],
      });
      dispatch(
        await getListMoviePageAction(maNhom, soTrang, soPhanTuTrenTrang)
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const addNewMovieAction = (
  form_data,
  maNhom,
  soTrang,
  soPhanTuTrenTrang
) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
        method: "POST",
        data: form_data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("thêm phim thành công");
      dispatch(
        await getListMoviePageAction(maNhom, soTrang, soPhanTuTrenTrang)
      );
      dispatch({
        type: ADD_NEW_MOVIE,
        payload: res.data,
      });
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
};

// TAO_LICH_CHIEU
export const getRapChieuAdminAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: "GET",
      });
      dispatch({
        type: GET_RAP_CHIEU_ADMIN,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCumRapChieuAction = (maHeThongRap) => {
  return {
    type: GET_CUM_RAP_CHIEU,
    payload: maHeThongRap,
  };
};

export const getNgayChieuAction = (maCumRap) => {
  return {
    type: GET_NGAY_CHIEU,
    payload: maCumRap,
  };
};

export const getGioChieuAdminAction = (ngay) => {
  return {
    type: GET_GIO_CHIEU_ADMIN,
    payload: ngay,
  };
};

export const changeMovieAction = () => {
  return {
    type: CHANGE_MOVIE,
  };
};

export const taoLichChieuAction = (lichChieu, maPhim, maHeThongRap) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
        method: "POST",
        data: lichChieu,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire("Thông báo", "Tạo lịch chiếu thành công", "success");
      console.log(res.data);
      dispatch({
        type: TAO_LICH_CHIEU,
      });
      dispatch(await getRapChieuAdminAction(maPhim));
    } catch (error) {
      Swal.fire("Thông báo", error.response.data, "error");
      console.log(error);
    }
  };
};
