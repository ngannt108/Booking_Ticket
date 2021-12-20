import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import {
  getCinemaClusterAction,
  getCinemaMovieAction,
  getMovieAction,
  layTenPhimAction,
  layNgayXemAction,
  layChiTietAction,
} from "../../store/actions/cinemaAction";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { getListMoviePageAction } from "../../store/actions/adminAction";
import { getMovieDetailAction } from "../../store/actions/movieAction";

const useStyles = makeStyles((theme) => ({
  cinemaList: {
    maxWidth: 940,
    margin: "auto",
    paddingTop: "100px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  table: {
    minWidth: 650,
    height: 700,
  },
  fixoverflow: {
    overflow: "auto",
    height: "100%",
  },
  // col1: {
  //   width: 96.5,
  //   padding: 5,
  //   borderRight: "1px solid rgba(224, 224, 224, 1)",
  // },
  col2: {
    width: "20%",
    padding: 5,
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  },
  cumRap: {
    cursor: "pointer",
    fontWeight: 700,
    color: "#01d101",
  },
}));

const fadeAwayStyle = { opacity: 0.5 };

function Cinema() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // ------------------------------------ COL-1 -----------------------------------------
  useEffect(() => {
    dispatch(getCinemaClusterAction());
  }, []);
  const [selectedCol2Index, setSelectedCol2Index] = useState(null);
  const cinemaCluster = useSelector((state) => state.cinema.cinemaCluster);
  console.log("cụm rạp", cinemaCluster);
  const [maCumRap, setMaCumRap] = useState("");
  const handleChoiceMovie = (cumRap) => {
    setMaCumRap(cumRap);
    //cluster
    //dispatch(getListMoviePageAction())
    dispatch(getMovieAction(cumRap)); //cluster
  };

  const renderCol2 = () => {
    return cinemaCluster?.map((cluster, index) => {
      const faded = selectedCol2Index != index;
      return (
        <TableRow key={index} style={faded ? fadeAwayStyle : null}>
          <TableCell
            onClick={() => {
              handleChoiceMovie(cluster._id);
              console.log("ID cụm rạp", cluster._id);
              setSelectedCol2Index(index);
            }}
            className={classes.cumRap}
          >
            <p>{cluster.tenCumRap}</p>
          </TableCell>
        </TableRow>
      );
    });
  };

  // ------------------------------------ COL-2 -----------------------------------------

  // const cinemaMovie = useSelector((state) => {
  //   return state.cinema?.movie;
  // });
  const formatDate = (date) => {
    if (date) {
      const d = new Date(date); //d.toLocaleString("en-AU")//
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
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
  const cinemaMovie = useSelector((state) => {
    return state.cinema?.movie;
  });
  const [movieDetail, setMovieDetail] = useState("");
  const ngayChieu = useSelector((state) => {
    return state.cinema?.ngayChieu;
  });
  const tenPhim = useSelector((state) => {
    return state.cinema?.tenPhim;
  });
  const gioChieu = useSelector((state) => {
    return state.cinema?.gioChieu;
  });

  //console.log("phim theo lịch chiếu", cinemaMovie);
  const renderCol3 = () => {
    return cinemaMovie?.map((movie, index) => {
      //cinemaMovie?.danhSachPhim?.map((movie, index)

      return (
        <TableRow key={index}>
          <TableCell style={{ height: 110, minHeight: 110, padding: 5 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  width="50px"
                  src={`http://localhost:5000/uploads/${movie.hinhAnh}`}
                  alt=""
                />
              </Grid>
              <Grid item xs={9}>
                <Button onClick={() => handleLayTenPhim(movie.biDanh)}>
                  <h4 style={{ color: "#01d101" }}>{movie.tenPhim}</h4>
                </Button>
                <div>
                  {movieDetail.tenPhim === movie.tenPhim
                    ? renderNgayChieu()
                    : ""}
                </div>

                {console.log("movie detail", movieDetail)}
                <div>
                  {movieDetail.tenPhim === movie.tenPhim &&
                  ngayXem !== undefined //ngayXem !== undefined
                    ? renderGioChieu()
                    : ""}
                </div>
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      );
    });
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const [biDanh, setBiDanh] = useState(null);

  const handleLayTenPhim = (biDanh) => {
    //dispatch(layTenPhimAction(tenPhim));
    setBiDanh(biDanh);
    dispatch(getMovieDetailAction(biDanh, setMovieDetail));
    setActiveIndex(null);
    setSuatChieu();
    setNgayXem();
  };
  var ngaychieu = [];
  ngaychieu.push("");
  const renderNgayChieu = () => {
    return movieDetail.lichChieu?.map((lich, index) => {
      const flag = activeIndex === index;
      var isExist = false;
      // if (index === 0)
      //   ngaychieu.push(lich.ngayChieu)
      // else {
      ngaychieu.map((ngay) => {
        if (formatDate(ngay) == formatDate(lich.ngayChieu)) isExist = true;
      });
      // && lich.ngayChieu > new Date()
      const date = new Date(lich.ngayChieu);
      //console.log('ngày hiện tại', Date.now(), 'ngày chiếu', date)
      if (
        isExist == false &&
        lich.tenCumRap._id === maCumRap &&
        date > Date.now()
      ) {
        ngaychieu.push(lich.ngayChieu);
        return (
          <Button
            key={index}
            style={{
              marginRight: 5,
              backgroundColor: `${flag ? "#2a85f5" : ""}`,
              fontSize: 12,
            }}
            onClick={() => {
              handleLayNgayXem(lich.ngayChieu); //.ngayChieu);
              setActiveIndex(index);
            }}
          >
            {/* {console.log("laylich", formatDate(lich))} */}
            {formatDate(lich.ngayChieu)}
            {/* //.ngayChieu)} */}
          </Button>
        );
      }

      //}
      //console.log("ngày chiếu trong trang chủ", ngaychieu, index);
    });
  };

  const [ngayXem, setNgayXem] = useState();
  const [suatChieu, setSuatChieu] = useState();

  const handleLayNgayXem = (ngayXem) => {
    //dispatch(layNgayXemAction(ngayXem));
    setNgayXem(ngayXem);
    setSuatChieu();
  };

  const renderGioChieu = () => {
    return movieDetail.lichChieu?.map((lich, index) => {
      if (
        formatDate(lich.ngayChieu) === formatDate(ngayXem) &&
        lich.tenCumRap._id === maCumRap
      ) {
        return (
          <Button
            onClick={() => {
              setMaLichChieu(lich._id);
              setSuatChieu(lich.ngayChieu);
            }}
          >
            {formatTime(lich.ngayChieu)}
            {/* ngayXem */}
          </Button>
        );
      }
    });
  };
  const [maLichChieu, setMaLichChieu] = useState("");
  useEffect(() => {
    if (ngayXem !== undefined && suatChieu !== undefined) {
      // dispatch(layChiTietAction(suatChieu, ngayXem));
    }
  }, [dispatch, ngayXem, suatChieu]);

  // const maLichChieu = useSelector((state) => {
  //   return state.cinema?.chiTietPhim?.maLichChieu;
  // });

  if (
    maLichChieu !== undefined &&
    ngayXem !== undefined &&
    suatChieu !== undefined
  ) {
    //localStorage.setItem("maLichChieu", JSON.stringify(maLichChieu));
    history.push(`/${biDanh}/booking/${maLichChieu}`);
  }

  return (
    <div id="cum-rap" className={classes.cinemaList}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              {/* <TableCell className={classes.col1}>
                <div className={classes.fixoverflow}>{renderCol1()}</div>
              </TableCell> */}

              <TableCell className={classes.col2}>
                <div className={classes.fixoverflow}> {renderCol2()}</div>
              </TableCell>

              <TableCell className={classes.col3}>
                <div className={classes.fixoverflow}> {renderCol3()}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Cinema;
