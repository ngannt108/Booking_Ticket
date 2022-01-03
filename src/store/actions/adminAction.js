import axios from "axios";
import Swal from "sweetalert2";
import {
  ADD_NEW_MOVIE, //
  DELETE_MOVIE, //
  GET_CUM_RAP_CHIEU,//
  GET_LIST_MOVIE_PAGE,//
  GET_LIST_USER_PAGE, //
  GET_RAP_CHIEU, //
  TAO_LICH_CHIEU,//
  UPDATE_MOVIE, //
  // GET_DETAIL_BY_SLUG,//
  CHANGE_MOVIE
} from "../const/adminConst";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMovieDetailAction } from "./movieAction";

export const getListUserPageAction = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: `http://localhost:5000/admin/user`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('danh sách người dùng', res.data);
      dispatch({
        type: GET_LIST_USER_PAGE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// --------------------MOVIE-------------
export const getListMoviePageAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/movie`,
        method: "GET",
      });
      // console.log('phim', res.data);
      dispatch({
        type: GET_LIST_MOVIE_PAGE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}; //XONG


export const deleteMovieAction = (
  biDanh, setIsOpen
) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: `http://localhost:5000/admin/movie/${biDanh}`,
        method: "DELETE",
        data: biDanh,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setIsOpen(false)
      dispatch(
        await getListMoviePageAction()
      );
      dispatch({
        type: DELETE_MOVIE,
        payload: biDanh,
      });
      toast.success('Xóa thành công ', { autoClose: 2000 });
    } catch (error) {
      toast.error('Vẫn đang có lịch chiếu ở thời điểm sắp tới, chưa thể xóa phim', { autoClose: 2000 });
      //alert(error.response.data);
      console.log(error);
    }
  };
}; //XONG

export const updateMovieAction = (
  biDanh, movie, fd, setError, setIsEdit
) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: `http://localhost:5000/admin/movie/${biDanh}`,
        method: "PUT",
        data: movie,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        if (fd != null) {
          axios({
            url: "http://localhost:5000/admin/upload",
            method: "POST",
            data: fd,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((e) => {
            setIsEdit(false)
            dispatch({
              type: UPDATE_MOVIE,
              payload: [res.data],
            });
            toast.success('Đã chỉnh sửa thông tin phim', { autoClose: 2000 });
          })
            .catch((e) => {
              toast.error("Chỉnh sửa ảnh thất bại", { autoClose: 2000 });
            })
        }
        dispatch(
          await getListMoviePageAction()

        );
      }


    } catch (err) {
      //toast.error(error.response.data.error, { autoClose: 2000 });
      setError(err.response.data.error)
      //console.log(error.response.data);
    }
  };
}; //XONG

export const addNewMovieAction = (
  form_data, fd, setError, setIsAdd
) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: "http://localhost:5000/admin/movie",
        method: "POST",
        data: form_data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        if (fd != null) {
          axios({
            url: "http://localhost:5000/admin/upload",
            method: "POST",
            data: fd,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((e) => {
            dispatch({
              type: ADD_NEW_MOVIE,
              payload: res.data,
            });
            toast.success('Tạo phim mới thành công', { autoClose: 2000 });

          })
            .catch((e) => {
              toast.error('Lưu thất bại', { autoClose: 2000 });
            })
        }

        dispatch(
          await getListMoviePageAction()
        );
        setIsAdd(false)
      }

    } catch (err) {
      //toast.error(error.response.data.error, { autoClose: 2000 });
      setError(err.response.data.error)

      // alert(error.response.data);

    }
  };
};////XONG

// TAO_LICH_CHIEU
// export const getRapChieuAdminAction = (maPhim) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios({
//         url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
//         method: "GET",
//       });
//       dispatch({
//         type: GET_RAP_CHIEU_ADMIN,
//         payload: res.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
export const getRapChieuAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/admin/movie/room`,
        method: "GET",
      });
      console.log('rạp chiếu', res.data)
      dispatch({
        type: GET_RAP_CHIEU,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCumRapChieuAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/admin/movie/movietheater`,
        method: "GET",
      });
      console.log('cụm rạp chiếu', res.data)

      dispatch({
        type: GET_CUM_RAP_CHIEU,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const taoLichChieuAction = (lichChieu, biDanh, setMovieDetail) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: `http://localhost:5000/admin/movie/${biDanh}/showtime`,
        method: "POST",
        data: lichChieu,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        // Swal.fire("Thông báo", "Tạo lịch chiếu thành công", "success");
        toast.success('Tạo lịch chiếu  thành công', { autoClose: 2000 });
        console.log('in lịch chiếu', res.data);
        dispatch({
          type: TAO_LICH_CHIEU,
          payload: res.data,
        });
        dispatch(getCumRapChieuAction())
        // var setMovieDetail
        dispatch(getMovieDetailAction(biDanh, setMovieDetail))
        // const detail = await axios({
        //   url: `http://localhost:5000/movie/${biDanh}`,
        //   method: "GET",
        // });
        // setMovieDetail(detail)
      }

      // dispatch(await getRapChieuAdminAction(maPhim));
    } catch (error) {
      toast.error(error.response.data.error, { autoClose: 2000 });
      // Swal.fire("Thông báo", , "error");
      console.log(error);
    }
  };
};

// export const getDetailBySlugAction = (
//   biDanh, setMovieDetail
// ) => {
//   return async (dispatch) => {
//     try {
//       const token = JSON.parse(localStorage.getItem("token"));
//       const res = await axios({
//         url: `http://localhost:5000/movie/${biDanh}`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       //toast.success('Lịch chiếu của phim ', { autoClose: 2000 });
//       console.log('Lịch chiếu của phim', res.data);
//       dispatch({
//         type: GET_DETAIL_BY_SLUG,
//         payload: res.data.data,
//       });
//       setMovieDetail(res.data.data)
//     } catch (error) {
//       //alert(error.response.data);
//       console.log(error);
//     }
//   };
// }; //XONG


export const changeMovieAction = () => {
  return {
    type: CHANGE_MOVIE,
  };
};
