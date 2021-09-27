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
import format from "date-format";

const initialState = {
  listUser: [],
  listSearchUser: [],
  listMovie: [],
  listRapChieu: [],
  cumRapChieu: [],
  rapChieu: {},
  ngayChieu: [],
  gioChieu: [],
};

export const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LIST_USER_PAGE: {
      state.listUser = payload;
      return { ...state };
    }
    case DELETE_USER: {
      const listUserDelete = [...state.listUser.items];
      const index = listUserDelete.findIndex(
        (userDelete) => userDelete.taiKhoan === payload
      );
      if (index !== -1) {
        listUserDelete.splice(index, 1);
        state.listUser.items = listUserDelete;
      }

      const listUserSearchDelete = [...state.listSearchUser.items];
      const indexSearchDelete = listUserSearchDelete.findIndex(
        (userSearchDelete) => userSearchDelete.taiKhoan === payload
      );
      if (indexSearchDelete !== -1) {
        listUserSearchDelete.splice(index, 1);
        state.listSearchUser.items = listUserSearchDelete;
      }
      return { ...state };
    }
    case UPDATE_USER: {
      const listUserUpdate = [...state.listUser.items];
      for (let i = 0; i < listUserUpdate.length; i++) {
        if (i === payload[1]) {
          listUserUpdate[i] = payload[0];
          listUserUpdate[i].soDt = payload[0].soDT;
          listUserUpdate[i].maLoaiNguoiDung = payload[0].loaiNguoiDung;
        }
      }
      state.listUser.items = listUserUpdate;
      if (payload[2] !== "") {
        const listUserSearchUpdate = [...state.listSearchUser.items];
        for (let i = 0; i < listUserSearchUpdate.length; i++) {
          if (i === payload[1]) {
            listUserSearchUpdate[i] = payload[0];
            listUserSearchUpdate[i].soDt = payload[0].soDT;
            listUserSearchUpdate[i].maLoaiNguoiDung = payload[0].loaiNguoiDung;
          }
        }
        state.listSearchUser.items = listUserSearchUpdate;
      }

      return { ...state };
    }
    case GET_LIST_SEARCH_USER_PAGE: {
      state.listSearchUser = payload;
      return { ...state };
    }
    case ADD_NEW_USER: {
      return { ...state };
    }
    case GET_LIST_MOVIE_PAGE: {
      state.listMovie = payload;
      return { ...state };
    }
    case DELETE_MOVIE: {
      const listMovieDelete = [...state.listMovie.items];
      const index = listMovieDelete.findIndex(
        (movieDelete) => movieDelete.maPhim === payload
      );
      if (index !== -1) {
        listMovieDelete.splice(index, 1);
        state.listUser.items = listMovieDelete;
      }
      return { ...state };
    }
    case UPDATE_MOVIE: {
      const listMovieUpdate = [...state.listUser.items];
      for (let i = 0; i < listMovieUpdate.length; i++) {
        if (i === payload[1]) {
          listMovieUpdate[i] = payload[0];
        }
      }
      state.listUser.items = listMovieUpdate;
      return { ...state };
    }
    case ADD_NEW_MOVIE: {
      return { ...state };
    }
    case GET_RAP_CHIEU_ADMIN: {
      state.listRapChieu = payload;
      return { ...state };
    }
    case GET_CUM_RAP_CHIEU: {
      state.ngayChieu = [];
      state.gioChieu = [];
      const listRapChieu = [...state.listRapChieu.heThongRapChieu];
      for (let i = 0; i < listRapChieu.length; i++) {
        if (listRapChieu[i].maHeThongRap === payload) {
          state.cumRapChieu = listRapChieu[i];
        }
      }
      return { ...state };
    }
    case GET_NGAY_CHIEU: {
      state.gioChieu = [];
      const cumRapChieu = [...state.cumRapChieu.cumRapChieu];
      for (let i = 0; i < cumRapChieu.length; i++) {
        if (cumRapChieu[i].maCumRap === payload) {
          state.rapChieu = cumRapChieu[i];
        }
      }
      let locNgayXem = [];
      for (let i = 0; i < state.rapChieu?.lichChieuPhim.length; i++) {
        if (
          locNgayXem.indexOf(
            format(
              "dd/MM/yyyy",
              new Date(state.rapChieu?.lichChieuPhim[i].ngayChieuGioChieu)
            )
          ) === -1
        ) {
          locNgayXem.push(
            format(
              "dd/MM/yyyy",
              new Date(state.rapChieu?.lichChieuPhim[i].ngayChieuGioChieu)
            )
          );
        }
      }
      state.ngayChieu = locNgayXem;
      return { ...state };
    }
    case GET_GIO_CHIEU_ADMIN: {
      let locGioChieu = [];
      for (let i = 0; i < state.rapChieu?.lichChieuPhim.length; i++) {
        if (
          format(
            "dd/MM/yyyy",
            new Date(state.rapChieu?.lichChieuPhim[i].ngayChieuGioChieu)
          ) === payload
        ) {
          locGioChieu.push(state.rapChieu?.lichChieuPhim[i]);
        }
      }
      state.gioChieu = locGioChieu;
      return { ...state };
    }
    case CHANGE_MOVIE: {
      state.listRapChieu = [];
      state.cumRapChieu = [];
      state.rapChieu = {};
      state.ngayChieu = [];
      state.gioChieu = [];
      return { ...state };
    }
    case TAO_LICH_CHIEU: {
      state.rapChieu = [];
      state.cumRapChieu = [];
      state.ngayChieu = [];
      state.gioChieu = [];
      return { ...state };
    }
    default:
      return { ...state };
  }
};
