import React, { useEffect, useState } from "react";
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
import { getBookTicketChairAction } from "../../store/actions/profileAction";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fixoverflow: {
    overflow: "auto",
    height: "60vh",
  },
}));

function ProfileBookTickets() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const chairBooked = useSelector((state) => {
    return state.profile.chairBookTicket;
  });
  console.log("chairbooked: ", chairBooked);

  const [chairBookedHistory, setChairBookedHistory] = useState();
  const [price, setPrice] = useState();
  // ------------------------------   COL-1   --------------------
  const layChiTietVe = (id) => {
    chairBooked.map((lichChieu, index) => {
      if (lichChieu._id === id) {
        console.log("lichChieu", lichChieu._id);
        setChairBookedHistory(lichChieu);
      }
    });
  };
  useEffect(() => {
    dispatch(getBookTicketChairAction());
  }, []);
  const renderLichSuDatVe = () => {
    return chairBooked?.map((lichChieu, index) => {
      return (
        <TableRow key={index}>
          <TableCell
            style={{ cursor: "pointer" }}
            onClick={() => {
              layChiTietVe(lichChieu._id);
            }}
          >
            <p>Tên phim: {lichChieu.phim.tenPhim}</p>
            <p>Thanh toán: {Format(lichChieu?.tienThanhToan)}</p>
            <p style={{ color: "red" }}>
              Ngày đặt:{" "}
              {format("MM/dd/yy - hh:mm", new Date(lichChieu.thoiGianDat))}
            </p>
            <p>Thời lượng: {lichChieu.phim.thoiLuong} phút</p>
            {console.log('lịch chiếu', lichChieu?.maLichChieu)}
            {(new Date(lichChieu?.maLichChieu?.ngayChieu) > Date.now() && lichChieu.daDoi == false) ? <Button
              className="btn btn-success font-weight-bold font-italic create-showtime"
              onClick={() => history.push(`/${lichChieu?.phim?.biDanh}/changeBooking/${lichChieu._id}/${lichChieu.maLichChieu._id}`)}
              fullWidth
            >
              Đổi vé
            </Button> : ''}
            {
              lichChieu.daDoi == true ? <p>ĐÃ ĐỔI VÉ</p> : ''
            }


          </TableCell>
        </TableRow>
      );
    });
  };

  // ------------------------------   COL-2   --------------------
  const chairBookTicket = useSelector((state) => {
    return state.profile.chairBookTicket;
  });

  const Format = (x) => {
    return x.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  console.log("chair", chairBookedHistory);
  const renderGheDaDat = () => {
    if (chairBookedHistory !== undefined) {
      let tongTien = 0
      chairBookedHistory.danhSachVe.map((chair) => (tongTien += chair.giaGhe))
      console.log('chairBookedHistory', chairBookedHistory.danhSachVe.map((chair) => (chair.giaGhe)))
      return (
        <TableRow>
          <TableCell>
            <p>
              Tên rạp: {chairBookedHistory?.maLichChieu?.tenCumRap?.tenCumRap}
            </p>
            <p>{chairBookedHistory?.maLichChieu?.tenRap?.tenRap}</p>
            <p>
              Ngày chiếu:{" "}
              {format(
                "MM/dd/yy - hh:mm",
                new Date(chairBookedHistory?.maLichChieu?.ngayChieu)
              )}
            </p>

            <p>Tổng tiền gốc: {Format(tongTien)}</p>
            {/* <p>Thanh toán: {Format(chairBookedHistory?.tienThanhToan)}</p> */}
            {chairBookedHistory?.danhSachVe.map((tenGhe) => {
              return (
                <p>
                  Ghế: <span style={{ color: "#01d101" }}>{tenGhe?.maGhe}</span>
                </p>
              );
            })}
            {chairBookedHistory?.danhSachGheDoi.map((tenGhe) => {
              return (
                <p>
                  Ghế sau khi đổi: <span style={{ color: "red" }}>{tenGhe}</span>
                </p>
              );
            })}
          </TableCell>
        </TableRow>
      );
    }
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
