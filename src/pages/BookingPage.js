import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { makeStyles } from '@material-ui/core/styles';
import {
  bookingTicketAction,
  choiceChairAction,
  getTicketListAction,
} from '../store/actions/bookingAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Container, Grid } from '@material-ui/core';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  BookingPage: {
    paddingTop: '100px',
  },
  choiceChair: {
    backgroundColor: '#6645fd !important',
    color: 'white',
    '&:hover': {
      backgroundColor: '#6645fd',
    },
  },
  daDat: {
    cursor: 'no-drop !important',
  },
  bill: {
    maxHeight: 320,
    overflowY: 'scroll',
  },
  wrap: {
    width: '100vw',
    overflowY: 'scroll',
  },
  fixoverflow: {
    overflow: 'auto',
    height: '100%',
  },
}));

function BookingPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { showTimeCode } = useParams();
  // console.log(showTimeCode);
  useEffect(() => {
    dispatch(getTicketListAction(showTimeCode));
  }, [dispatch, showTimeCode]);

  const isLoading = useSelector((state) => {
    return state.booking.isLoading;
  });

  const isBtnLoading = useSelector((state) => {
    return state.booking.isBtnLoading;
  });

  const thongTinPhim = useSelector((state) => {
    return state.booking.thongTinPhim.thongTinPhim;
  });

  const listChair = useSelector((state) => {
    return state.booking.listChair;
  });
  //   console.log(listChair);

  const [isValid, setIsValid] = useState(true);
  const chairDangChon = listChair.filter((chair) => chair.dangChon);

  useEffect(() => {
    if (chairDangChon.length > 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [chairDangChon]);

  useEffect(() => {
    setIsValid(isBtnLoading);
  }, [isBtnLoading]);

  const handleChoice = (chair) => {
    dispatch(choiceChairAction(chair));
  };
  let dayDat = [[], [], [], [], [], [], [], [], [], []];
  let dayGhe = [[], [], [], [], [], [], [], [], [], []];

  for (let i = 0; i < listChair.length; i++) {
    if (i <= 15) {
      dayGhe[0].push(listChair[i]);
      listChair[i]['day'] = 0;
    } else if (i <= 31) {
      dayGhe[1].push(listChair[i]);
      listChair[i]['day'] = 1;
    } else if (i <= 47) {
      dayGhe[2].push(listChair[i]);
      listChair[i]['day'] = 2;
    } else if (i <= 63) {
      dayGhe[3].push(listChair[i]);
      listChair[i]['day'] = 3;
    } else if (i <= 79) {
      dayGhe[4].push(listChair[i]);
      listChair[i]['day'] = 4;
    } else if (i <= 95) {
      dayGhe[5].push(listChair[i]);
      listChair[i]['day'] = 5;
    } else if (i <= 111) {
      dayGhe[6].push(listChair[i]);
      listChair[i]['day'] = 6;
    } else if (i <= 127) {
      dayGhe[7].push(listChair[i]);
      listChair[i]['day'] = 7;
    } else if (i <= 143) {
      dayGhe[8].push(listChair[i]);
      listChair[i]['day'] = 8;
    } else if (i <= 159) {
      dayGhe[9].push(listChair[i]);
      listChair[i]['day'] = 9;
    }
    listChair[i]['vitri'] = i % 16;
  }

  const renderListChairA = () => {
    return dayGhe[0]?.map((chair, index) => {
      return (
        <button
          style={{
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
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
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
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
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
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
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
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
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
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
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
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
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
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
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
        </button>
      );
    });
  };
  const renderListChairI = () => {
    return dayGhe[8]?.map((chair, index) => {
      return (
        <button
          key={index}
          style={{
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
        </button>
      );
    });
  };
  const renderListChairJ = () => {
    return dayGhe[9]?.map((chair, index) => {
      return (
        <button
          key={index}
          style={{
            cursor: `${chair.daDat ? 'no-drop' : 'pointer'}`,
            width: '4.5%',
            minWidth: 30,
            height: 30,
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            color: `${chair.loaiGhe === 'Thuong' ? 'white' : 'yellow'}`,
            backgroundColor: `${chair.daDat ? 'black' : 'rgb(116,112,112)'}`,
          }}
          className={chair.dangChon ? classes.choiceChair : ''}
          onClick={() => handleChoice(chair)}
          disabled={chair.daDat}
          variant="contained"
        >
          {chair.daDat ? 'X' : chair.tenGhe}
        </button>
      );
    });
  };

  const renderTable = () => {
    return listChair?.map((chair, index) => {
      if (chair.dangChon) {
        return (
          <TableRow key={index}>
            <TableCell>{chair.tenGhe}</TableCell>
            <TableCell>{chair.loaiGhe}</TableCell>
            <TableCell>{chair.giaVe}</TableCell>
          </TableRow>
        );
      }
    });
  };

  let flag = true;

  const handleOneRow = (bookedRow) => {
    const day = bookedRow[0]['day'];

    let binDemo = '';
    for (let i = 0; i < 16; i++) {
      if (dayGhe[day][i]['daDat'] === true) binDemo += '1';
      else if (bookedRow.findIndex((e) => e['vitri'] === i) >= 0)
        binDemo += '1';
      else binDemo += '0';
    }

    if (binDemo.split('1').findIndex((e) => e === '0') >= 0) {
      Swal.fire(
        'Thông Báo',
        'Không được chừa trống ghế ở giữa hoặc ở hai hàng ngoài cùng ',
        'error'
      );
      flag = false;
    }
  };

  const handleBooking = () => {
    const listChairChoice = listChair.filter((chair) => chair.dangChon);
    for (let i = 0; i < listChairChoice.length; i++) {
      dayDat[listChairChoice[i]['day']].push({
        vitri: listChairChoice[i]['vitri'],
        day: listChairChoice[i]['day'],
      });
    }
    for (let i = 0; i < 10; i++) {
      if (dayDat[i].length > 0) {
        handleOneRow(dayDat[i]);
      }
    }
    if (flag) {
      dispatch(bookingTicketAction(showTimeCode, listChairChoice, history));
    }
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
                  <div style={{ width: '100%' }}>
                    <img
                      style={{ width: '100%', minWidth: 700 }}
                      src="https://tix.vn/app/assets/img/icons/screen.png"
                    />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      width: '100%',
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
                          <TableRow>{renderListChairI()}</TableRow>
                          <TableRow>{renderListChairJ()}</TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Grid>
                <Grid item md={4} style={{ margin: 'auto' }}>
                  <img
                    src={thongTinPhim?.hinhAnh}
                    alt=""
                    width="100%"
                    height="auto"
                  />
                  <p>Tên phim: {thongTinPhim?.tenPhim}</p>
                  <p>Rạp: {thongTinPhim?.tenCumRap}</p>
                  <p>Địa chỉ: {thongTinPhim?.diaChi}</p>
                  <p>{thongTinPhim?.tenRap}</p>
                  <p>
                    Ngày chiếu: {thongTinPhim?.ngayChieu} - Giờ chiếu:{' '}
                    {thongTinPhim?.gioChieu}
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
                            <TableCell>Loại ghế</TableCell>
                            <TableCell>Giá vé</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {renderTable()}
                          <TableRow>
                            <TableCell>Tổng tiền:</TableCell>
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
                  <div style={{ textAlign: 'center', margin: '30px' }}>
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
