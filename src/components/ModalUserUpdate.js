import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, Grid, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../store/actions/adminAction";

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

export default function ModalUserUpdate(props) {
  const classes = useStyles();
  const open = props?.open;
  const handleClose = props?.handleClose;
  const user = props?.user;
  const setUser = props?.setUser;
  const index = props?.index;
  const tuKhoa = props?.tuKhoa;
  const dispatch = useDispatch();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(user, index, tuKhoa));
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
                  value={user.taiKhoan}
                  onChange={handlechange}
                  disabled={true}
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
                  value={user.matKhau}
                  onChange={handlechange}
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
                  value={user.email}
                  onChange={handlechange}
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
                  value={user.soDt}
                  onChange={handlechange}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <select
                    name="maLoaiNguoiDung"
                    onChange={handlechange}
                    style={{ width: "100%" }}
                  >
                    <option>KhachHang</option>
                    <option>QuanTri</option>
                  </select>
                </Grid>
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
                  value={user.hoTen}
                  onChange={handlechange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth>
              Update
            </Button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}
