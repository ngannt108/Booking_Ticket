import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Loading from "../../components/loading-status/Loading";
import { makeStyles } from "@material-ui/core/styles";
import {
  bookingTicketAction,
  choiceChairAction,
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
import Swal from "sweetalert2";
import { QR } from "./QR";
import { Form, Image, Modal } from "react-bootstrap";
import { Input } from "../../components/Input";
import emailjs from "emailjs-com";
import "./BookingPage.css";
import { getProfileAction } from "../../store/actions/profileAction";
import QRCode from "qrcode";
// import Paypal from "./Paypal";
import axios from "axios";
// import { SendMail } from "./SendMail"

const useStyles = makeStyles((theme) => ({
  BookingPage: {
    paddingTop: "100px",
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

function BookingPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { biDanh, showTimeCode } = useParams();
  const [movie, setMovie] = useState("");
  const [chairArray, setArray] = useState([]);
  const [ischange, setChange] = useState(false);
  // console.log(showTimeCode);
  useEffect(
    () => {
      dispatch(getTicketListAction(biDanh, showTimeCode));
      dispatch(getMovieDetailAction(biDanh, setMovie));
      dispatch(getProfileAction());
    },
    [
      /*dispatch, biDanh*/
    ]
  );
  useEffect(() => {}, [ischange /*dispatch, biDanh*/]);

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

  for (var i = 0; i < listChairBooked.length; i++) {
    for (var j = 0; j < listChair.length; j++) {
      if (listChairBooked[i] === listChair[j]) {
        listChair[j] = "X";
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
            backgroundColor: `${chair == "X" ? "black" : "rgb(116,112,112)"}`,
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
              e.target.classList.add(classes.choiceChair);
              chairArray.push(chair);
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
            backgroundColor: `${chair == "X" ? "black" : "rgb(116,112,112)"}`,
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
              e.target.classList.add(classes.choiceChair);
              chairArray.push(chair);
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
            backgroundColor: `${chair == "X" ? "black" : "rgb(116,112,112)"}`,
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
              e.target.classList.add(classes.choiceChair);
              chairArray.push(chair);
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
            backgroundColor: `${chair == "X" ? "black" : "rgb(116,112,112)"}`,
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
              e.target.classList.add(classes.choiceChair);
              chairArray.push(chair);
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
            backgroundColor: `${chair == "X" ? "black" : "rgb(116,112,112)"}`,
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
              e.target.classList.add(classes.choiceChair);
              chairArray.push(chair);
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
            backgroundColor: `${chair == "X" ? "black" : "rgb(116,112,112)"}`,
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
              e.target.classList.add(classes.choiceChair);
              chairArray.push(chair);
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
            backgroundColor: `${chair == "X" ? "black" : "rgb(116,112,112)"}`,
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
              e.target.classList.add(classes.choiceChair);
              chairArray.push(chair);
              renderTable();
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
            backgroundColor: `${chair == "X" ? "black" : "rgb(116,112,112)"}`,
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
              e.target.classList.add(classes.choiceChair);
              chairArray.push(chair);
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

  // BOOKING
  const [QR, setQR] = useState("");
  const [imgQR, setImgQR] = useState("");
  let Total = 0;
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSuccessPaypal, setIsSuccessPaypal] = useState(false);
  // useEffect(async () => {
  //   const qr = await QRCode.toDataURL('test thử').then(setQR);
  //   if (qr) {
  //     var image = document.createElement('image')
  //     image.setAttribute("src", qr)
  //     console.log(image, "HÌNH ẢNH")
  //     setImgQR(image) //<Image src={QR} />
  //   }

  // }, [])

  const handleBooking = () => {
    if (chairArray) {
      chairArray.forEach((chair) => {
        Total += thongTinPhim?.giaVe;
      });
      setTotalPrice(Total);
    }
    setConfirm(true);

    //style={{ width: '40px', height: '40px' }}
    // dispatch(
    //   bookingTicketAction(showTimeCode, biDanh, { danhSachGhe: chairArray })
    // );
  };

  console.log("đường dẫn", QR);
  const renderQR = () => {
    return (
      <div>
        <Image src={QR} />
      </div>
    );
  };

  const [isConfirm, setConfirm] = useState(false);
  const profile = useSelector((state) => state.profile.profileUser[0]);

  let imageQRcode;
  useEffect(async () => {
    await QRCode.toDataURL("test").then(setQR);
    const dataBooking = {
      name: profile?.hoTen,
      movieName: movie?.tenPhim,
      showtimeDate: formatDate(thongTinPhim?.ngayChieu).toString(),
      showtimeTime: formatTime(thongTinPhim?.ngayChieu).toString(),
      cinemaClusterName: thongTinPhim?.tenCumRap?.tenCumRap,
      QRCode: QR,
    };

    if (isSuccessPaypal == true) {
      dispatch(
        bookingTicketAction(showTimeCode, biDanh, { danhSachGhe: chairArray })
      );
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        url: `http://localhost:5000/user/sendEmailBooking`,
        method: "POST",
        data: dataBooking,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log('kết quả', result)
      // QRCode.toDataURL('test').then(setQR);
      // if (result)
      {
        // if (qr) {
        //   console.log('QR', qr)
        //   imageQRcode = document.createElement('image')
        //   imageQRcode.setAttribute("src", QR)
        //   console.log(imageQRcode, "HÌNH ẢNH")
        //setImgQR(imageQRcode) //<Image src={QR} />
        //}

        // emailjs.send('service_zbo2i1v', 'template_u22c938',
        //   {
        //     name: profile?.hoTen,
        //     movieName: movie?.tenPhim,
        //     showtimeDate: formatDate(thongTinPhim?.ngayChieu).toString(),
        //     showtimeTime: formatTime(thongTinPhim?.ngayChieu).toString(),
        //     cinemaClusterName: thongTinPhim?.tenCumRap?.tenCumRap,
        //     QRCode: 'imageQRcode'
        //   },
        //   'user_fHd8DhFxCFsbFXqbnCExx')
        //   .then((res) => console.log('thành công', res))
        //   .catch(err => console.log('thất bại', err))
        setConfirm(false); //đóng modal
        setIsSuccessPaypal(false);
      }
    }
  }, [isSuccessPaypal]);

  //PAYPAL
  const Paypal = ({ total }) => {
    const paypal = useRef();
    //const [isSuccess, setIsSucess] = useState(false)
    console.log("tổng tiền", total);
    // const totalBill = useSelector(state => state.user.totalCurrentBill)
    // const [bill, setBill] = useState('')
    // console.log(totalBill)
    useEffect(async () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Thanh toán vé phim",
                  amount: {
                    currency_code: "CAD",
                    value: (total / 23000).toFixed(2), //Math.round
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            setIsSuccessPaypal(true);
            //dispatch(bookingTicketAction(showTimeCode, biDanh, { danhSachGhe: chairArray }));
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }, []);

    return (
      <div>
        <div ref={paypal}></div>
      </div>
    );
  };

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
            <Modal.Title>Xác nhận mua vé</Modal.Title>
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
              <h6>Tổng tiền cần thanh toán {Format(totalPrice)}</h6>
              <Paypal total={totalPrice} />
              {/* variant="primary" */}
              {/* <Button className="btn btn-success" type="submit">
                Xác nhận
              </Button> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <button className="btn btn-success" onClick={send}>
             Xác nhận
           </button> */}
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
        return (
          <TableRow key={index}>
            <TableCell>{chair}</TableCell>
            <TableCell>{thongTinPhim?.giaVe}</TableCell>
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
                  <p>Tên phim: {movie?.tenPhim}</p>
                  <p>Cụm rạp: {thongTinPhim?.tenCumRap?.tenCumRap}</p>
                  <p>{thongTinPhim?.tenRap?.tenRap}</p>
                  {/*  */}
                  <p>
                    Ngày chiếu: {formatDate(thongTinPhim?.ngayChieu)} - Giờ
                    chiếu: {formatTime(thongTinPhim?.ngayChieu)}
                  </p>
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
                            <TableCell>Ghế</TableCell>
                            <TableCell>
                              Giá vé {console.log(chairArray.length, "số vé")}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {renderTable()}
                          <TableRow>
                            <TableCell>Tổng tiền: </TableCell>
                            <TableCell>
                              {chairArray.reduce(
                                (tongTien, chair) =>
                                  (tongTien += thongTinPhim?.giaVe),
                                0
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div style={{ textAlign: "center", margin: "30px" }}>
                    <Button
                      disabled={chairArray.length > 0 ? false : true}
                      onClick={handleBooking}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Đặt vé
                    </Button>
                  </div>
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

export default BookingPage;
