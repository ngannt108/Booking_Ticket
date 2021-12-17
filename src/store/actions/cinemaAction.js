import axios from "axios";
import { GET_DANH_SACH_RAP } from "../const/adminConst";
import {
  GET_CINEMA_CLUSTER, //
  GET_CINEMA_MOVIE, //
  GET_MOVIE, //
  LAM_MOI_TRANG,
  LAY_CHI_TIET_PHIM,
} from "../const/cinemaConst";

export const getCinemaClusterAction = () => {
  //maRap
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/admin/movie/movietheater`,
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

export const getCinemaMovieAction = () => {
  //maRap
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/admin/movie/movietheater`,
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
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/movie/cluster/${rap}`,
        method: "GET",
      });
      dispatch({
        type: GET_MOVIE,
        payload: res.data,
      });
      console.log("dispatch", res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const layChiTietAction = (gio, ngayXem) => {
  return {
    type: LAY_CHI_TIET_PHIM,
    payload: [gio, ngayXem],
  };
};

export const lamMoiTrangAction = () => {
  return {
    type: LAM_MOI_TRANG,
  };
};
