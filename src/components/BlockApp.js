import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './BlockApp.css';
import Slider from 'react-slick';
import { Button, Container, Grid } from '@material-ui/core';
import slide1 from './BlockAppImg/img/slide1.jpg';
import slide2 from './BlockAppImg/img/slide2.jpg';
import slide3 from './BlockAppImg/img/slide3.jpg';
import slide4 from './BlockAppImg/img/slide4.jpg';
import slide5 from './BlockAppImg/img/slide5.jpg';
import slide6 from './BlockAppImg/img/slide6.jpg';
import slide7 from './BlockAppImg/img/slide7.jpg';
import slide8 from './BlockAppImg/img/slide8.jpg';
import slide9 from './BlockAppImg/img/slide9.jpg';
import slide10 from './BlockAppImg/img/slide10.jpg';
import slide11 from './BlockAppImg/img/slide11.jpg';
import slide12 from './BlockAppImg/img/slide12.jpg';
import slide13 from './BlockAppImg/img/slide13.jpg';
import slide14 from './BlockAppImg/img/slide14.jpg';
import slide15 from './BlockAppImg/img/slide15.jpg';
import slide16 from './BlockAppImg/img/slide16.jpg';

const useStyles = makeStyles((theme) => ({
  BlockApp: {
    maxWidth: 940,
    margin: 'auto',
    paddingTop: '100px',
  },
}));

function BlockApp() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div id="ung-dung" className="blockApp" style={{ marginTop: '100px' }}>
      <Container maxWidth="lg">
        <Grid className="blockAppGrid" container>
          <Grid item md={8} xs={12}>
            <div className="text">
              <p>Ứng dụng tiện lợi dành cho người yêu điện ảnh</p>
              <p style={{ fontSize: 'medium' }}>
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                và đổi quà hấp dẫn.
              </p>
              <Button className="blockAppBtn">
                App miễn phí - Tải về ngay!
              </Button>
              <p>TIX có hai phiên bản iOS & Android</p>
            </div>
          </Grid>
          <Grid item md={2} xs={4} className="blockAppGridImg">
            <Slider {...settings}>
              <img className="blockAppImg" src={slide1} alt="" />
              <img className="blockAppImg" src={slide2} alt="" />
              <img className="blockAppImg" src={slide3} alt="" />
              <img className="blockAppImg" src={slide4} alt="" />
              <img className="blockAppImg" src={slide5} alt="" />
              <img className="blockAppImg" src={slide6} alt="" />
              <img className="blockAppImg" src={slide7} alt="" />
              <img className="blockAppImg" src={slide8} alt="" />
              <img className="blockAppImg" src={slide9} alt="" />
              <img className="blockAppImg" src={slide10} alt="" />
              <img className="blockAppImg" src={slide11} alt="" />
              <img className="blockAppImg" src={slide12} alt="" />
              <img className="blockAppImg" src={slide13} alt="" />
              <img className="blockAppImg" src={slide14} alt="" />
              <img className="blockAppImg" src={slide15} alt="" />
              <img className="blockAppImg" src={slide16} alt="" />
            </Slider>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BlockApp;
