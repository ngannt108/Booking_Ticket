import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, Grid, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  addNewUserAction,
  updateUserAction,
} from "../store/actions/adminAction";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "400px",
  },
}));

export default function ModalAddUser(props) {
  const classes = useStyles();
  const open = props?.open;
  const handleClose = props?.handleClose;
  const maNhom = props?.maNhom;
  const soTrang = props?.soTrang;
  const soPhanTuTrenTrang = props?.soPhanTuTrenTrang;
  const tuKhoa = props?.tuKhoa;
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewUserAction(user, maNhom, soTrang, soPhanTuTrenTrang, tuKhoa)
    );
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form onSubmit={handleSubmit} className={classes.paper} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  autoComplete="taiKhoan"
                  name="taiKhoan"
                  variant="outlined"
                  required
                  label="Tài Khoản"
                  autoFocus
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  autoComplete="matKhau"
                  name="matKhau"
                  variant="outlined"
                  required
                  label="Mật Khẩu"
                  autoFocus
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  label="Email"
                  autoFocus
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  autoComplete="soDt"
                  name="soDt"
                  variant="outlined"
                  required
                  label="Số Điện Thoại"
                  autoFocus
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <select
                  name="maNhom"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                >
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
              <Grid item xs={12}>
                <select
                  name="maLoaiNguoiDung"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                >
                  <option>KhachHang</option>
                  <option>QuanTri</option>
                </select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  autoComplete="hoTen"
                  name="hoTen"
                  variant="outlined"
                  required
                  label="Họ Tên"
                  autoFocus
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth>
              Thêm
            </Button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}
