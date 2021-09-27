import {
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMovieAction,
  getListMoviePageAction,
} from '../store/actions/adminAction';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import format from 'date-format';
import ModalAddMovie from '../components/ModalAddMovie';
import ModalMovieUpdate from '../components/ModalMovieUpdate';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '30%',
    paddingTop: '30px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    width: '100%',
  },
  active: {
    background: 'blue',
    color: '#fff',
  },
}));

function AdminQuanLyMovie() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [maNhom, setMaNhom] = useState('GP01');
  const [soTrang, setSoTrang] = useState(1);
  const [soPhanTuTrenTrang, setSoPhanTuTrenTrang] = useState(5);

  useEffect(() => {
    dispatch(getListMoviePageAction(maNhom, soTrang, soPhanTuTrenTrang));
  }, [dispatch, maNhom, soTrang, soPhanTuTrenTrang]);

  const listMovie = useSelector((state) => {
    return state.admin.listMovie.items;
  });

  //   --------------------- OPTION ---------------
  const handleChangeMaNhom = (e) => {
    const { value } = e.target;
    setMaNhom(value);
    setSoTrang(1);
  };

  const handleChangeSoPhanTuTrenTrang = (e) => {
    const { value } = e.target;
    setSoPhanTuTrenTrang(value);
    setSoTrang(1);
  };
  // ----------------- CHOOSE_PAGE ----------------
  const handleChangePageCong1 = () => {
    setSoTrang(soTrang + 1);
  };
  const handleChangePageCong2 = () => {
    setSoTrang(soTrang + 2);
  };
  const handleChangePageCong3 = () => {
    setSoTrang(soTrang + 3);
  };

  // ---------------- BUTTON_FIRST_LAST_PAGE -----------
  const handleVeTrangDauTien = () => {
    setSoTrang(1);
  };
  const totalPages = useSelector((state) => {
    return state.admin.listMovie?.totalPages;
  });
  const handleVeTrangCuoiCung = () => {
    setSoTrang(totalPages);
  };
  // ---------------- BUTTON_NEXT_PRE--------------
  const handleTrangTruocDo = () => {
    setSoTrang(soTrang - 1);
  };
  const handleTrangTiepTheo = () => {
    setSoTrang(soTrang + 1);
  };
  // ---------------- ACTIVE_PAGE------------------
  const currentPage = useSelector((state) => {
    return state.admin.listMovie?.currentPage;
  });

  const renderBtn = () => {
    return (
      <Grid
        item
        md={4}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Grid item md={1}>
          <Button className={currentPage === soTrang ? classes.active : ''}>
            {soTrang}
          </Button>
        </Grid>
        <Grid item md={1}>
          {soTrang >= totalPages ? (
            ''
          ) : (
            <Button onClick={handleChangePageCong1}>{soTrang + 1}</Button>
          )}
        </Grid>
        <Grid item md={1}>
          {soTrang + 1 >= totalPages ? (
            ''
          ) : (
            <Button onClick={handleChangePageCong2}>{soTrang + 2}</Button>
          )}
        </Grid>
        <Grid item md={1}>
          {soTrang + 2 >= totalPages ? (
            ''
          ) : (
            <Button onClick={handleChangePageCong3}>{soTrang + 3}</Button>
          )}
        </Grid>
      </Grid>
    );
  };

  const renderListMovie = () => {
    return listMovie?.map((movie, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{movie.maPhim}</TableCell>
          <TableCell>{movie.tenPhim}</TableCell>
          <TableCell>{movie.biDanh}</TableCell>
          <TableCell>
            <a href={movie.trailer}>{movie.trailer}</a>
          </TableCell>
          <TableCell>
            <img src={movie.hinhAnh} width="100px" height="150px" />
          </TableCell>
          <TableCell>{movie.moTa}</TableCell>
          <TableCell>
            {format('dd/MM/yyyy - hh:mm', new Date(movie.ngayKhoiChieu))}
          </TableCell>
          <TableCell>{movie.danhGia}</TableCell>
          <TableCell>
            <Button
              style={{ background: 'red', color: 'white', marginBottom: 5 }}
              onClick={() => {
                handleDelete(movie.maPhim);
              }}
            >
              Xoá
            </Button>
            <Button
              style={{ background: 'blue', color: 'white' }}
              onClick={() => {
                handleUpdate(movie, index);
              }}
            >
              Sửa
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleDelete = (maPhim) => {
    dispatch(deleteMovieAction(maPhim, maNhom, soTrang, soPhanTuTrenTrang));
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [index, setIndex] = useState();
  const [movie, setMovie] = useState({
    maPhim: '',
    tenPhim: '',
    biDanh: '',
    trailer: '',
    hinhAnh: {},
    moTa: '',
    maNhom: maNhom,
    ngayKhoiChieu: '',
    danhGia: '',
  });

  const handleUpdate = (movie, index) => {
    setOpen(true);
    setMovie({
      maPhim: movie.maPhim,
      tenPhim: movie.tenPhim,
      biDanh: movie.biDanh,
      trailer: movie.trailer,
      hinhAnh: {},
      moTa: movie.moTa,
      maNhom: maNhom,
      ngayKhoiChieu: movie.ngayKhoiChieu,
      danhGia: movie.danhGia,
    });
    setIndex(index);
  };
  // ------------ ADD_MOVIE-------------

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleAddMovie = () => {
    setOpenModalAdd(true);
  };
  const handleAddMovieClose = () => {
    setOpenModalAdd(false);
  };

  return (
    <div>
      <Container style={{ maxWidth: 1440 }}>
        <Grid container>
          <Grid item md={12}>
            <Button
              onClick={() => handleAddMovie()}
              fullWidth
              style={{ background: 'green', color: '#fff' }}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
        <br />
        <form>
          <Grid container>
            <Grid item md={2}>
              <label>Mã nhóm</label>
            </Grid>
            <Grid item md={10}>
              <select name="maNhom" onChange={handleChangeMaNhom}>
                <option>GP01</option>
                <option>GP02</option>
                <option>GP03</option>
                <option>GP04</option>
                <option>GP05</option>
                <option>GP06</option>
                <option>GP07</option>
                <option>GP08</option>
                <option>GP09</option>
                <option>GP10</option>
              </select>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item md={2}>
              <label>Số phần tử trên trang</label>
            </Grid>
            <Grid item md={10}>
              <select
                name="soPhanTuTrenTrang"
                onChange={handleChangeSoPhanTuTrenTrang}
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
            </Grid>
          </Grid>
        </form>
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Mã phim</TableCell>
                <TableCell>Tên phim</TableCell>
                <TableCell>Bí danh</TableCell>
                <TableCell>Trailer</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Ngày khởi chiếu</TableCell>
                <TableCell>Đánh giá</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderListMovie()}</TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          spacing={3}
          style={{ justifyContent: 'flex-end', marginTop: 5 }}
        >
          <Grid item md={1}>
            {soTrang === 1 ? (
              ''
            ) : (
              <Button onClick={handleVeTrangDauTien}>
                <i className="fas fa-backward"></i>
              </Button>
            )}
          </Grid>
          <Grid item md={1}>
            {soTrang === 1 ? (
              ''
            ) : (
              <Button onClick={handleTrangTruocDo}>
                <i className="fas fa-caret-left"></i>
              </Button>
            )}
          </Grid>
          {renderBtn()}
          <Grid item md={1}>
            {soTrang === totalPages ? (
              ''
            ) : (
              <Button onClick={handleTrangTiepTheo}>
                <i className="fas fa-caret-right"></i>
              </Button>
            )}
          </Grid>
          <Grid item md={1}>
            {soTrang === totalPages ? (
              ''
            ) : (
              <Button onClick={handleVeTrangCuoiCung}>
                <i className="fas fa-forward"></i>
              </Button>
            )}
          </Grid>
        </Grid>
        <ModalMovieUpdate
          open={open}
          handleClose={handleClose}
          handleUpdate={handleUpdate}
          movie={movie}
          setMovie={setMovie}
          index={index}
          maNhom={maNhom}
          soTrang={soTrang}
          soPhanTuTrenTrang={soPhanTuTrenTrang}
        />
        <ModalAddMovie
          open={openModalAdd}
          handleClose={handleAddMovieClose}
          maNhom={maNhom}
          soTrang={soTrang}
          soPhanTuTrenTrang={soPhanTuTrenTrang}
        />
      </Container>
    </div>
  );
}

export default AdminQuanLyMovie;
