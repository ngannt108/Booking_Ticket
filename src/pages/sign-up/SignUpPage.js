import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormLabel } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { signUpAction } from "../../store/actions/authAction";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  signIn: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    fontsize: 15,
    backgroundImage: "url(images/bg2.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  paper: {
    color: "white",
    padding: 30,
    maxWidth: 600,
    height: 600,
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(78 5 114)",
  },
  tittle: {
    padding: "20px 0 20px",
  },
});

const WhiteCheckbox = withStyles({
  root: {
    color: "white",
    "&$checked": {
      color: "white",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

export default function Signin() {
  const classes = useStyles();
  const inputStyle = { margin: "10px 0", "&>input": { color: "white" } };

  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState("");

  const [authSignUp, setAuthSignUp] = useState({
    taiKhoan: "",
    matKhau: "",
    nhapLaiMatKhau: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "1",
    hoTen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthSignUp({
      ...authSignUp,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authSignUp.matKhau === authSignUp.nhapLaiMatKhau)
      dispatch(signUpAction(authSignUp, history, setError));
    else Swal.fire("Thông báo", "Mật khẩu không trùng khớp", "error");
  };

  return (
    <Grid className={classes.signIn}>
      <Paper elevation={10} className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid align="center" className={classes.tittle}>
            <h2>Sign Up</h2>
          </Grid>
          <div className="row">
            <div className="col-sm-6">
              <div className="row">
                <div style={inputStyle}>
                  <FormLabel style={{ color: "white" }}>Tài khoản:</FormLabel>
                  <CssTextField
                    style={{ width: "250px" }}
                    required
                    name="taiKhoan"
                    onChange={handleChange}
                  ></CssTextField>
                </div>
              </div>
              <div className="row">
                <div style={inputStyle}>
                  <FormLabel style={{ color: "white" }}>Mật khẩu:</FormLabel>
                  <CssTextField
                    type="password"
                    style={{ width: "250px" }}
                    required
                    name="matKhau"
                    onChange={handleChange}
                  ></CssTextField>
                </div>
              </div>
              <div className="row">
                <div style={inputStyle}>
                  <FormLabel style={{ color: "white" }}>
                    Nhập lại mật khẩu:
                  </FormLabel>
                  <CssTextField
                    type="password"
                    style={{ width: "250px" }}
                    required
                    name="nhapLaiMatKhau"
                    onChange={handleChange}
                  ></CssTextField>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <div style={inputStyle}>
                  <FormLabel style={{ color: "white" }}>Email:</FormLabel>
                  <CssTextField
                    style={{ width: "250px" }}
                    required
                    name="email"
                    onChange={handleChange}
                  ></CssTextField>
                </div>
              </div>
              <div className="row">
                <div style={inputStyle}>
                  <FormLabel style={{ color: "white" }}>
                    Số điện thoại:
                  </FormLabel>
                  <CssTextField
                    style={{ width: "250px" }}
                    required
                    name="SDT"
                    onChange={handleChange}
                  ></CssTextField>
                </div>
              </div>
              <div className="row">
                <div style={inputStyle}>
                  <FormLabel style={{ color: "white" }}>Họ tên:</FormLabel>
                  <CssTextField
                    style={{ width: "250px" }}
                    required
                    name="hoTen"
                    onChange={handleChange}
                  ></CssTextField>
                </div>
              </div>
            </div>
          </div>

          <FormControlLabel
            control={<WhiteCheckbox name="checkedB" />}
            label="Đồng ý với điều khoản"
          />
          <p style={{ marginLeft: "20px", color: "red" }}>{error}</p>
          <Button
            style={{ margin: "20px 0" }}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Đăng ký
          </Button>
          <Typography>
            <Link href="/forgot-password" color="inherit" underline="always">
              Forgot password?
            </Link>
          </Typography>
          <Typography>
            <span>Đã có tài khoản? </span>
            <Link href="/sign-in" color="inherit" underline="always">
              Đăng nhập
            </Link>
          </Typography>
          <Typography>
            <Link href="/" color="inherit" underline="always">
              Về trang chủ
            </Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
}
