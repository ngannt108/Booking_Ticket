import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import LichChieu from '../components/LichChieu';
import ThongTin from '../components/ThongTin';
import Loading from '../components/Loading';
import Grid from '@material-ui/core/Grid';
import format from 'date-format';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DanhGia from '../components/DanhGia';

const useStyles = makeStyles((theme) => ({
  movieDetailPage: {
    maxWidth: 940,
    margin: 'auto',
    paddingTop: '100px',
    color: 'white',
  },
  img: {
    width: '100%',
    borderRadius: 8,
    padding: '0 10px',
  },
  detail: {
    padding: '0px 10px',
  },
}));

function MovieDetailPage() {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [movieDetail, setMovieDetail] = useState(null);

  const { movieCode } = useParams();

  const getMovieDetail = async () => {
    try {
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieCode}`,
        method: 'GET',
      });
      setMovieDetail(res.data);
    } catch (error) {
      console.log(error);
      setError('404 page not found');
    }
  };
  console.log(movieDetail);

  useEffect(() => {
    getMovieDetail();
  }, []);

  const [selectedTab, setSelectedTab] = useState(0);
  console.log(selectedTab);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const bgBlur = {
    background: 'rgba(10, 32, 41, 0.5)',
    backdropFilter: 'blur(20px)',
  };

  return (
    <>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          {!movieDetail ? (
            <Loading />
          ) : (
            <h1>
              <div
                style={{
                  backgroundImage: `url(${movieDetail.hinhAnh})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top',
                }}
              >
                <Header />
                <div style={bgBlur}>
                  <div className={classes.movieDetailPage}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={5}>
                        <img
                          className={classes.img}
                          src={movieDetail.hinhAnh}
                          alt=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <div className={classes.detail}>
                          <h2>{movieDetail.tenPhim}</h2>
                          <h6>
                            Ngày khởi chiếu:{' '}
                            {format(
                              'MM/dd/yyyy',
                              new Date(movieDetail.ngayKhoiChieu)
                            )}
                          </h6>
                          <h6>Đánh giá: {movieDetail.danhGia}/10</h6>
                        </div>
                      </Grid>
                    </Grid>
                    <Tabs value={selectedTab} onChange={handleChange} centered>
                      <Tab className={classes.label} label="Lịch Chiếu" />
                      <Tab className={classes.label} label="Thông Tin" />
                      <Tab className={classes.label} label="Đánh Giá" />
                    </Tabs>
                    {selectedTab === 0 && (
                      <LichChieu maPhim={movieDetail?.maPhim} />
                    )}
                    {selectedTab === 1 && (
                      <ThongTin movieDetail={movieDetail} />
                    )}
                    {selectedTab === 2 && <DanhGia />}
                  </div>
                  <Footer />
                </div>
              </div>
            </h1>
          )}
        </>
      )}
    </>
  );
}

export default MovieDetailPage;
