import React, { useEffect, useState } from "react";
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
  const [movie, setMovie] = useState('')
  const [isSelect, setIsSelect] = useState(false)
  const [array, setArray] = useState([])
  // console.log(showTimeCode);
  useEffect(
    () => {
      dispatch(getTicketListAction(biDanh, showTimeCode));
      renderTable()
    },
    [isSelect
      /*dispatch, biDanh*/
    ]
  );

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
        listChair[j] = 'X'
      }
    }
  }


  const [isValid, setIsValid] = useState(true);


  useEffect(() => {
    setIsValid(isBtnLoading);
  }, [isBtnLoading]);
  //const [chairArray, setChairArray] = useState([])
  let chairArray = []

  let dayDat = [[], [], [], [], [], [], [], [], [], []];
  let dayGhe = [[], [], [], [], [], [], [], [], [], []];

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
    var result = false
    if (chair == 'X')
      result = true
    return result
  }

  const renderListChairA = () => {
    return dayGhe[0]?.map((chair, index) => {
      return (
        <button
          style={{
            cursor: `${chair == 'X' ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white", //`${chair.loaiGhe === "Thuong" ? "white" : "yellow"}`,
            backgroundColor: `${chair == 'X' ? "black" : "rgb(116,112,112)"}`,
          }}
          onClick={(e) => {
            if (e.target.classList[0] === 'makeStyles-choiceChair-24') {
              e.target.classList.remove('makeStyles-choiceChair-24')
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }

            }
            else {
              e.target.classList.add('makeStyles-choiceChair-24')
              setArray(chairArray.push(chair))
            }
            console.log('ghế chọn', chairArray)
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
            cursor: `${chair == 'X' ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair.daDat ? "black" : "rgb(116,112,112)"}`,
          }}

          onClick={(e) => {
            if (e.target.classList[0] === 'makeStyles-choiceChair-24') {
              e.target.classList.remove('makeStyles-choiceChair-24')
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }

            }
            else {
              e.target.classList.add('makeStyles-choiceChair-24')
              chairArray.push(chair)
            }
            console.log('ghế chọn', chairArray)
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
            cursor: `${chair == 'X' ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair.daDat ? "black" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            if (e.target.classList[0] === 'makeStyles-choiceChair-24') {
              e.target.classList.remove('makeStyles-choiceChair-24')
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }

            }
            else {
              e.target.classList.add('makeStyles-choiceChair-24')
              chairArray.push(chair)
            }
            console.log('ghế chọn', chairArray)
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
            cursor: `${chair == 'X' ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair.daDat ? "black" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            if (e.target.classList[0] === 'makeStyles-choiceChair-24') {
              e.target.classList.remove('makeStyles-choiceChair-24')
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }

            }
            else {
              e.target.classList.add('makeStyles-choiceChair-24')
              chairArray.push(chair)
            }
            console.log('ghế chọn', chairArray)
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
            cursor: `${chair == 'X' ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair.daDat ? "black" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            if (e.target.classList[0] === 'makeStyles-choiceChair-24') {
              e.target.classList.remove('makeStyles-choiceChair-24')
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }

            }
            else {
              e.target.classList.add('makeStyles-choiceChair-24')
              chairArray.push(chair)
            }
            console.log('ghế chọn', chairArray)
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
            cursor: `${chair == 'X' ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair.daDat ? "black" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            if (e.target.classList[0] === 'makeStyles-choiceChair-24') {
              e.target.classList.remove('makeStyles-choiceChair-24')
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }

            }
            else {
              e.target.classList.add('makeStyles-choiceChair-24')
              chairArray.push(chair)
            }
            console.log('ghế chọn', chairArray)
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
            cursor: `${chair == 'X' ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair.daDat ? "black" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            if (e.target.classList[0] === 'makeStyles-choiceChair-24') {
              e.target.classList.remove('makeStyles-choiceChair-24')
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }
            }
            else {
              e.target.classList.add('makeStyles-choiceChair-24')
              chairArray.push(chair)
              renderTable()
            }
            console.log('ghế chọn', chairArray)
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
            cursor: `${chair == 'X' ? "no-drop" : "pointer"}`,
            width: "4.5%",
            minWidth: 30,
            height: 30,
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: `${chair.daDat ? "black" : "rgb(116,112,112)"}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ""}
          onClick={(e) => {
            if (e.target.classList[0] === 'makeStyles-choiceChair-24') {
              e.target.classList.remove('makeStyles-choiceChair-24')
              const index = chairArray.indexOf(chair);
              if (index > -1) {
                chairArray.splice(index, 1);
              }

            }
            else {
              e.target.classList.add('makeStyles-choiceChair-24')
              chairArray.push(chair)
            }
            console.log('ghế chọn', chairArray)
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

  const handleOneRow = (bookedRow) => {
    const day = bookedRow[0]["day"];

    let binDemo = "";
    for (let i = 0; i < 10; i++) {
      if (dayGhe[day][i]["daDat"] === true) binDemo += "1";
      else if (bookedRow.findIndex((e) => e["vitri"] === i) >= 0)
        binDemo += "1";
      else binDemo += "0";
    }

    if (binDemo.split("1").findIndex((e) => e === "0") >= 0) {
      Swal.fire(
        "Thông Báo",
        "Không được chừa trống ghế ở giữa hoặc ở hai hàng ngoài cùng ",
        "error"
      );
      flag = false;
    }
  };

  const handleBooking = () => {
    const listChairChoice = listChair.filter((chair) => chair.dangChon);
    for (let i = 0; i < listChairChoice.length; i++) {
      dayDat[listChairChoice[i]["day"]].push({
        vitri: listChairChoice[i]["vitri"],
        day: listChairChoice[i]["day"],
      });
    }
    for (let i = 0; i < 10; i++) {
      if (dayDat[i].length > 0) {
        handleOneRow(dayDat[i]);
      }
    }
    if (flag) {
      dispatch(bookingTicketAction(biDanh, listChairChoice, history));
    }
  };

  const renderTable = () => {

    //chairArray = ["A2", "B2"]
    return chairArray?.map((chair, index) => {  //listChair
      if (chair) {
        console.log('chairArray', chair)
        return (
          <TableRow key={index}>
            <TableCell>{chair}</TableCell>
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
                  <p>Cụm rạp: {thongTinPhim?.tenCumRap?.tenCumRap}</p>
                  <p>{thongTinPhim?.tenRap?.tenRap}</p>
                  {/*  */}
                  <p>
                    Ngày chiếu: {formatDate(thongTinPhim?.ngayChieu)} - Giờ chiếu:{" "}
                    {formatTime(thongTinPhim?.ngayChieu)}
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
                            <TableCell>Giá vé {chairArray.length}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {renderTable()}
                          <TableRow>
                            <TableCell>Tổng tiền: </TableCell>
                            <TableCell colSpan="1"></TableCell>
                            <TableCell>
                              {listChair
                                .filter((chair) => chair.dangChon)
                                .reduce(
                                  (tongTien, chair) =>
                                    (tongTien += chair.giaVe),
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
                      disabled={isValid}
                      onClick={handleBooking}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Booking
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingPage;
