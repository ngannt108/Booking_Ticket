import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  layCumRapChieuAction,
  layGioChieuPhimAction,
  layLichChieuAction,
  layThongTinLichChieuPhimAction,
  layMaLichChieuPhimAction,
} from '../store/actions/cinemaAction';

import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Grid } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  LichChieu: {
    maxWidth: 940,
    margin: 'auto',
    padding: '20px 0',
  },
  table: {
    minWidth: 650,
    height: 700,
  },
  fixoverflow: {
    overflow: 'auto',
    height: '100%',
  },
  col1: {
    width: 96.5,
    padding: 5,
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  col2: {
    width: '30%',
    padding: 5,
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  cumRap: {
    cursor: 'pointer',
    fontWeight: 700,
  },
  label: {
    fontWeight: 700,
  },
}));

const fadeAwayStyle = { opacity: 0.5 };

function LichChieu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const maPhim = props?.maPhim;
  const history = useHistory();

  useEffect(() => {
    dispatch(layThongTinLichChieuPhimAction(maPhim));
  }, [maPhim, dispatch]);

  const heThongRapChieu = useSelector((state) => {
    return state.cinema?.phim?.heThongRapChieu;
  });

  // ------------------------------------ COL-1 -----------------------------------------
  const [selectedCol1Index, setSelectedCol1Index] = useState(null);
  const renderCol1 = () => {
    return heThongRapChieu?.map((rap, index) => {
      const faded = selectedCol1Index != index;
      return (
        <TableRow key={index} style={faded ? fadeAwayStyle : null}>
          <TableCell style={{ padding: 10 }}>
            <Button
              onClick={() => {
                handleLayCumRapChieu(rap.maHeThongRap);
                setSelectedCol1Index(index);
                setSelectedCol2Index(null);
              }}
            >
              <img width="50px" src={rap.logo} alt="" />
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleLayCumRapChieu = (maHeThongRap) => {
    setNgayXem();
    setSuatChieu();
    dispatch(layCumRapChieuAction(maHeThongRap));
  };

  // ------------------------------------ COL-2 -----------------------------------------
  const [selectedCol2Index, setSelectedCol2Index] = useState(null);
  const cumRapChieu = useSelector((state) => {
    return state?.cinema?.cumRapChieu;
  });

  console.log(cumRapChieu);

  const renderCol2 = () => {
    return cumRapChieu?.map((cumRap, index) => {
      const faded = selectedCol2Index != index;
      return (
        <TableRow key={index} style={faded ? fadeAwayStyle : null}>
          <TableCell
            onClick={() => {
              layLichChieu(cumRap.maCumRap);
              setSelectedCol2Index(index);
            }}
            className={classes.cumRap}
          >
            <p>{cumRap.tenCumRap}</p>
          </TableCell>
        </TableRow>
      );
    });
  };

  const layLichChieu = (maCumRap) => {
    setNgayXem();
    setSuatChieu();
    dispatch(layLichChieuAction(maCumRap));
  };

  const [ngayXem, setNgayXem] = useState();
  const [suatChieu, setSuatChieu] = useState();

  const ngayChieuPhim = useSelector((state) => {
    return state?.cinema?.ngayChieuPhim;
  });

  const renderCol3 = () => {
    return (
      <TableRow>
        <TableCell
          style={{ height: 110, minHeight: 110, padding: 5 }}
          style={{ width: '100%' }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {renderNgayChieu()}
            </Grid>
            <Grid item xs={12}>
              {renderGioChieu()}
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    );
  };

  const renderNgayChieu = () => {
    return ngayChieuPhim?.map((ngay, index) => {
      return (
        <Button onClick={() => handleLayGioChieu(ngay)} key={index}>
          {ngay}
        </Button>
      );
    });
  };

  const handleLayGioChieu = (ngay) => {
    setNgayXem(ngay);
    setSuatChieu();
    dispatch(layGioChieuPhimAction(ngay));
  };

  const gioChieuPhim = useSelector((state) => {
    return state?.cinema?.gioChieuPhim;
  });

  const renderGioChieu = () => {
    return gioChieuPhim.map((gio, index) => {
      return (
        <Button onClick={() => handleLayMaLichChieu(gio)} key={index}>
          {gio}
        </Button>
      );
    });
  };

  const handleLayMaLichChieu = (gio) => {
    setSuatChieu(gio);
    dispatch(layMaLichChieuPhimAction(ngayXem, gio));
  };

  const maLichChieu = useSelector((state) => {
    return state?.cinema?.maLichChieu?.maLichChieu;
  });

  if (
    maLichChieu !== undefined &&
    ngayXem !== undefined &&
    suatChieu !== undefined
  ) {
    localStorage.setItem('maLichChieu', JSON.stringify(maLichChieu));
    history.push(`/booking/${maLichChieu}`);
  }

  return (
    <div id="cum-rap" className={classes.LichChieu}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.col1}>
                <div className={classes.fixoverflow}>{renderCol1()}</div>
              </TableCell>

              <TableCell className={classes.col2}>
                <div className={classes.fixoverflow}>{renderCol2()}</div>
              </TableCell>

              <TableCell className={classes.col3}>
                <div className={classes.fixoverflow}>{renderCol3()}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withRouter(LichChieu);
