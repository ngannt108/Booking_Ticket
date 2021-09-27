import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Container, makeStyles, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import { updateProfileUserAction } from "../store/actions/profileAction";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
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
    width: "30%",
    paddingTop: "30px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    width: "100%",
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(0, 0, 0, 0.87)",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
  },
})(TextField);

const inputStyle = { margin: "10px 0", "&>input": { color: "white" } };

function ProfileUser() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => {
    return state?.profile?.profileUser;
  });
  // console.log(profileUser);
  const renderThongTinTaiKhoan = () => {
    return (
      <div>
        <Container>
          <Grid container>
            <Grid item md={3} style={{ textAlign: "center" }}>
              <Avatar src="/broken-image.jpg" />
              <button
                onClick={() => {
                  changeUserDetail(
                    profileUser.taiKhoan,
                    profileUser.matKhau,
                    profileUser.hoTen,
                    profileUser.email,
                    profileUser.soDT,
                    profileUser.maNhom
                  );
                }}
              >
                Thay đổi thông tin tài khoản
              </button>
            </Grid>
            <Grid item md={9}>
              <h1>Tên tài khoản: {profileUser.taiKhoan}</h1>
              <h1>Mật khẩu: {profileUser.matKhau}</h1>
              <h1>Họ và tên: {profileUser.hoTen}</h1>
              <h1>Email: {profileUser.email}</h1>
              <h1>Số điện thoại: {profileUser.soDT}</h1>
              <h1>Mã nhóm: {profileUser.maNhom}</h1>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };

  // ------------------------ MODAL UPDATE USER --------------------

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });
  const changeUserDetail = (taiKhoan, matKhau, hoTen, email, soDt, maNhom) => {
    setOpen(true);
    // console.log(taiKhoan, matKhau, hoTen, email, soDT);
    setUser({
      taiKhoan: taiKhoan,
      matKhau: matKhau,
      hoTen: hoTen,
      email: email,
      soDt: soDt,
      maLoaiNguoiDung: "KhachHang",
      maNhom: maNhom,
    });
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUserAction(user));
  };

  const renderModal = () => {
    return (
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
          <form onSubmit={handleSubmit}>
            <Grid align="center" className={classes.tittle}>
              <h2>Thay đổi thông tin tài khoản</h2>
            </Grid>
            <div style={inputStyle}>
              <FormLabel style={{ color: "white" }}>Tài khoản:</FormLabel>
              <CssTextField
                fullWidth
                required
                name="taiKhoan"
                onChange={handleChange}
                value={user.taiKhoan}
                disabled={true}
              ></CssTextField>
            </div>
            <div style={inputStyle}>
              <FormLabel style={{ color: "white" }}>Mật khẩu:</FormLabel>
              <CssTextField
                type="password"
                fullWidth
                required
                name="matKhau"
                onChange={handleChange}
                value={user.matKhau}
              ></CssTextField>
            </div>
            <div style={inputStyle}>
              <FormLabel style={{ color: "white" }}>Email:</FormLabel>
              <CssTextField
                fullWidth
                required
                name="email"
                onChange={handleChange}
                value={user.email}
              ></CssTextField>
            </div>
            <div style={inputStyle}>
              <FormLabel style={{ color: "white" }}>Số điện thoại:</FormLabel>
              <CssTextField
                fullWidth
                required
                name="soDt"
                onChange={handleChange}
                value={user.soDt}
              ></CssTextField>
            </div>
            <div style={inputStyle}>
              <FormLabel style={{ color: "white" }}>Họ tên:</FormLabel>
              <CssTextField
                fullWidth
                required
                name="hoTen"
                onChange={handleChange}
                value={user.hoTen}
              ></CssTextField>
            </div>
            <Button
              style={{ margin: "20px 0" }}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Thay đổi
            </Button>
          </form>
        </Fade>
      </Modal>
    );
  };

  return (
    <div>
      {renderThongTinTaiKhoan()}
      {renderModal()}
    </div>
  );
}

export default ProfileUser;
