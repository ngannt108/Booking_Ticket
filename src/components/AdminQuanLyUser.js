import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getListUserPageAction,
  getListSearchUserPageAction,
} from "../store/actions/adminAction";
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import ModalUserUpdate from "../components/ModalUserUpdate";
import ModalAddUser from "./ModalAddUser";

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
  active: {
    background: "blue",
    color: "#fff",
  },
}));

function AdminQuanLyUser() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [maNhom, setMaNhom] = useState("GP01");
  const [soTrang, setSoTrang] = useState(1);
  const [soPhanTuTrenTrang, setSoPhanTuTrenTrang] = useState(5);
  const [choice, setChoice] = useState(true);

  const listUser = useSelector((state) => {
    return state.admin.listUser.items;
  });
  // console.log(listUser);

  useEffect(() => {
    dispatch(getListUserPageAction(maNhom, soTrang, soPhanTuTrenTrang));
  }, [dispatch, maNhom, soTrang, soPhanTuTrenTrang]);

  // ------------ SELECT_OPTION ------------------
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
    return state.admin.listUser?.totalPages;
  });
  const handleVeTrangCuoiCung = () => {
    if (tuKhoa.tuKhoa !== "") {
      setSoTrang(totalPagesSearch);
    } else if (tuKhoa.tuKhoa === "") {
      setSoTrang(totalPages);
    }
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
    return state.admin.listUser?.currentPage;
  });

  const renderListUser = () => {
    return listUser?.map((user, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{user?.taiKhoan}</TableCell>
          <TableCell>{user?.matKhau}</TableCell>
          <TableCell>{user?.hoTen}</TableCell>
          <TableCell>{user?.email}</TableCell>
          <TableCell>{user?.soDt}</TableCell>
          <TableCell>{user?.maLoaiNguoiDung}</TableCell>
          <TableCell>
            <Button
              style={{ backgroundColor: "red", color: "white", marginRight: 5 }}
              onClick={() => {
                handleDelete(user.taiKhoan);
              }}
            >
              Xoá
            </Button>
            <Button
              style={{ backgroundColor: "blue", color: "white" }}
              onClick={() => {
                handleUpdate(user, index);
              }}
            >
              Sửa
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  // ---------------- DELETE_UPDATE ----------------------
  const handleDelete = (user) => {
    dispatch(
      deleteUserAction(tuKhoa.tuKhoa, user, maNhom, soTrang, soPhanTuTrenTrang)
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [index, setIndex] = useState();

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: maNhom,
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const handleUpdate = (user, index) => {
    setOpen(true);
    setUser({
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
      email: user.email,
      soDt: user.soDt,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
      hoTen: user.hoTen,
      maNhom: maNhom,
    });
    setIndex(index);
  };

  // ------------------------- RENDER_LIST_SEARCH_USER ----------------

  const [tuKhoa, setTuKhoa] = useState({
    tuKhoa: "",
  });
  const handleChangeTimKiem = (e) => {
    const { name, value } = e.target;
    setTuKhoa({
      ...tuKhoa,
      [name]: value,
    });
    setSoTrang(1);
  };

  useEffect(() => {
    if (tuKhoa.tuKhoa === "") {
      setChoice(true);
      dispatch(getListUserPageAction(maNhom, soTrang, soPhanTuTrenTrang));
    } else {
      setChoice(false);
      dispatch(
        getListSearchUserPageAction(
          tuKhoa.tuKhoa,
          maNhom,
          soTrang,
          soPhanTuTrenTrang
        )
      );
    }
  }, [dispatch, tuKhoa.tuKhoa, maNhom, soTrang, soPhanTuTrenTrang]);
  const totalPagesSearch = useSelector((state) => {
    return state.admin.listSearchUser?.totalPages;
  });

  const listSearchUser = useSelector((state) => {
    return state.admin.listSearchUser?.items;
  });
  const renderListSearchUser = () => {
    return listSearchUser?.map((user, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{user?.taiKhoan}</TableCell>
          <TableCell>{user?.matKhau}</TableCell>
          <TableCell>{user?.hoTen}</TableCell>
          <TableCell>{user?.email}</TableCell>
          <TableCell>{user?.soDt}</TableCell>
          <TableCell>{user?.maLoaiNguoiDung}</TableCell>
          <TableCell>
            <Button
              onClick={() => {
                handleDelete(user.taiKhoan);
              }}
            >
              Xoá
            </Button>
            <Button
              onClick={() => {
                handleUpdate(user, index);
              }}
            >
              Sửa
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderBtn = () => {
    return (
      <Grid
        item
        md={4}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Grid item md={1}>
          <Button className={currentPage === soTrang ? classes.active : ""}>
            {soTrang}
          </Button>
        </Grid>
        <Grid item md={1}>
          {soTrang >= totalPages ? (
            ""
          ) : (
            <Button onClick={handleChangePageCong1}>{soTrang + 1}</Button>
          )}
        </Grid>
        <Grid item md={1}>
          {soTrang + 1 >= totalPages ? (
            ""
          ) : (
            <Button onClick={handleChangePageCong2}>{soTrang + 2}</Button>
          )}
        </Grid>
        <Grid item md={1}>
          {soTrang + 2 >= totalPages ? (
            ""
          ) : (
            <Button onClick={handleChangePageCong3}>{soTrang + 3}</Button>
          )}
        </Grid>
      </Grid>
    );
  };

  const renderBtnSearch = () => {
    return (
      <Grid
        item
        md={4}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Grid item md={1}>
          <Button className={currentPage === soTrang ? classes.active : ""}>
            {soTrang}
          </Button>
        </Grid>
        <Grid item md={1}>
          {soTrang >= totalPagesSearch ? (
            ""
          ) : (
            <Button onClick={handleChangePageCong1}>{soTrang + 1}</Button>
          )}
        </Grid>
        <Grid item md={1}>
          {soTrang + 1 >= totalPagesSearch ? (
            ""
          ) : (
            <Button onClick={handleChangePageCong2}>{soTrang + 2}</Button>
          )}
        </Grid>
        <Grid item md={1}>
          {soTrang + 2 >= totalPagesSearch ? (
            ""
          ) : (
            <Button onClick={handleChangePageCong3}>{soTrang + 3}</Button>
          )}
        </Grid>
      </Grid>
    );
  };

  // ------------------- ADD_USER ---------------------
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleAddUser = () => {
    setOpenModalAdd(true);
  };
  const handleAddUserClose = () => {
    setOpenModalAdd(false);
  };

  return (
    <div>
      <Container style={{ maxWidth: 1440 }}>
        <Grid container>
          <Grid item md={12}>
            <Button
              onClick={handleAddUser}
              fullWidth
              style={{ background: "green", color: "#fff" }}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
        <br />
        <form>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <TextField
                name="tuKhoa"
                fullWidth
                id="outlined-basic"
                label="Nhập tên người dùng"
                variant="outlined"
                onChange={handleChangeTimKiem}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
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
                <TableCell>Tài khoản</TableCell>
                <TableCell>Mật khẩu</TableCell>
                <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Mã loại người dùng</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {choice ? renderListUser() : renderListSearchUser()}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          spacing={3}
          style={{ justifyContent: "flex-end", marginTop: 5 }}
        >
          <Grid item md={1}>
            {soTrang === 1 ? (
              ""
            ) : (
              <Button onClick={handleVeTrangDauTien}>
                <i className="fas fa-backward"></i>
              </Button>
            )}
          </Grid>
          <Grid item md={1}>
            {soTrang === 1 ? (
              ""
            ) : (
              <Button onClick={handleTrangTruocDo}>
                <i className="fas fa-caret-left"></i>
              </Button>
            )}
          </Grid>
          {tuKhoa.tuKhoa === "" ? renderBtn() : renderBtnSearch()}
          <Grid item md={1}>
            {soTrang === totalPages || soTrang === totalPagesSearch ? (
              ""
            ) : (
              <Button onClick={handleTrangTiepTheo}>
                <i className="fas fa-caret-right"></i>
              </Button>
            )}
          </Grid>
          <Grid item md={1}>
            {soTrang === totalPages || soTrang === totalPagesSearch ? (
              ""
            ) : (
              <Button onClick={handleVeTrangCuoiCung}>
                <i className="fas fa-forward"></i>
              </Button>
            )}
          </Grid>
        </Grid>
        <ModalUserUpdate
          open={open}
          handleClose={handleClose}
          handleUpdate={handleUpdate}
          user={user}
          setUser={setUser}
          index={index}
          tuKhoa={tuKhoa.tuKhoa}
        />
        <ModalAddUser
          open={openModalAdd}
          handleClose={handleAddUserClose}
          maNhom={maNhom}
          soTrang={soTrang}
          soPhanTuTrenTrang={soPhanTuTrenTrang}
          tuKhoa={tuKhoa.tuKhoa}
        />
      </Container>
    </div>
  );
}

export default AdminQuanLyUser;
