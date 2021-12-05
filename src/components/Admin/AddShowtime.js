import {
    FormControl,
    Grid,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Button,
    TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getMovieListNowShowingAction } from "../store/actions/movieAction";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import format from "date-format";
import { Input } from '../../components/Input';

import Paper from "@material-ui/core/Paper";

import "./AddShowtime.css"
import { getCumRapChieuAction, getListMoviePageAction, getRapChieuAction, taoLichChieuAction } from "../../store/actions/adminAction";
import { getMovieDetailAction } from "../../store/actions/movieAction";

function AddShowTime() {
    const dispatch = useDispatch();
    const [movieDetail, setMovieDetail] = useState('')
    const [maPhim, setMaPhim] = useState("");
    const [biDanh, setBiDanh] = useState("");//
    const [ngayChieuPhim, setNgayChieuPhim] = useState("")//
    useEffect(() => {
        dispatch(getRapChieuAction())
        dispatch(getListMoviePageAction())
        dispatch(getCumRapChieuAction())
        //  dispatch(getMovieListNowShowingAction("GP01"));
    }, []);//dispatch

    const movieList = useSelector(state => state.admin.listMovie);

    const renderPhim = () => {
        return movieList?.map((movie, index) => {
            return (
                <MenuItem key={index} value={movie.biDanh}>
                    {movie.tenPhim}
                </MenuItem>
            );
        });
    };
    const handleChangePhim = async (e) => {
        setBiDanh(e.target.value)

        dispatch(getMovieDetailAction(biDanh, setMovieDetail))
        // console.log('chi tiết phim', movieDetail)
        // setThoiLuong(movieDetail.thoiLuong)
        // console.log('thời lượng', thoiLuong)


    };

    const listRapChieu = useSelector(state => state.admin.listRapChieu);
    const renderRapChieu = () => {
        return listRapChieu?.map((rap, index) => {
            return (
                <MenuItem key={index} value={rap._id}>
                    {rap.tenRap}
                </MenuItem>
            );
        });
    };


    const cumRapChieu = useSelector(state => state.admin.cumRapChieu);
    const renderCumRapChieu = () => {
        return cumRapChieu?.map((cumRap, index) => {
            return (
                <MenuItem key={index} value={cumRap._id}>
                    {cumRap.tenCumRap}
                </MenuItem>
            );
        });
    };


    const gioChieu = useSelector((state) => {
        return state.admin?.gioChieu;
    });


    useEffect(() => {
        //  dispatch(getCinemaListAction());
    }, [dispatch]);
    const cinemaList = useSelector((state) => {
        return state.cinema?.cinemaList;
    });


    const cinemaCluster = useSelector((state) => {
        return state.cinema?.cinemaCluster;
    });

    const renderCumRap = () => {
        return cinemaCluster.map((cluster, index) => {
            return (
                <MenuItem key={index} value={cluster.maCumRap}>
                    {cluster.tenCumRap}
                </MenuItem>
            );
        });
    };
    const [maCumRap, setMaCumRap] = useState();
    const handleChangeCumRap = (e) => {
        setMaCumRap(e.target.value);
        console.log('mã cụm rạp', maCumRap)
        //  dispatch(getDanhSachRapAction(maHeThongRap, e.target.value));
    };

    const danhSachRap = useSelector((state) => {
        return state.cinema?.danhSachRap?.danhSachRap;
    });
    const renderDanhSachRap = () => {
        return danhSachRap?.map((rap, index) => {
            return (
                <MenuItem key={index} value={rap.maRap}>
                    {rap.tenRap}
                </MenuItem>
            );
        });
    };
    const [maRap, setMaRap] = useState();
    const handleChangeMaRap = (e) => {
        setMaRap(e.target.value);
        console.log('mã rạp', maRap)
        // setLichChieu({
        //     ...lichChieu,
        //     maRap: e.target.value,
        // });
    };

    const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState("");
    const handleChangeNgayGio = (e) => {
        const { name, value } = e.target;
        setNgayChieuGioChieu({
            ...ngayChieuGioChieu,
            [name]: value,
        });
        setLichChieu({
            ...lichChieu,
            ngayChieuGioChieu: e.target.value,
        });
    };



    const [lichChieu, setLichChieu] = useState({
        maPhim: "",
        ngayChieuGioChieu: "",
        maRap: "",
        giaVe: "",
    });

    const handleTaoLichChieu = () => {
        // if (
        //     lichChieu.maPhim !== "" &&
        //     lichChieu.ngayChieuGioChieu !== "" &&
        //     lichChieu.maRap !== "" &&
        //     lichChieu.giaVe !== ""
        // )
        const lichChieuCuaPhim = {
            tenCumRap: maCumRap, tenRap: maRap, ngayChieu: ngayChieuPhim, giaVe: 75000
        }
        console.log('--*_____*--')
        console.log('tên cụm rap', maCumRap)
        console.log('tên  rap', maRap)
        console.log('ngày chiếu phim', ngayChieuPhim)
        console.log('bí danh', biDanh)
        dispatch(taoLichChieuAction(lichChieuCuaPhim, biDanh));
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={5}>
                    <Grid container spacing={3}>
                        <Grid item md={6}>
                            <FormControl
                                className='formPhim'
                                style={{ width: "100%" }}
                            >
                                <InputLabel
                                    style={{
                                        left: 20,
                                        color: "rgba(0, 0, 0, 0.54)",
                                    }}
                                >
                                    Phim
                                </InputLabel>
                                <Select
                                    labelId="phim-select-label"
                                    id="phim-select"
                                    //value={biDanh}
                                    onChange={handleChangePhim}
                                    disableUnderline
                                >
                                    {renderPhim()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6}>
                            <FormControl
                                className='formPhim'
                                style={{ width: "100%" }}
                            >
                                <InputLabel
                                    style={{
                                        left: 20,
                                        color: "rgba(0, 0, 0, 0.54)",
                                    }}
                                >
                                    Danh sách rạp
                                </InputLabel>
                                <Select
                                    labelId="phim-select-label"
                                    disableUnderline
                                    onChange={handleChangeMaRap}
                                >
                                    {renderRapChieu()}
                                    {/* {renderDanhSachRap()} */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item md={6}>
                            <Input
                                Label="Ngày khởi chiếu"
                                placeholder="Nhập ngày khởi chiếu"
                                value={ngayChieuPhim}
                                type="datetime-local"
                                onChange={(e) => setNgayChieuPhim(e.target.value)}

                            />
                        </Grid>
                        <Grid item md={6}>
                            <FormControl
                                className='formPhim'
                                style={{ width: "100%" }}
                            >
                                <InputLabel
                                    style={{
                                        left: 20,
                                        color: "rgba(0, 0, 0, 0.54)",
                                    }}
                                >
                                    Cụm rạp
                                </InputLabel>
                                <Select
                                    labelId="phim-select-label"
                                    disableUnderline
                                    onChange={handleChangeCumRap}
                                >
                                    {renderCumRapChieu()}
                                    {/* {renderCumRap()} */}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item md={6}>
                            <FormControl
                                className='formPhim'
                                style={{ width: "100%" }}
                            >
                                <InputLabel
                                    style={{
                                        left: 20,
                                        color: "rgba(0, 0, 0, 0.54)",
                                    }}
                                >
                                    Giá vé
                                </InputLabel>
                                <Select
                                    labelId="phim-select-label"
                                    disableUnderline
                                    value={giaVe}
                                    onChange={handleChangeGiaVe}
                                >
                                    <MenuItem value="75000">75k</MenuItem>
                                    <MenuItem value="100000">100k</MenuItem>
                                    <MenuItem value="120000">120k</MenuItem>
                                    <MenuItem value="200000">200k</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                    </Grid>
                    <br />
                    <Grid item md={12}>
                        <Button
                            onClick={() => handleTaoLichChieu()}
                            fullWidth
                            disabled={
                                biDanh !== "" &&
                                    maRap !== "" &&
                                    ngayChieuPhim !== "" ? false
                                    : true
                            }
                        >
                            TẠO LỊCH CHIẾU
                        </Button>
                    </Grid>
                </Grid>

                {/* ĐẺ ĐÂY */}
                {/* <Grid item md={7}>
                    <TableContainer component={Paper}>
                        <Table className='table' aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Hệ thống rạp</TableCell>
                                    <TableCell>Cụm rạp chiêu</TableCell>
                                    <TableCell>Ngày chiêu</TableCell>
                                    <TableCell>Giờ chiêu</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell>
                                    <div className='fixoverflow'>CGV</div>
                                </TableCell>
                                <TableCell>
                                    <div className='fixoverflow'>
                                        {renderCumRapChieu()}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='fixoverflow'>{renderNgayChieu()}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='fixoverflow'>{renderGioChieu()}</div>
                                </TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid> */}
            </Grid>
        </div>
    );
}

export default AddShowTime;
