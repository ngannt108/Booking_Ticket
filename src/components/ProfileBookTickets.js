import React from "react";
import { useDispatch, useSelector } from "react-redux";
import format from "date-format";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { getBookTicketChairAction } from "../store/actions/profileAction";

const useStyles = makeStyles((theme) => ({
  fixoverflow: {
    overflow: "auto",
    height: "60vh",
  },
}));

function ProfileBookTickets() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => {
    return state?.profile?.profileUser;
  });

  // ------------------------------   COL-1   --------------------
  const layDanhSachGhe = (maVe) => {
    // console.log(maVe);
    dispatch(getBookTicketChairAction(maVe));
  };
  const renderLichSuDatVe = () => {
    return profileUser?.thongTinDatVe?.map((ve, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <p>Tên phim: {ve.tenPhim}</p>
            <p>Giá vé: {ve.giaVe}</p>
            <p
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => {
                layDanhSachGhe(ve.maVe);
              }}
            >
              Ngày đặt: {format("MM/dd/yy - hh:mm", new Date(ve.ngayDat))}
            </p>
            <p>Thời lượng: {ve.thoiLuongPhim} phút</p>
          </TableCell>
        </TableRow>
      );
    });
  };

  // ------------------------------   COL-2   --------------------
  const chairBookTicket = useSelector((state) => {
    return state.profile.chairBookTicket;
  });
  // console.log(chairBookTicket);
  const renderGheDaDat = () => {
    return chairBookTicket?.map((ghe, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <p>Tên rạp: {ghe.tenHeThongRap}</p>
            <p>{ghe.tenRap}</p>
            <p>Ghế: {ghe.tenGhe}</p>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Phim đã đặt</TableCell>
              <TableCell>Ghế đã đặt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className={classes.fixoverflow}>{renderLichSuDatVe()}</div>
              </TableCell>
              <TableCell>
                <div className={classes.fixoverflow}>{renderGheDaDat()}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProfileBookTickets;
