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
} from "../store/actions/cinemaAction";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

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
  col1: {
    width: 96.5,
    padding: 5,
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  },
  col2: {
    width: "30%",
    padding: 5,
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  },
  cumRap: {
    cursor: "pointer",
    fontWeight: 700,
  },
}));

const fadeAwayStyle = { opacity: 0.5 };

function Cinema() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const cinemaList = useSelector((state) => {
    return state.cinema.cinemaList;
  });

  // ------------------------------------ COL-1 -----------------------------------------
  const [selectedCol1Index, setSelectedCol1Index] = useState(null);
  const renderCol1 = () => {
    return cinemaList?.map((cinema, index) => {
      const faded = selectedCol1Index != index;
      return (
        <TableRow key={index} style={faded ? fadeAwayStyle : null}>
          <TableCell style={{ padding: 10 }}>
            <Button
              onClick={() => {
                handleChoiceCinema(cinema.maHeThongRap);
                setSelectedCol1Index(index);
              }}
            >
              <img width="50px" src={cinema.logo} alt="" />
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleChoiceCinema = (cinema) => {
    dispatch(getCinemaClusterAction(cinema));
    dispatch(getCinemaMovieAction(cinema));
    setSelectedCol2Index(null);
  };

  // ------------------------------------ COL-2 -----------------------------------------
  const [selectedCol2Index, setSelectedCol2Index] = useState(null);
  const cinemaCluster = useSelector((state) => {
    return state.cinema.cinemaCluster;
  });
  const handleChoiceMovie = (cluster) => {
    dispatch(getMovieAction(cluster));
  };

  const renderCol2 = () => {
    return cinemaCluster?.map((cluster, index) => {
      const faded = selectedCol2Index != index;
      return (
        <TableRow key={index} style={faded ? fadeAwayStyle : null}>
          <TableCell
            onClick={() => {
              handleChoiceMovie(cluster.maCumRap);
              setSelectedCol2Index(index);
            }}
            className={classes.cumRap}
          >
            <p>{cluster.tenCumRap}</p>
            <p style={{ fontSize: 12, color: "rgba(0,0,0, .4)" }}>
              {cluster.diaChi}
            </p>
          </TableCell>
        </TableRow>
      );
    });
  };

  // ------------------------------------ COL-3 -----------------------------------------

  const cinemaMovie = useSelector((state) => {
    return state.cinema?.movie;
  });
  const ngayChieu = useSelector((state) => {
    return state.cinema?.ngayChieu;
  });
  const tenPhim = useSelector((state) => {
    return state.cinema?.tenPhim;
  });
  const gioChieu = useSelector((state) => {
    return state.cinema?.gioChieu;
  });

  const renderCol3 = () => {
    return cinemaMovie?.danhSachPhim?.map((movie, index) => {
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
                <img width="50px" src={movie.hinhAnh} alt="" />
              </Grid>
              <Grid item xs={9}>
                <Button onClick={() => handleLayTenPhim(movie.tenPhim)}>
                  <h4>{movie.tenPhim}</h4>
                </Button>
                <div>{tenPhim === movie.tenPhim ? renderNgayChieu() : ""}</div>
                <div>
                  {tenPhim === movie.tenPhim && ngayXem !== undefined
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

  const handleLayTenPhim = (tenPhim) => {
    dispatch(layTenPhimAction(tenPhim));
    setActiveIndex(null);
    setSuatChieu();
    setNgayXem();
  };

  const renderNgayChieu = () => {
    return ngayChieu?.map((ngay, index) => {
      const flag = activeIndex === index;
      return (
        <Button
          key={index}
          style={{
            marginRight: 5,
            backgroundColor: `${flag ? "#2a85f5" : ""}`,
            fontSize: 12,
          }}
          onClick={() => {
            handleLayNgayXem(ngay);
            setActiveIndex(index);
          }}
        >
          {ngay}
        </Button>
      );
    });
  };
  const [ngayXem, setNgayXem] = useState();
  const [suatChieu, setSuatChieu] = useState();

  const handleLayNgayXem = (ngayXem) => {
    dispatch(layNgayXemAction(ngayXem));
    setNgayXem(ngayXem);
    setSuatChieu();
  };

  const renderGioChieu = () => {
    return gioChieu.map((gio, index) => {
      return (
        <Button
          key={index}
          onClick={() => {
            setSuatChieu(gio);
          }}
        >
          {gio}
        </Button>
      );
    });
  };
  useEffect(() => {
    if (ngayXem !== undefined && suatChieu !== undefined) {
      dispatch(layChiTietAction(suatChieu, ngayXem));
    }
  }, [dispatch, ngayXem, suatChieu]);

  const maLichChieu = useSelector((state) => {
    return state.cinema?.chiTietPhim?.maLichChieu;
  });
  
  if (
    maLichChieu !== undefined &&
    ngayXem !== undefined &&
    suatChieu !== undefined
  ) {
    localStorage.setItem("maLichChieu", JSON.stringify(maLichChieu));
    history.push(`/booking/${maLichChieu}`);
  }

  return (
    <div id="cum-rap" className={classes.cinemaList}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.col1}>
                <div className={classes.fixoverflow}>{renderCol1()}</div>
              </TableCell>

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
