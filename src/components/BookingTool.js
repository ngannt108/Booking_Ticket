import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGioChieuAction,
  getNgayXemAction,
  getRapAction,
  layChiTietAction,
} from '../store/actions/movieAction';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formWrap: {
    width: '100%',
    height: 80,
    position: 'relative',
    zIndex: 4,
    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  formBlock: {
    display: 'block',
    position: 'absolute',
    boxShadow: '0 0 10px rgb(0 0 0 / 30%)',
    borderRadius: 4,
    width: '90%',
    maxWidth: 940,
    height: '100%',
    left: '50%',
    transform: 'translate(-50%, -55%)',
    backgroundColor: 'white',
  },
  formPhim: {
    width: '30%',
    marginTop: 6,
    padding: '0 10px',
  },
  formOther: {
    width: 'calc(70% / 4)',
    marginTop: 6,
    padding: '0 10px',
  },
  buttonWrap: {
    width: 'calc(70% / 4)',
    margin: 0,
    float: 'right',
    height: '100%',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    top: 'calc(50% - 3px)',
    left: '50%',
    transform: 'translate(-50% , -50%)',
    backgroundColor: '#4a4a4a',
    color: 'white',
    padding: '10px 20px',
    width: '90%',

    '&:hover': {
      backgroundColor: '#4a4a4a',
    },
  },
}));

export default function BookingTool() {
  const classes = useStyles();
  const history = useHistory();
  const [maPhim, setMaPhim] = useState();
  const [tenRap, setTenRap] = useState();
  const [ngayXem, setNgayXem] = useState();
  const [suatChieu, setSuatChieu] = useState();
  const dispatch = useDispatch();

  // ------------------- GET_PHIM -----------
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
    setTenRap(undefined);
    setNgayXem(undefined);
    setSuatChieu(undefined);
    dispatch(getRapAction(e.target.value));
  };

  // ------------------- GET_RAP -----------
  const rapChieu = useSelector((state) => {
    return state.movieList?.rapChieu;
  });
  const renderRapChieu = () => {
    return rapChieu?.map((rapChieu, index) => {
      return rapChieu.map((rap) => {
        return <MenuItem value={rap.maCumRap}>{rap.tenCumRap}</MenuItem>;
      });
    });
  };

  const handleChangeRap = (e) => {
    setTenRap(e.target.value);
    setNgayXem(undefined);
    setSuatChieu(undefined);
    dispatch(getNgayXemAction(e.target.value));
  };

  // ------------------- GET_NGAY_XEM -----------
  const ngayXemPhim = useSelector((state) => {
    return state.movieList?.ngayXemPhim;
  });

  const renderNgayXemPhim = () => {
    return ngayXemPhim?.map((ngay, index) => {
      return (
        <MenuItem key={index} value={ngay}>
          {ngay}
        </MenuItem>
      );
    });
  };

  const handleChangeNgayXem = (e) => {
    setNgayXem(e.target.value);
    setSuatChieu(undefined);
    dispatch(getGioChieuAction(e.target.value));
  };

  // ------------------- GET_GIO_CHIEU -----------
  const gioChieu = useSelector((state) => {
    return state.movieList?.gioChieu;
  });
  const renderGioChieuTheoNgay = () => {
    return gioChieu?.map((gio, index) => {
      return (
        <MenuItem key={index} value={gio}>
          {gio}
        </MenuItem>
      );
    });
  };

  const handleChangeSuatChieu = (e) => {
    setSuatChieu(e.target.value);
    dispatch(layChiTietAction(ngayXem, e.target.value));
    // console.log(e.target.value);
  };

  // ------------------- MUA_VE -----------
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
      localStorage.setItem('maLichChieu', JSON.stringify(maLichChieu));
      history.push(`/booking/${maLichChieu}`);
    }
  };
  return (
    <div className={classes.formWrap}>
      <div className={classes.formBlock}>
        <FormControl className={classes.formPhim}>
          <InputLabel style={{ left: 20, color: 'rgba(0, 0, 0, 0.54)' }}>
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
        <FormControl className={classes.formOther}>
          <InputLabel style={{ left: 10, color: 'rgba(0, 0, 0, 0.54)' }}>
            Rạp
          </InputLabel>
          <Select
            labelId="rap-select-label"
            id="rap-select"
            value={tenRap}
            onChange={handleChangeRap}
            disableUnderline
          >
            {renderRapChieu()}
          </Select>
        </FormControl>
        <FormControl className={classes.formOther}>
          <InputLabel style={{ left: 10, color: 'rgba(0, 0, 0, 0.54)' }}>
            Ngày xem
          </InputLabel>
          <Select
            labelId="ngay-xem-select-label"
            id="ngay-xem-select"
            value={ngayXem}
            onChange={handleChangeNgayXem}
            disableUnderline
          >
            {renderNgayXemPhim()}
          </Select>
        </FormControl>
        <FormControl className={classes.formOther}>
          <InputLabel style={{ left: 10, color: 'rgba(0, 0, 0, 0.54)' }}>
            Suất chiếu
          </InputLabel>
          <Select
            labelId="suat-chieu-select-label"
            id="suat-chieu-select"
            value={suatChieu}
            onChange={handleChangeSuatChieu}
            disableUnderline
          >
            {renderGioChieuTheoNgay()}
          </Select>
        </FormControl>
        <div className={classes.buttonWrap}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleMuaVe}
          >
            MUA VÉ NGAY
          </Button>
        </div>
      </div>
    </div>
  );
}
