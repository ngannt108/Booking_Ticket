import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Loading from "../../components/loading-status/Loading";
import { makeStyles } from "@material-ui/core/styles";
import {
  bookingTicketAction,
  getTicketListAction,
} from "../../store/actions/bookingAction";
import { getMovieDetailAction } from "../../store/actions/movieAction";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Container, Grid } from "@material-ui/core";
import { Form, Image, Modal } from "react-bootstrap";
import { Input } from "../../components/Input";
import "./BookingPage.css";
import { getProfileAction } from "../../store/actions/profileAction";
import QRCode from "qrcode";
// import Paypal from "./Paypal";
import axios from "axios";
import { toast } from 'react-toastify';
// import { SendMail } from "./SendMail"

const useStyles = makeStyles((theme) => ({
  BookingPage: {
    paddingTop: "136px",
    backgroundImage:
      "url(https://i.pinimg.com/originals/4c/3a/50/4c3a501aca8f297c80c9355609ab025a.jpg)",
    backgroundSize: "100% auto",
  },
  textColor: {
    color: "white",
  },
  choiceChair: {
    backgroundColor: "#6645fd !important",
    color: "white",
    "&:hover": {
      backgroundColor: "#6645fd",
    },
  },
  daDat: {
    cursor: "no-drop !important",
  },
  bill: {
    maxHeight: 320,
    overflowY: "scroll",
  },
  wrap: {
    width: "100vw",
    overflowY: "scroll",
  },
  fixoverflow: {
    overflow: "auto",
    height: "100%",
  },
}));

function ChangeTicketBookingPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { biDanh, showTimeCode, IDticket } = useParams();
  const [movie, setMovie] = useState("");
  const [chairArray, setArray] = useState([]);
  const [oldChairArray, setOldChairArray] = useState([]);
  const [ischange, setChange] = useState(false);
  // console.log(showTimeCode);
  useEffect(
    async () => {
      dispatch(getTicketListAction(biDanh, showTimeCode));
      dispatch(getMovieDetailAction(biDanh, setMovie));
      dispatch(getProfileAction());
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: `http://localhost:5000/user/history/${IDticket}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('DỮ LIỆU', res.data)
      let listOldChairs = []
      res.data.danhSachVe.map((ghe) => {
        listOldChairs.push(ghe.maGhe)
      })
      setOldChairArray(listOldChairs)
    },
    [
      /*dispatch, biDanh*/
    ]
  );

  console.log('DỮ LIỆU oldChairArray', oldChairArray)

  useEffect(() => { }, [ischange /*dispatch, biDanh*/]);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date); //d.toLocaleString("en-AU")//

      return d.toLocaleString("en-AU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }); // `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };
  const formatTime = (date) => {
    if (date) {
      const d = new Date(date); //d.toLocaleString("en-AU")//
      const time = d.toLocaleString("en-AU", {
        hour: "numeric",
        minute: "numeric",
      });
      return time;
    }
    return "";
  };
  const isLoading = useSelector((state) => {
    return state.booking.isLoading;
  });

  const isBtnLoading = useSelector((state) => {
    return state.booking.isBtnLoading;
  });

  const thongTinPhim = useSelector((state) => {
    return state.booking.thongTinPhim;
  });
  // console.log('Thông tin phim', thongTinPhim)

  const listChair = useSelector((state) => {
    return state.booking.listChair; //XONG
  });
  const listChairBooked = useSelector((state) => {
    return state.booking.listChairBooked; //XONG
  });

  // console.log('ghế trong rạp', listChair)
  // console.log('ghế đã chọn trong rạp', listChairBooked)
  // debugger;

  for (var i = 0; i < oldChairArray.length; i++) {
    for (var j = 0; j < listChair.length; j++) {
      if (oldChairArray[i] === listChair[j]) {
        listChair[j] = 'O';
      }
    }
  }
  for (var i = 0; i < listChairBooked.length; i++) {
    for (var j = 0; j < listChair.length; j++) {
      if (listChairBooked[i] === listChair[j]) {
        listChair[j] = 'X';
      }
    }
  }



  const [isValid, setIsValid] = useState(false);

  //const [chairArray, setChairArray] = useState([])
  // let chairArray = [];

  let dayDat = [[], [], [], [], [], [], [], [], [], []];
  let dayGhe = [[], [], [], [], [], [], [], [], [], []];

  useEffect(() => {
    setIsValid(isBtnLoading);
  }, [isBtnLoading]);

  for (let i = 0; i < listChair.length; i++) {
    if (i <= 9) {
      dayGhe[0].push(listChair[i]);
      //listChair[i] = 0; //["day"]
    } else if (i <= 19) {
      dayGhe[1].push(listChair[i]);
      // listChair[i] = 1;
    } else if (i <= 29) {
      dayGhe[2].push(listChair[i]);
      // listChair[i] = 2;
    } else if (i <= 39) {
      dayGhe[3].push(listChair[i]);
      // listChair[i] = 3;
    } else if (i <= 49) {
      dayGhe[4].push(listChair[i]);
      // listChair[i] = 4;
    } else if (i <= 59) {
      dayGhe[5].push(listChair[i]);
      //  listChair[i] = 5;
    } else if (i <= 69) {
      dayGhe[6].push(listChair[i]);
      //  listChair[i] = 6;
    } else if (i <= 79) {
      dayGhe[7].push(listChair[i]);
      // listChair[i] = 7;
    }
    // listChair[i] = i % 10; //[vitri]
  }
  const chairColor = (chair) => {
    var result = false;
    if (chair == "X") result = true;
    return result;
  };

  const renderListChairA = () => {
    return dayGhe[0]?.map((chair, index) => {
      return (
        <button
          style={{
            cursor: `${chair == "X" ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white", //`${chair.loaiGhe === "Thuong" ? "white" : "yellow"}`,
            backgroundColor: `${chair == "X" || chair == "O" ? "#01d101" : "rgb(116,112,112)"}`,
          }}
          onClick={(e) => {
            setChange(!ischange);
            if (e.target.classList[0] === classes.choiceChair) {
              e.target.classList.remove(classes.choiceChair); //  classes.choiceChair
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }
            } else {
              if (chairArray.length < oldChairArray.length) {
                e.target.classList.add(classes.choiceChair);
                chairArray.push(chair);
              }
            }
            console.log("ghế chọn", chairArray);
          }}
          disabled={chairColor(chair)}
          // chairColor(chair)
          variant="contained"
        >
          {chair}
          {/* //chair.daDat ? "X" : */}
        </button>
      );
    });
  };
  const renderListChairB = () => {
    return dayGhe[1]?.map((chair, index) => {
      return (
        <button
          key={index}
          style={{
            cursor: `${chair == "X" ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair == "X" || chair == "O" ? "#01d101" : "rgb(116,112,112)"}`,
          }}
          onClick={(e) => {
            setChange(!ischange);
            if (e.target.classList[0] === classes.choiceChair) {
              e.target.classList.remove(classes.choiceChair);
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }
            } else {
              if (chairArray.length < oldChairArray.length) {
                e.target.classList.add(classes.choiceChair);
                chairArray.push(chair);
              }
            }
            console.log("ghế chọn", chairArray);
          }}
          disabled={chairColor(chair)}
          variant="contained"
        >
          {chair}
        </button>
      );
    });
  };
  const renderListChairC = () => {
    return dayGhe[2]?.map((chair, index) => {
      return (
        <button
          key={index}
          style={{
            cursor: `${chair == "X" ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair == "X" || chair == "O" ? "#01d101" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            setChange(!ischange);
            if (e.target.classList[0] === classes.choiceChair) {
              e.target.classList.remove(classes.choiceChair);
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }
            } else {
              if (chairArray.length < oldChairArray.length) {
                e.target.classList.add(classes.choiceChair);
                chairArray.push(chair);
              }
            }
            console.log("ghế chọn", chairArray);
          }}
          disabled={chairColor(chair)}
          variant="contained"
        >
          {chair}
        </button>
      );
    });
  };
  const renderListChairD = () => {
    return dayGhe[3]?.map((chair, index) => {
      return (
        <button
          key={index}
          style={{
            cursor: `${chair == "X" ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair == "X" || chair == "O" ? "#01d101" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            setChange(!ischange);
            if (e.target.classList[0] === classes.choiceChair) {
              e.target.classList.remove(classes.choiceChair);
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }
            } else {
              if (chairArray.length < oldChairArray.length) {
                e.target.classList.add(classes.choiceChair);
                chairArray.push(chair);
              }
            }
            console.log("ghế chọn", chairArray);
          }}
          disabled={chairColor(chair)}
          variant="contained"
        >
          {chair}
        </button>
      );
    });
  };
  const renderListChairE = () => {
    return dayGhe[4]?.map((chair, index) => {
      return (
        <button
          key={index}
          style={{
            cursor: `${chair == "X" ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair == "X" || chair == "O" ? "#01d101" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            setChange(!ischange);
            if (e.target.classList[0] === classes.choiceChair) {
              e.target.classList.remove(classes.choiceChair);
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }
            } else {
              if (chairArray.length < oldChairArray.length) {
                e.target.classList.add(classes.choiceChair);
                chairArray.push(chair);
              }
            }
            console.log("ghế chọn", chairArray);
          }}
          disabled={chairColor(chair)}
          variant="contained"
        >
          {chair}
        </button>
      );
    });
  };
  const renderListChairF = () => {
    return dayGhe[5]?.map((chair, index) => {
      return (
        <button
          key={index}
          style={{
            cursor: `${chair == "X" ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair == "X" || chair == "O" ? "#01d101" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            setChange(!ischange);
            if (e.target.classList[0] === classes.choiceChair) {
              e.target.classList.remove(classes.choiceChair);
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }
            } else {
              if (chairArray.length < oldChairArray.length) {
                e.target.classList.add(classes.choiceChair);
                chairArray.push(chair);
              }
            }
            console.log("ghế chọn", chairArray);
          }}
          disabled={chairColor(chair)}
          variant="contained"
        >
          {chair}
        </button>
      );
    });
  };
  const renderListChairG = () => {
    return dayGhe[6]?.map((chair, index) => {
      return (
        <button
          key={index}
          style={{
            cursor: `${chair == "X" ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair == "X" || chair == "O" ? "#01d101" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            setChange(!ischange);
            if (e.target.classList[0] === classes.choiceChair) {
              e.target.classList.remove(classes.choiceChair);
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }
            } else {
              if (chairArray.length < oldChairArray.length) {
                e.target.classList.add(classes.choiceChair);
                chairArray.push(chair);
              }
              //renderTable();
            }
            console.log("ghế chọn", chairArray);
          }}
          disabled={chairColor(chair)}
          variant="contained"
        >
          {chair}
        </button>
      );
    });
  };
  const renderListChairH = () => {
    return dayGhe[7]?.map((chair, index) => {
      return (
        <button
          key={index}
          style={{
            cursor: `${chair == "X" ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair == "X" || chair == "O" ? "#01d101" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            setChange(!ischange);
            if (e.target.classList[0] === classes.choiceChair) {
              e.target.classList.remove(classes.choiceChair);
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }
            } else {
              if (chairArray.length < oldChairArray.length) {
                e.target.classList.add(classes.choiceChair);
                chairArray.push(chair);
              }
            }
            console.log("ghế chọn", chairArray);
          }}
          disabled={chairColor(chair)}
          variant="contained"
        >
          {chair}
        </button>
      );
    });
  };

  let flag = true;

  const [QR, setQR] = useState("");
  const [imgQR, setImgQR] = useState("");
  let Total = 0;
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceBefore, setTotalPriceBefore] = useState(0);
  const [isSuccessPaypal, setIsSuccessPaypal] = useState(false);

  const handleChangeBooking = () => {
    setConfirm(true);
  };


  const [isConfirm, setConfirm] = useState(false);
  const profile = useSelector((state) => state.profile.profileUser[0]);


  const confirmChangeBooking = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await axios({
        url: `http://localhost:5000/user/changeTicketBooking/${IDticket}`,
        method: "POST",
        data: { danhSachGheMoi: chairArray },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        toast.success('Bạn đã đổi vé thành công', { autoClose: 2000 });
        setConfirm(false);
        setTimeout(() => {
          history.push('/profile');
        }, 1000);

        let dataBooking;
        const qr = await QRCode.toDataURL(
          `Họ tên: ${profile?.hoTen}, suất phim: ${movie?.tenPhim
          }, chiếu lúc ${formatDate(
            thongTinPhim?.ngayChieu
          ).toString()}, Cụm rạp: ${thongTinPhim?.tenCumRap?.tenCumRap
          }, ${thongTinPhim?.tenRap?.tenRap}, Ghế cũ: ${oldChairArray}, Ghế mới: ${chairArray} `
        ).then(); //setQR
        if (qr !== false) {
          dataBooking = {
            name: profile?.hoTen,
            movieName: movie?.tenPhim,
            showtimeDate: formatDate(thongTinPhim?.ngayChieu).toString(),
            showtimeTime: formatTime(thongTinPhim?.ngayChieu).toString(),
            cinemaClusterName: thongTinPhim?.tenCumRap?.tenCumRap,
            QRCode: qr,
          };
          const res = await axios({
            url: `http://localhost:5000/user/sendchangeTicketMail`,
            method: "POST",
            data: dataBooking,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }
    }
    catch (err) {
      toast.error(err.response.data.error, { autoClose: 2000 });
    }


  }

  const Format = (x) => {
    return x.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const modalConfirm = () => {
    return (
      <>
        <Modal show={isConfirm} onHide={() => setConfirm(false)}>
          <Modal.Header>
            <Modal.Title>Xác nhận đổi vé</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="confirm">
              <Input
                Label="Tên khách hàng"
                value={profile?.hoTen}
                type="text"
                name="name"
                disabled="true"
              />
              {/* {console.log('khách hàng', name)} */}
              <Input
                Label="Tên phim"
                value={movie?.tenPhim}
                type="text"
                name="movieName"
                disabled="true"
              />
              <Input
                Label="Lịch chiếu"
                value={formatDate(thongTinPhim?.ngayChieu)}
                type="text"
                name="showtimeDate"
                disabled="true"
              />
              <Input
                Label="Lịch chiếu"
                value={formatTime(thongTinPhim?.ngayChieu)}
                type="text"
                name="showtimeTime"
                disabled="true"
              />
              <Input
                Label="Rạp phim"
                value={thongTinPhim?.tenCumRap?.tenCumRap}
                type="text"
                name="cinemaClusterName"
                disabled="true"
              />
              <Input
                Label="Ghế ngồi cũ"
                value={oldChairArray}
                type="text"
                name="cinemaClusterName"
                disabled="true"
              />
              <Input
                Label="Ghế ngồi mới"
                value={chairArray}
                type="text"
                name="cinemaClusterName"
                disabled="true"
              />

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-success" onClick={confirmChangeBooking}>
              Xác nhận
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setConfirm(false)}
            >
              Hủy
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };


  const renderTable = () => {
    //chairArray = ["A2", "B2"]
    return chairArray?.map((chair, index) => {
      //listChair
      if (chair) {
        console.log("chairArray", chair);
        // console.log("oldChairArray[index]", oldChairArray);
        return (
          <TableRow key={index}>
            <TableCell>{chair}</TableCell>
            <TableCell>{oldChairArray[index]}</TableCell>
          </TableRow>
        );
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <div className={classes.BookingPage}>
            <Container>
              <Grid container spacing={3}>
                <Grid item md={8} className={classes.wrap}>
                  <div style={{ width: "100%" }}>
                    <img
                      style={{ width: "100%", minWidth: 700 }}
                      src="https://tix.vn/app/assets/img/icons/screen.png"
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      minWidth: 700,
                    }}
                  >
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                        style={{ backgroundColor: "black" }}
                      >
                        <TableHead></TableHead>
                        <TableBody>
                          <TableRow>{renderListChairA()}</TableRow>
                          <TableRow>{renderListChairB()}</TableRow>
                          <TableRow>{renderListChairC()}</TableRow>
                          <TableRow>{renderListChairD()}</TableRow>
                          <TableRow>{renderListChairE()}</TableRow>
                          <TableRow>{renderListChairF()}</TableRow>
                          <TableRow>{renderListChairG()}</TableRow>
                          <TableRow>{renderListChairH()}</TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Grid>
                <Grid item md={4} style={{ margin: "auto" }}>
                  <img
                    src={thongTinPhim?.hinhAnh}
                    alt=""
                    width="100%"
                    height="auto"
                  />
                  {/* <p>Tên phim: {thongTinPhim?.tenPhim}</p> */}
                  <p className={classes.textColor}>
                    Tên phim: {movie?.tenPhim}
                  </p>
                  <p className={classes.textColor}>
                    Cụm rạp: {thongTinPhim?.tenCumRap?.tenCumRap}
                  </p>
                  <p className={classes.textColor}>
                    {thongTinPhim?.tenRap?.tenRap}
                  </p>
                  {/*  */}
                  <p className={classes.textColor}>
                    Ngày chiếu: {formatDate(thongTinPhim?.ngayChieu)} - Giờ
                    chiếu: {formatTime(thongTinPhim?.ngayChieu)}
                  </p>
                  <p className={classes.textColor}>O: Ghế cũ bạn đã chọn </p>
                  <p className={classes.textColor}>X:Ghế đã có người đặt</p>
                  <br />
                  <hr />
                  <br />
                  <div className={classes.bill}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Ghế mới</TableCell>
                            <TableCell>
                              Ghế cũ
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {renderTable()}
                          <TableRow>
                            <TableCell>Số vé muốn đổi: </TableCell>
                            <TableCell>
                              {oldChairArray.length}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div style={{ textAlign: "left", margin: "10px" }}>
                    <Button
                      onClick={() => history.push('/profile')}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Trở về
                    </Button>

                    <Button
                      disabled={chairArray.length == oldChairArray.length ? false : true}
                      onClick={handleChangeBooking}
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ margin: "30px" }}
                    >
                      Đổi vé
                    </Button>
                  </div>
                  {/* <div style={{ textAlign: "right", margin: "30px" }}>
                    <Button
                      disabled={chairArray.length > 0 ? false : true}
                      onClick={handleChangeBooking}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Đổi vé
                    </Button>
                  </div> */}
                </Grid>
              </Grid>
            </Container>
            {isConfirm == true ? modalConfirm() : ""}
            {/* {isConfirm == true
              ? renderQR()
              : ""} */}
          </div>
        </div>
      )}
    </>
  );

}
export default ChangeTicketBookingPage;
