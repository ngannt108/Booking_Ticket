import { Container, Grid } from "@material-ui/core";
import React from "react";
import "./Footer.css";

import go from "./FooterImg/img/123go.png";
import agribank from "./FooterImg/img/AGRIBANK.png";
import bhd from "./FooterImg/img/bhd.png";
import beta from "./FooterImg/img/bt.jpg";
import cgv from "./FooterImg/img/cgv.png";
import cinestar from "./FooterImg/img/cinestar.png";
import cnx from "./FooterImg/img/cnx.jpg";
import dcine from "./FooterImg/img/dcine.png";
import ddc from "./FooterImg/img/dongdacinema.png";
import galaxy from "./FooterImg/img/galaxycine.png";
import ivb from "./FooterImg/img/IVB.png";
import laban from "./FooterImg/img/laban.png";
import lotte from "./FooterImg/img/lotte.png";
import mega from "./FooterImg/img/megags.png";
import payoo from "./FooterImg/img/payoo.jpg";
import starLight from "./FooterImg/img/STARLIGHT.png";
import touch from "./FooterImg/img/TOUCH.png";
import vcb from "./FooterImg/img/VCB.png";
import viettin from "./FooterImg/img/VIETTINBANK.png";
import zalo from "./FooterImg/img/zalopay_icon.png";
import android from "./FooterImg/img/android-logo.png";
import apple from "./FooterImg/img/apple-logo.png";
import zaloLogo from "./FooterImg/img/zalo-logo.png";
import fbLogo from "./FooterImg/img/facebook-logo.png";
import bct from "./FooterImg/img/bctpng.png";
import zion from "./FooterImg/img/zion-logo.jpg";

function Footer() {
  return (
    <div className="footer">
      <Container maxWidth="lg">
        <Grid container className="footerP">
          <Grid item md={4}>
            <p>TIX</p>
            <Grid container>
              <Grid item md={6}>
                <a href="">FAQ</a>
                <br />
                <a href="">Brand Guidelines</a>
              </Grid>
              <Grid item md={6}>
                <a href="">Thỏa thuận sử dụng</a>
                <br />
                <a href="">Chính sách bảo mật</a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <p>ĐỐI TÁC</p>
            <Grid container className="footerA">
              <a href="">
                <img className="footerImg" src={cgv} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={bhd} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={galaxy} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={cinestar} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={lotte} alt="" />
              </a>
            </Grid>
            <Grid container className="footerA">
              <a href="">
                <img className="footerImg" src={mega} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={beta} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={ddc} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={touch} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={cnx} alt="" />
              </a>
            </Grid>
            <Grid container className="footerA">
              <a href="">
                <img className="footerImg" src={starLight} alt="" />
              </a>

              <a href="">
                <img className="footerImg" src={dcine} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={zalo} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={payoo} alt="" />
              </a>
              <a href="">
                {" "}
                <img className="footerImg" src={vcb} alt="" />
              </a>
            </Grid>
            <Grid container className="footerA">
              <a href="">
                <img className="footerImg" src={agribank} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={viettin} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={ivb} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={go} alt="" />
              </a>
              <a href="">
                <img className="footerImg" src={laban} alt="" />
              </a>
            </Grid>
          </Grid>
          <Grid item md={2}>
            <p>MOBILE APP</p>
            <Grid container>
              <a href="">
                <img className="footerApp" src={apple} alt="" />
              </a>
              <a href="">
                <img className="footerApp" src={android} alt="" />
              </a>
            </Grid>
          </Grid>
          <Grid item md={2}>
            <p>SOCIAL</p>
            <Grid container>
              <a href="">
                <img className="footerApp" src={fbLogo} alt="" />
              </a>
              <a href="">
                <img className="footerApp" src={zaloLogo} alt="" />
              </a>
            </Grid>
          </Grid>
        </Grid>
        <hr />
        <Grid container style={{ marginTop: "30px" }}>
          <Grid item md={2} sm={1}>
            <img className="zion" src={zion} alt="" />
          </Grid>
          <Grid item md={8} sm={9}>
            <div className="footerText">
              <span style={{ color: "#fff" }}>
                TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
              </span>{" "}
              <br />
              <span>
                Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
                Chí Minh, Việt Nam.
              </span>{" "}
              <br />
              <span>
                Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
                <br /> đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do
                Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
              </span>
              <br />
              <span>
                Số Điện Thoại (Hotline): 1900 545 436 <br />
                Email:{" "}
                <a style={{ color: "#FB4226", textDecoration: "none" }} href="">
                  support@tix.vn
                </a>
              </span>
            </div>
          </Grid>
          <Grid item md={2} sm={2}>
            <img className="bct" src={bct} alt="" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
