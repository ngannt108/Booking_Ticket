import {
  FormControl,
  Grid,
  makeStyles,
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
import { getMovieListNowShowingAction } from "../store/actions/movieAction";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import format from "date-format";
import {
  changeMovieAction,
  getCumRapChieuAction,
  getGioChieuAdminAction,
  getNgayChieuAction,
  getRapChieuAdminAction,
  taoLichChieuAction,
} from "../store/actions/adminAction";
import Paper from "@material-ui/core/Paper";
import {
  getCinemaClusterAction,
  getCinemaListAction,
  getDanhSachRapAction,
} from "../store/actions/cinemaAction";

const useStyles = makeStyles((theme) => ({
  formWrap: {
    width: "100%",
    height: 80,
    position: "relative",
    zIndex: 4,
    "@media (max-width: 960px)": {
      display: "none",
    },
  },
  formBlock: {
    display: "block",
    position: "absolute",
    boxShadow: "0 0 10px rgb(0 0 0 / 30%)",
    borderRadius: 4,
    width: "90%",
    maxWidth: 940,
    height: "100%",
    left: "50%",
    transform: "translate(-50%, -55%)",
    backgroundColor: "white",
  },
  formPhim: {
    width: "30%",
    marginTop: 6,
    padding: "0 10px",
  },
  formOther: {
    width: "calc(70% / 4)",
    marginTop: 6,
    padding: "0 10px",
  },
  buttonWrap: {
    width: "calc(70% / 4)",
    margin: 0,
    float: "right",
    height: "100%",
    position: "relative",
  },
  button: {
    position: "absolute",
    top: "calc(50% - 3px)",
    left: "50%",
    transform: "translate(-50% , -50%)",
    backgroundColor: "#4a4a4a",
    color: "white",
    padding: "10px 20px",

    "&:hover": {
      backgroundColor: "#4a4a4a",
    },
  },
  fixoverflow: {
    overflow: "auto",
    height: "60vh",
  },
  table: {
    minWidth: 650,
  },
}));

function AdminTaoLichChieuPhim() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [maPhim, setMaPhim] = useState("");
  useEffect(() => {
    dispatch(getMovieListNowShowingAction("GP01"));
  }, [dispatch]);

  const movieList = useSelector((state) => {
    return state.movieList.movieListNowShowing;
  });

  const renderPhim = () => {
    return movieList?.map((movie, index) => {
      return (
        <MenuItem key={index} value={movie.maPhim}>
          {movie.tenPhim}
        </MenuItem>
      );
    });
  };
  const handleChangePhim = (e) => {
    setMaPhim(e.target.value);
    setLichChieu({
      ...lichChieu,
      maPhim: e.target.value,
      maRap: "",
    });
    dispatch(getRapChieuAdminAction(e.target.value));
    dispatch(changeMovieAction());
  };

  const listRapChieu = useSelector((state) => {
    return state.admin.listRapChieu?.heThongRapChieu;
  });

  const renderRapChieu = () => {
    return listRapChieu?.map((rap, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <Button onClick={() => handleCumRapChieu(rap.maHeThongRap)}>
              <img src={rap.logo} width="50px" />
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleCumRapChieu = (maHeThongRap) => {
    dispatch(getCumRapChieuAction(maHeThongRap));
  };

  const cumRapChieu = useSelector((state) => {
    return state.admin?.cumRapChieu;
  });

  const renderCumRapChieu = () => {
    return cumRapChieu?.cumRapChieu?.map((cumRap, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <Button onClick={() => handleNgayChieu(cumRap.maCumRap)}>
              <p>{cumRap.tenCumRap}</p>
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleNgayChieu = (maCumRap) => {
    dispatch(getNgayChieuAction(maCumRap));
  };

  const ngayChieu = useSelector((state) => {
    return state.admin?.ngayChieu;
  });

  const renderNgayChieu = () => {
    return ngayChieu?.map((ngay, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <Button onClick={() => handleGioChieu(ngay)}>{ngay}</Button>
          </TableCell>
        </TableRow>
      );
    });
  };
  const handleGioChieu = (ngay) => {
    dispatch(getGioChieuAdminAction(ngay));
  };
  const gioChieu = useSelector((state) => {
    return state.admin?.gioChieu;
  });

  const renderGioChieu = () => {
    return gioChieu?.map((gio, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <p>Tên rạp: {gio.tenRap}</p>
            <p>Giá vé: {gio.giaVe}</p>
            <p>Giờ chiếu: {format("hh:mm", new Date(gio.ngayChieuGioChieu))}</p>
          </TableCell>
        </TableRow>
      );
    });
  };
  useEffect(() => {
    dispatch(getCinemaListAction());
  }, [dispatch]);
  const cinemaList = useSelector((state) => {
    return state.cinema?.cinemaList;
  });
  const [maHeThongRap, setMaHeThongRap] = useState();

  const renderHeThongRap = () => {
    return cinemaList?.map((cinema, index) => {
      return (
        <MenuItem value={cinema.maHeThongRap} key={index}>
          {cinema.maHeThongRap}
        </MenuItem>
      );
    });
  };

  const handleChangeHeThongRap = (e) => {
    setMaHeThongRap(e.target.value);
    setMaCumRap();
    setMaRap();
    dispatch(getCinemaClusterAction(e.target.value));
  };

  const cinemaCluster = useSelector((state) => {
    return state.cinema?.cinemaCluster;
  });

  const renderCumRap = () => {
    return cinemaCluster.map((cluster, index) => {
      return (
        <MenuItem key={index} value={cluster.maCumRap}>
          {cluster.tenCumRap}
        </MenuItem>
      );
    });
  };
  const [maCumRap, setMaCumRap] = useState();
  const handleChangeCumRap = (e) => {
    setMaCumRap(e.target.value);
    dispatch(getDanhSachRapAction(maHeThongRap, e.target.value));
  };

  const danhSachRap = useSelector((state) => {
    return state.cinema?.danhSachRap?.danhSachRap;
  });
  const renderDanhSachRap = () => {
    return danhSachRap?.map((rap, index) => {
      return (
        <MenuItem key={index} value={rap.maRap}>
          {rap.tenRap}
        </MenuItem>
      );
    });
  };
  const [maRap, setMaRap] = useState();
  const handleChangeMaRap = (e) => {
    setMaRap(e.target.value);
    setLichChieu({
      ...lichChieu,
      maRap: e.target.value,
    });
  };

  const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState("");
  const handleChangeNgayGio = (e) => {
    const { name, value } = e.target;
    setNgayChieuGioChieu({
      ...ngayChieuGioChieu,
      [name]: value,
    });
    setLichChieu({
      ...lichChieu,
      ngayChieuGioChieu: e.target.value,
    });
  };

  const [giaVe, setGiaVe] = useState();

  const handleChangeGiaVe = (e) => {
    setGiaVe(e.target.value);
    setLichChieu({
      ...lichChieu,
      giaVe: e.target.value,
    });
  };

  const [lichChieu, setLichChieu] = useState({
    maPhim: "",
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: "",
  });

  const handleTaoLichChieu = () => {
    if (
      lichChieu.maPhim !== "" &&
      lichChieu.ngayChieuGioChieu !== "" &&
      lichChieu.maRap !== "" &&
      lichChieu.giaVe !== ""
    )
      dispatch(taoLichChieuAction(lichChieu, lichChieu.maPhim, maHeThongRap));
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={5}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <FormControl
                className={classes.formPhim}
                style={{ width: "100%" }}
              >
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
                  value={maPhim}
                  onChange={handleChangePhim}
                  disableUnderline
                >
                  {renderPhim()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl
                className={classes.formPhim}
                style={{ width: "100%" }}
              >
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
                  {renderDanhSachRap()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl
                className={classes.formPhim}
                style={{ width: "100%" }}
              >
                <InputLabel
                  style={{
                    left: 20,
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  Hệ thống rạp
                </InputLabel>
                {maPhim !== "" ? (
                  <Select
                    labelId="phim-select-label"
                    disableUnderline
                    onChange={handleChangeHeThongRap}
                  >
                    {renderHeThongRap()}
                  </Select>
                ) : (
                  <Select>
                    <MenuItem>Vui lòng chọn phim</MenuItem>
                  </Select>
                )}
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField
                id="outlined-basic"
                label="Ngày chiếu giờ chiếu"
                variant="outlined"
                onChange={handleChangeNgayGio}
                name="ngayChieuGioChieu"
                fullWidth
              />
              <span>Vui lòng điền đúng định dạng (dd/MM/yyyy hh:mm:ss)</span>
            </Grid>
            <Grid item md={6}>
              <FormControl
                className={classes.formPhim}
                style={{ width: "100%" }}
              >
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
                  onChange={handleChangeCumRap}
                >
                  {renderCumRap()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl
                className={classes.formPhim}
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
            </Grid>
          </Grid>
          <br />
          <Grid item md={12}>
            <Button
              onClick={() => handleTaoLichChieu()}
              fullWidth
              disabled={
                lichChieu.maPhim !== "" &&
                lichChieu.maRap !== "" &&
                lichChieu.ngayChieuGioChieu !== "" &&
                lichChieu.giaVe !== ""
                  ? false
                  : true
              }
            >
              TẠO LỊCH CHIẾU
            </Button>
          </Grid>
        </Grid>
        <Grid item md={7}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Hệ thống rạp</TableCell>
                  <TableCell>Cụm rạp chiêu</TableCell>
                  <TableCell>Ngày chiêu</TableCell>
                  <TableCell>Giờ chiêu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell>
                  <div className={classes.fixoverflow}>{renderRapChieu()}</div>
                </TableCell>
                <TableCell>
                  <div className={classes.fixoverflow}>
                    {renderCumRapChieu()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={classes.fixoverflow}>{renderNgayChieu()}</div>
                </TableCell>
                <TableCell>
                  <div className={classes.fixoverflow}>{renderGioChieu()}</div>
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminTaoLichChieuPhim;
