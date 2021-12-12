import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Container, makeStyles, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import {
  getProfileAction,
  updateProfileUserAction,
  changePasswordAction,
} from "../../store/actions/profileAction";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { ModalBody } from "react-bootstrap";
import Swal from "sweetalert2";

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
  useEffect(() => {
    dispatch(getProfileAction());

  }, []);
  const classes = useStyles();
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => state.profile.profileUser);
  const renderThongTinTaiKhoan = () => {
    return (
      <div>
        <Container>
          <Grid container>
            <Grid item md={9}>
              {profileUser.length > 0 ? (
                <>

                  <h1>Tên tài khoản: {profileUser[0].tentaiKhoan}</h1>
                  <h1>Họ và tên: {profileUser[0].hoTen}</h1>
                  <h1>Email: {profileUser[0].email}</h1>
                  <h1>Số điện thoại: {profileUser[0].SDT}</h1>
                </>
              ) : (
                ""
              )}
              <button
                onClick={() => {
                  changeUserDetail(
                    // profileUser[0].tentaiKhoan,
                    // profileUser[0].matKhau,
                    profileUser[0].hoTen,
                    profileUser[0].email,
                    profileUser[0].SDT
                  );
                }}
                className="btn btn-success"
              >
                Thay đổi thông tin tài khoản
              </button>
              <button onClick={changeUserPassword} className="btn btn-primary">
                Đổi mật khẩu
              </button>
            </Grid>
            {/* <Grid item md={3} style={{ textAlign: "center" }}>
              <Avatar src="/broken-image.jpg" />
            </Grid> */}
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
    SDT: "",
    maLoaiNguoiDung: "1",
    hoTen: "",
  });

  // const [user, setUserChangePassword] = useState({
  //   matKhau: "",
  //   matKhauMoi: "",
  //   nhapLaiMatKhau
  // });

  const changeUserDetail = (hoTen, email, SDT) => {
    setOpen(true);
    // console.log(taiKhoan, matKhau, hoTen, email, soDT);
    setUser({
      taiKhoan: profileUser[0].tentaiKhoan,
      matKhau: profileUser[0].matKhau,
      hoTen: hoTen,
      email: email,
      SDT: SDT,
      maLoaiNguoiDung: "1",
    });
    // console.log("Chi tiết cập nhật", user);
  };

  const changeUserPassword = (e
    // matKhau, matKhauMoi, nhapLaiMatKhau
  ) => {

    setOpenChangePassword(true);
    console.log("Thông tin user lúc đầu: ", profileUser[0]);
    setUser({
      // taiKhoan: profileUser[0].tentaiKhoan,
      matKhau: profileUser[0].matKhau,
      // hoTen: profileUser[0].hoTen,
      // email: profileUser[0].email,
      // SDT: profileUser[0].SDT,
      // maLoaiNguoiDung: "1",
    });
    console.log("Thông tin user sau khi đổi mật khẩu 1: ", user);
  };

  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [open, setOpen] = useState(false);
  // const [matKhau, setMatKhau] = useState('')
  // const [matKhauMoi, setMatKhauMoi] = useState('')
  // const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState('')
  const handleClose = () => {
    setOpen(false);
    setOpenChangePassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUser({
      ...user,
      [name]: value
    });
    console.log("Thông tin user: ", user);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Chi tiết cập nhật", user);
    setOpen(false);
    dispatch(updateProfileUserAction(user));
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setOpenChangePassword(false);

    console.log("Thông tin user sau khi đổi mật khẩu 2: ", user);
    dispatch(changePasswordAction(user));
    // if (
    //   user.matKhau === profileUser[0].matKhau &&
    //   user.matKhauMoi === user.nhapLaiMatKhau
    // ) {
    //   console.log("Đổi mật khẩu", user);
    //   setOpenChangePassword(false);
    //   dispatch(changePasswordAction(user));
    // // } else if (user.matKhau !== profileUser[0].matKhau) {
    // //   Swal.fire("Thông báo", "Mật khẩu của bạn không đúng", "error");
    // // } else if (user.matKhauMoi !== user.nhapLaiMatKhau) {
    // //   Swal.fire("Thông báo", "Mật khẩu không trùng khớp", "error");
    // // }
  };
  console.log('profileUser', profileUser)
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
              <h2 style={{ color: "white" }}>Thay đổi thông tin tài khoản</h2>
            </Grid>
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
                name="SDT"
                onChange={handleChange}
                value={user.SDT}
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

  const renderModalChangePassword = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openChangePassword}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openChangePassword}>
          <form onSubmit={handleSubmitChangePassword}>
            <Grid align="center" className={classes.tittle}>
              <h2 style={{ color: "white" }}>Thay đổi mật khẩu</h2>
            </Grid>
            <div style={inputStyle}>
              <FormLabel style={{ color: "white" }}>
                Mật khẩu hiện tại:
              </FormLabel>
              <CssTextField
                type="password"
                fullWidth
                required
                name="matKhau"
                onChange={handleChange}
              ></CssTextField>
            </div>
            <div style={inputStyle}>
              <FormLabel style={{ color: "white" }}>Mật khẩu mới:</FormLabel>
              <CssTextField
                type="password"
                fullWidth
                required
                name="matKhauMoi"
                onChange={handleChange}
              ></CssTextField>
            </div>
            <div style={inputStyle}>
              <FormLabel style={{ color: "white" }}>
                Nhập lại mật khẩu:
              </FormLabel>
              <CssTextField
                type="password"
                fullWidth
                required
                name="nhapLaiMatKhau"
                onChange={handleChange} //handleChange
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
      {renderModalChangePassword()}
    </div>
  );
}

export default ProfileUser;
