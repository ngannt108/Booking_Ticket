import format from "date-format";
import {
  GET_GIO_CHIEU,
  GET_MOVIE_DETAIL,
  GET_MOVIE_DETAIL_CLUSTER,
  GET_MOVIE_LIST_NOW_SHOWING,
  GET_MOVIE_LIST_UP_COMING,
  GET_NGAY_XEM,
  GET_RAP,
  LAY_CHI_TIET,
  REMOVE_CURRENT_MOVIE_DETAIL,
} from "../const/movieConst";

const initialState = {
  movieListNowShowing: [],
  movieListUpComing: [],
  movieDetail: [],
  movieDetailCluster: [],
  rap: [],
  rapChieu: [],
  ngayXem: [],
  ngayXemPhim: [],
  gioChieu: [],
  layChiTiet: [],
  phimCanXem: {},
};

export const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_LIST_NOW_SHOWING:
      state.phimCanXem = [];
      state.movieListNowShowing = payload;
      return { ...state };
    case GET_MOVIE_LIST_UP_COMING:
      state.movieListUpComing = payload;
      return { ...state };
    case GET_MOVIE_DETAIL: {
      state.movieDetail = payload;
      return { ...state };
    }
    case GET_MOVIE_DETAIL_CLUSTER: {
      let newMovieDetail = { ...state.movieDetail };
      state.movieDetailCluster = [];
      for (let i = 0; i < newMovieDetail.lichChieu?.length; i++) {
        if (newMovieDetail.lichChieu[i].thongTinRap.maCumRap === payload) {
          state.movieDetailCluster.push(newMovieDetail.lichChieu[i]);
        }
      }
      return { ...state };
    }
    case REMOVE_CURRENT_MOVIE_DETAIL: {
      state.movieDetailCluster = [];
      return { ...state };
    }
    case GET_RAP: {
      state.gioChieu = [];
      state.ngayXemPhim = [];
      state.phimCanXem = [];
      state.rap = payload.heThongRapChieu;
      let rapChieu = [];
      for (let i = 0; i < state.rap.length; i++) {
        rapChieu.push(state.rap[i].cumRapChieu);
      }
      state.rapChieu = rapChieu;
      return { ...state };
    }
    case GET_NGAY_XEM: {
      state.ngayXemPhim = [];
      state.gioChieu = [];
      state.phimCanXem = [];
      const newRapChieu = [...state.rapChieu];
      // console.log("newRapChieu", newRapChieu);
      for (let i = 0; i < newRapChieu.length; i++) {
        for (let j = 0; j < newRapChieu[i].length; j++) {
          // console.log(newRapChieu[i][j]);
          if (newRapChieu[i][j].maCumRap === payload) {
            state.ngayXem = newRapChieu[i][j];
          }
        }
      }
      let locNgayXem = [];
      for (let i = 0; i < state.ngayXem?.lichChieuPhim.length; i++) {
        if (
          locNgayXem.indexOf(
            format(
              "dd/MM/yyyy",
              new Date(state.ngayXem?.lichChieuPhim[i].ngayChieuGioChieu)
            )
          ) === -1
        ) {
          locNgayXem.push(
            format(
              "dd/MM/yyyy",
              new Date(state.ngayXem?.lichChieuPhim[i].ngayChieuGioChieu)
            )
          );
        }
      }

      state.ngayXemPhim = locNgayXem;
      return { ...state };
    }
    case GET_GIO_CHIEU: {
      state.phimCanXem = [];
      let locGioChieu = [];
      for (let i = 0; i < state.ngayXem?.lichChieuPhim.length; i++) {
        if (
          format(
            "dd/MM/yyyy",
            new Date(state.ngayXem?.lichChieuPhim[i].ngayChieuGioChieu)
          ) === payload
        ) {
          locGioChieu.push(
            format(
              "hh:mm",
              new Date(state.ngayXem?.lichChieuPhim[i].ngayChieuGioChieu)
            )
          );
          // console.log(state.ngayXem?.lichChieuPhim[i]);
          state.layChiTiet.push(state.ngayXem?.lichChieuPhim[i]);
        }
      }
      state.gioChieu = locGioChieu;
      return { ...state };
    }
    case LAY_CHI_TIET: {
      for (let i = 0; i < state.layChiTiet?.length; i++) {
        if (
          format(
            "dd/MM/yyyy",
            new Date(state.layChiTiet[i]?.ngayChieuGioChieu)
          ) === payload[0] &&
          format("hh:mm", new Date(state.layChiTiet[i]?.ngayChieuGioChieu)) ===
            payload[1]
        ) {
          state.phimCanXem = state.layChiTiet[i];
        }
      }
      // console.log(state.phimCanXem);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
