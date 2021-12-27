import {
  ADD_NEW_MOVIE,
  DELETE_MOVIE, //
  GET_CUM_RAP_CHIEU,//
  GET_LIST_MOVIE_PAGE, //
  GET_LIST_USER_PAGE,//
  GET_RAP_CHIEU, //
  TAO_LICH_CHIEU,//
  UPDATE_MOVIE,
  GET_DETAIL_BY_SLUG,
  CHANGE_MOVIE
} from "../const/adminConst";

const initialState = {
  listUser: [],
  detailMovie: {},
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
    case GET_LIST_MOVIE_PAGE: {
      state.listMovie = payload;
      return { ...state };
    }
    case DELETE_MOVIE: {
      //const listMovieDelete = [...state.listMovie.items];
      // const index = listMovieDelete.findIndex(
      //   (movieDelete) => movieDelete.maPhim === payload
      // );
      // if (index !== -1) {
      //   listMovieDelete.splice(index, 1);
      //   state.listUser.items = listMovieDelete;
      // }
      return { ...state }; //
    }
    case UPDATE_MOVIE: {
      // const listMovieUpdate = [...state.listUser.items];
      // for (let i = 0; i < listMovieUpdate.length; i++) {
      //   if (i === payload[1]) {
      //     listMovieUpdate[i] = payload[0];
      //   }
      // }
      // state.listUser.items = listMovieUpdate;
      state.detailMovie = payload
      return { ...state };
    }//
    case ADD_NEW_MOVIE: {
      state.listMovie = payload;
      return { ...state }; //
    }

    case GET_RAP_CHIEU: {
      state.listRapChieu = payload;
      return { ...state };
    }
    case GET_CUM_RAP_CHIEU: {

      state.cumRapChieu = payload;

      return { ...state };
    }
    case GET_DETAIL_BY_SLUG: {
      state.detailMovie = payload;

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
    // case GET_CUM_RAP_CHIEU: {

    //   const listRapChieu = [...state.listRapChieu.heThongRapChieu];
    //   for (let i = 0; i < listRapChieu.length; i++) {
    //     if (listRapChieu[i].maHeThongRap === payload) {
    //       state.cumRapChieu = listRapChieu[i];
    //     }
    //   }
    //   return { ...state };
    // }

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
