import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getGioChieuAction,
  getMovieListNowShowingAction,
  getNgayXemAction,
  getRapAction,
  layChiTietAction,
} from "../store/actions/movieAction";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  typo: {
    height: "85px",
  },
  detailBox: {
    padding: "10px",
    width: "100%",
  },
  datVe: {
    width: "50%",
    margin: "30px auto 130px",
  },
  btnDatVe: {
    width: "100%",
    backgroundColor: "#4a4a4a",
    color: "white",
  },
}));

export default function ControlledAccordions() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [tenPhim, setTenPhim] = React.useState();
  const [maPhim, setMaPhim] = React.useState();
  const [tenRap, setTenRap] = React.useState();
  const [ngayXem, setNgayXem] = React.useState();
  const [suatChieu, setSuatChieu] = React.useState();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getMovieListNowShowingAction());
  }, [dispatch]);

  const movieList = useSelector((state) => {
    return state.movieList?.movieListNowShowing;
  });

  const renderPhim = () => {
    return movieList?.map((movie, index) => {
      return (
        <Button
          onClick={() => {
            setTenPhim(movie.tenPhim);
            setExpanded(false);
            setMaPhim(movie.maPhim);
            setTenRap(undefined);
            setNgayXem(undefined);
            setSuatChieu(undefined);
          }}
          className={classes.detailBox}
          key={index}
        >
          {movie.tenPhim}
        </Button>
      );
    });
  };
  useEffect(() => {
    if (maPhim !== undefined) {
      dispatch(getRapAction(maPhim));
    }
  }, [dispatch, maPhim]);
  const rapChieu = useSelector((state) => {
    return state.movieList?.rapChieu;
  });

  const renderRapChieu = () => {
    return rapChieu?.map((rapChieu, index) => {
      return rapChieu.map((rap, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              setTenRap(rap.maCumRap);
              setExpanded(false);
              setSuatChieu(undefined);
              setNgayXem(undefined);
            }}
            className={classes.detailBox}
          >
            {rap.tenCumRap}
          </Button>
        );
      });
    });
  };

  useEffect(() => {
    if (tenRap !== undefined) {
      dispatch(getNgayXemAction(tenRap));
    }
  }, [dispatch, tenRap]);
  const ngayXemPhim = useSelector((state) => {
    return state.movieList?.ngayXemPhim;
  });

  const renderNgayXemPhim = () => {
    return ngayXemPhim?.map((ngay, index) => {
      return (
        <Button
          key={index}
          onClick={() => {
            setNgayXem(ngay);
            setExpanded(false);
            setSuatChieu(undefined);
          }}
          className={classes.detailBox}
        >
          {ngay}
        </Button>
      );
    });
  };
  useEffect(() => {
    if (ngayXem !== undefined) {
      dispatch(getGioChieuAction(ngayXem));
    }
  }, [dispatch, ngayXem]);

  const gioChieu = useSelector((state) => {
    return state.movieList?.gioChieu;
  });
  const renderGioChieuTheoNgay = () => {
    return gioChieu?.map((gio, index) => {
      return (
        <Button
          key={index}
          onClick={() => {
            setSuatChieu(gio);
            setExpanded(false);
          }}
          className={classes.detailBox}
        >
          {gio}
        </Button>
      );
    });
  };
  useEffect(() => {
    if (ngayXem !== undefined && suatChieu !== undefined) {
      dispatch(layChiTietAction(ngayXem, suatChieu));
    }
  }, [dispatch, ngayXem, suatChieu]);

  const maLichChieu = useSelector((state) => {
    return state.movieList?.phimCanXem?.maLichChieu;
  });

  const handleMuaVe = () => {
    if (
      maPhim !== undefined &&
      tenRap !== undefined &&
      ngayXem !== undefined &&
      suatChieu !== undefined &&
      maLichChieu !== undefined
    ) {
      localStorage.setItem("maLichChieu", JSON.stringify(maLichChieu));
      history.push(`/booking/${maLichChieu}`);
    }
  };

  return (
    <>
      <div className={classes.toolbar}></div>
      <div className={classes.root}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={classes.typo}
          >
            <Typography className={classes.heading}>PHIM</Typography>
            <Typography className={classes.secondaryHeading}>
              {tenPhim}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>{renderPhim()}</div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            className={classes.typo}
          >
            <Typography className={classes.heading}>RẠP</Typography>
            <Typography className={classes.secondaryHeading}>
              {tenRap}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>{renderRapChieu()}</div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            className={classes.typo}
          >
            <Typography className={classes.heading}>NGÀY XEM</Typography>
            <Typography className={classes.secondaryHeading}>
              {ngayXem}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>{renderNgayXemPhim()}</div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            className={classes.typo}
          >
            <Typography className={classes.heading}>XUẤT CHIẾU</Typography>
            <Typography className={classes.secondaryHeading}>
              {suatChieu}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>{renderGioChieuTheoNgay()}</div>
          </AccordionDetails>
        </Accordion>
        <div className={classes.datVe}>
          <Button
            disabled={
              maPhim !== undefined &&
              tenRap !== undefined &&
              ngayXem !== undefined &&
              suatChieu !== undefined &&
              maLichChieu !== undefined
                ? false
                : true
            }
            onClick={handleMuaVe}
            className={classes.btnDatVe}
          >
            ĐẶT VÉ
          </Button>
        </div>
      </div>
    </>
  );
}
