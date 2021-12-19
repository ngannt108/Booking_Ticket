import {
  FormControl,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getMovieListNowShowingAction } from "../store/actions/movieAction";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import format from "date-format";
import { Input } from "../../components/Input";
import MUIDataTable from "mui-datatables";
import Paper from "@material-ui/core/Paper";

import "./AddShowtime.css";
import {
  getCumRapChieuAction,
  getDetailBySlugAction,
  getListMoviePageAction,
  getRapChieuAction,
  taoLichChieuAction,
} from "../../store/actions/adminAction";
import { getMovieDetailAction } from "../../store/actions/movieAction";
// import { getMovieDetailAction } from "../../store/actions/movieAction";

function AddShowTime() {
  const dispatch = useDispatch();
  const moviedetail = useSelector((state) => state.movieList.movieDetail);
  //const [movieDetail, setMovieDetail] = useState("")
  const [maPhim, setMaPhim] = useState("");
  const [biDanh, setBiDanh] = useState(""); //
  const [ngayChieuPhim, setNgayChieuPhim] = useState(""); //
  const [movieDetail, setMovieDetail] = useState("");
  const [showTime, setShowTime] = useState("");
  useEffect(() => {
    dispatch(getRapChieuAction());
    dispatch(getListMoviePageAction());
    dispatch(getCumRapChieuAction());
  }, []); //dispatch
  useEffect(() => {
    if (biDanh) dispatch(getMovieDetailAction(biDanh, setMovieDetail));
  }, [movieDetail]); //dispatch

  const movieList = useSelector((state) => state.admin.listMovie);

  const renderPhim = () => {
    return movieList?.map((movie, index) => {
      return (
        <MenuItem key={index} value={movie.biDanh}>
          {movie.tenPhim}
        </MenuItem>
      );
    });
  };
  const handleChangePhim = async (e) => {
    setBiDanh(e.target.value);
    dispatch(getMovieDetailAction(e.target.value, setMovieDetail));
    //dispatch(getMovieDetailAction(biDanh, setMovieDetail))

    // setThoiLuong(movieDetail.thoiLuong)
    // console.log('thời lượng', thoiLuong)
  };

  const listRapChieu = useSelector((state) => state.admin.listRapChieu);
  const renderRapChieu = () => {
    return listRapChieu?.map((rap, index) => {
      return (
        <MenuItem key={index} value={rap._id}>
          {rap.tenRap}
        </MenuItem>
      );
    });
  };

  const [maRap, setMaRap] = useState();
  const handleChangeMaRap = (e) => {
    setMaRap(e.target.value);
    console.log("mã rạp", maRap);
    // setLichChieu({
    //     ...lichChieu,
    //     maRap: e.target.value,
    // });
  };

  const cumRapChieu = useSelector((state) => state.admin.cumRapChieu);
  const renderCumRapChieu = () => {
    return cumRapChieu?.map((cumRap, index) => {
      return (
        <MenuItem key={index} value={cumRap._id}>
          {cumRap.tenCumRap}
        </MenuItem>
      );
    });
  };

  const [maCumRap, setMaCumRap] = useState("");
  const handleChangeCumRapChieu = (e) => {
    setMaCumRap(e.target.value);
    console.log("mã cụm rạp", maCumRap);
    //  dispatch(getDanhSachRapAction(maHeThongRap, e.target.value));
  };

  const handleTaoLichChieu = () => {
    // if (
    //     lichChieu.maPhim !== "" &&
    //     lichChieu.ngayChieuGioChieu !== "" &&
    //     lichChieu.maRap !== "" &&
    //     lichChieu.giaVe !== ""
    // )
    const lichChieuCuaPhim = {
      tenCumRap: maCumRap,
      tenRap: maRap,
      ngayChieu: ngayChieuPhim,
      giaVe: 75000,
    };

    console.log("--*_____*--");
    console.log("tên cụm rap", maCumRap);
    console.log("tên  rap", maRap);
    console.log("ngày chiếu phim", ngayChieuPhim);
    console.log("bí danh", biDanh);
    dispatch(taoLichChieuAction(lichChieuCuaPhim, biDanh));

    //dispatch(getMovieDetailAction(biDanh, setMovieDetail))
  };
  const formatDate = (date) => {
    if (date) {
      const d = new Date(date); //d.toLocaleString("en-AU")//

      return d.toLocaleString("en-AU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }); // `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };
  const formatTime = (date) => {
    if (date) {
      const d = new Date(date); //d.toLocaleString("en-AU")//
      const time = d.toLocaleString("en-AU", {
        hour: "numeric",
        minute: "numeric",
      });
      return time;
    }
    return "";
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <FormControl className="formPhim" style={{ width: "100%" }}>
                <InputLabel
                  style={{
                    left: 20,
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  Phim
                </InputLabel>
                <Select
                  labelId="phim-select-label"
                  id="phim-select"
                  //value={biDanh}
                  onChange={handleChangePhim}
                  disableUnderline
                >
                  {renderPhim()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl className="formPhim" style={{ width: "100%" }}>
                <InputLabel
                  style={{
                    left: 20,
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  Cụm rạp
                </InputLabel>
                <Select
                  labelId="phim-select-label"
                  disableUnderline
                  onChange={handleChangeCumRapChieu}
                >
                  {renderCumRapChieu()}
                  {/* {renderCumRap()} */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <Input
                Label="Khung giờ chiếu"
                placeholder="Nhập khung giờ chiếu"
                value={ngayChieuPhim}
                type="datetime-local"
                onChange={(e) => setNgayChieuPhim(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <FormControl className="formPhim" style={{ width: "100%" }}>
                <InputLabel
                  style={{
                    left: 20,
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  Danh sách rạp
                </InputLabel>
                <Select
                  labelId="phim-select-label"
                  disableUnderline
                  onChange={handleChangeMaRap}
                >
                  {renderRapChieu()}
                  {/* {renderDanhSachRap()} */}
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item md={6}>
                            <FormControl
                                className='formPhim'
                                style={{ width: "100%" }}
                            >
                                <InputLabel
                                    style={{
                                        left: 20,
                                        color: "rgba(0, 0, 0, 0.54)",
                                    }}
                                >
                                    Giá vé
                                </InputLabel>
                                <Select
                                    labelId="phim-select-label"
                                    disableUnderline
                                    value={giaVe}
                                    onChange={handleChangeGiaVe}
                                >
                                    <MenuItem value="75000">75k</MenuItem>
                                    <MenuItem value="100000">100k</MenuItem>
                                    <MenuItem value="120000">120k</MenuItem>
                                    <MenuItem value="200000">200k</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
          </Grid>
          <br />
          <Grid item md={12}>
            <Button
              className="btn btn-success font-weight-bold font-italic create-showtime"
              onClick={() => handleTaoLichChieu()}
              fullWidth
              disabled={
                biDanh !== "" &&
                  maCumRap !== "" &&
                  maRap !== "" &&
                  ngayChieuPhim !== ""
                  ? false
                  : true
              }
            >
              TẠO LỊCH CHIẾU
            </Button>
          </Grid>
        </Grid>

        {/* ĐỂ ĐÂY */}
        <h5 style={{ margin: "50px" }}>
          Ngày chiếu khởi {formatDate(movieDetail.ngayKhoiChieu)}
        </h5>
        <Grid item md={8}>
          <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Cụm rạp chiếu</TableCell>
                  <TableCell>Tên rạp</TableCell>
                  <TableCell>Ngày chiếu</TableCell>
                  <TableCell>Giờ chiếu</TableCell>
                  <TableCell>Giờ kết thúc</TableCell>
                </TableRow>
              </TableHead>
              {Array.isArray(movieDetail.lichChieu)
                ? movieDetail.lichChieu.map((showtime) => (
                  <TableBody>
                    <>
                      <TableCell>
                        <div className="fixoverflow">
                          {showtime.tenCumRap.tenCumRap}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="fixoverflow">
                          {showtime.tenRap.tenRap}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="fixoverflow">
                          {formatDate(showtime.ngayChieu)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="fixoverflow">
                          {formatTime(showtime.ngayChieu)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="fixoverflow">
                          {formatTime(showtime.gioKetThuc)}
                        </div>
                      </TableCell>
                    </>
                  </TableBody>
                ))
                : []}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddShowTime;
