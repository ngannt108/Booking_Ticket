import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovieAction, getListMoviePageAction } from "../../store/actions/adminAction";
import { NavLink } from "react-router-dom";
import { Modal } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import { Cancel, EditRounded } from "@material-ui/icons";
import './Movie.css'
import { Grid } from "@material-ui/core";
import Button from "@restart/ui/esm/Button";

import { Input } from '../Input';
import { addNewMovieAction, updateMovieAction } from '../../store/actions/adminAction'
import { getMovieDetailAction } from "../../store/actions/movieAction";

export const Movie = () => {
    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return d.toLocaleString("en-AU")// `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:00`;
        }
        return "";
    };
    const columns = [
        {
            name: "",
            label: "",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, update) => {
                    let rowIndex = Number(tableMeta.rowIndex) + 1;
                    return <span>{rowIndex}</span>;
                },
            },
        },
        {
            name: "biDanh",
            label: "Bí danh",
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: "tenPhim",
            label: "Tên phim",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "hinhAnh",
            label: "Hình ảnh",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <img
                            className=""
                            //src={`http://localhost:3000/images/${tableMeta.rowData[3]}`}
                            alt="Ảnh bị lỗi hiển thị"
                        />
                    );
                },
            },
        },
        {
            name: "moTa",
            label: "Mô tả",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <div style={{ width: '380px' }}>{value}</div>
                    );
                },
            },
        },
        {
            name: "ngayKhoiChieu",
            label: "Ngày khởi chiếu",
            options: {
                filter: false,
                sort: true,
                customBodyRender: value => <span>{formatDate(value)}</span>
            },

        },
        {
            name: "soLuongBan",
            label: "Số lượng bán",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "",
            label: "Tùy chọn",
            options: {
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (

                        <span class="action_btn">
                            {/* <NavLink to={`/admin/book/${tableMeta.rowData[1]}/edit`}> */}
                            <EditRounded onClick={() => (setIsEdit(true), getDetail(tableMeta.rowData[1]))}></EditRounded>
                            {/* </NavLink> */}


                            <Cancel
                                onClick={() => {
                                    setIsOpen(true);
                                    setBiDanh(tableMeta.rowData[1]);
                                    setTenPhim(tableMeta.rowData[2]);
                                }}
                            ></Cancel>
                            {/* <button onClick={() => { setIsOpen(true); setID(book._id); setTenSach(book.tenSach) }}>Remove</button> */}
                            {/* <NavLink to={``}>Remove</NavLink> */}
                        </span>
                    );
                },
            },
        },
    ];

    const options = {
        //filterType: "checkbox",
        selectableRows: false, // tắt ô checkbox row
    };
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.admin.listMovie);
    const [ID, setID] = useState("");
    const [biDanh, setBiDanh] = useState("");
    const [tenPhim, setTenPhim] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [movie, setMovie] = useState('')
    const movieDetail = useSelector((state) => state.movieList.movieDetail);


    const [ngayKhoiChieu, setNgayKhoiChieu] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');
    const [filehinhAnh, setFileHinhAnh] = useState(null);
    const [moTa, setMoTa] = useState('');
    const [trailer, setTrailer] = useState('');
    const [error, setError] = useState('');
    const [isEdit, setIsEdit] = useState('');
    const getDetail = (biDanh) => {
        setBiDanh(biDanh)
        dispatch(getMovieDetailAction(biDanh, setMovie))
        //setMovie(movieDetail[0])

        console.log('chi tiết phim', movieDetail[0])
    }
    useEffect(() => {
        // dispatch(getAllCategories())
    }, []);
    const addMovie = async (e) => {
        e.preventDefault();
        const newmovie = {
            tenPhim, hinhAnh, trailer, ngayKhoiChieu, moTa
        }

        console.log('>>phim mới:', newmovie);
        //const update = JSON.stringify(updatebook)
        //await setHinhAnh(ramdom+'_'+hinhAnh)
        const fd = new FormData();
        if (filehinhAnh != null)
            fd.append('file', filehinhAnh, hinhAnh)
        await dispatch(addNewMovieAction(newmovie, fd, setError, setIsAdd))

    }
    const HandleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value })//{
        //     ...book,
        //     [e.target.name]: e.target.value,
        //     //hinhAnh: e.target.name.hinhAnh.files[0].name
        // }

    }
    const editMovie = async (e) => {
        e.preventDefault();

        const newmovie = {
            ...movieDetail,
            tenPhim, hinhAnh, trailer, ngayKhoiChieu, moTa
        }

        // console.log('>>phim mới:', newmovie);
        // //const update = JSON.stringify(updatebook)
        // //await setHinhAnh(ramdom+'_'+hinhAnh)
        const fd = new FormData();
        if (filehinhAnh != null)
            fd.append('file', filehinhAnh, hinhAnh)
        await dispatch(updateMovieAction(biDanh, newmovie, fd, setError, setIsEdit))

    }

    useEffect(() => {

        dispatch(getListMoviePageAction());
        console.log(isOpen);
    }, [isOpen]);
    const confirmDelete = async () => {
        const id = ID;
        dispatch(deleteMovieAction(id, setIsOpen));

    };
    const hideModal = () => {
        setIsOpen(false);
    };
    return (
        <>


            <div className="list">
                <div >
                    <Button onClick={() => setIsAdd(true)} className='button'>Thêm phim </Button>
                    {/* <NavLink to='/admin/movie/add'> </NavLink> */}
                </div>
                <MUIDataTable
                    title={"Danh sách phim"}
                    data={Array.isArray(movies) ? movies : []}
                    columns={columns}
                    options={options}
                />
                {/* <Pagination
                        booksPerPage={booksPerPage}
                        totalBooks={books.length}
                        paginate={paginate}
                    /> */}
            </div>
            <div className='model' >
                <Modal show={isOpen} onHide={hideModal}>
                    <Modal.Header>
                        <Modal.Title>Xóa thông tin sách</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc muốn xóa sách {tenPhim} không?</Modal.Body>
                    <Modal.Footer>
                        <button className="btn-OK" onClick={confirmDelete}>
                            Delete
                        </button>
                        <button onClick={hideModal}>Cancel</button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* THÊM THÔNG TIN PHIM */}
            <Modal show={isAdd} onHide={() => setIsAdd(false)}>
                <Modal.Header>
                    <Modal.Title>Tạo thông tin phim</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Input
                        Label="Tên phim"
                        placeholder="Nhập tên phim"
                        value={tenPhim}
                        type="text"
                        onChange={(e) => setTenPhim(e.target.value)}
                    />
                    <Input
                        Label="Ngày khởi chiếu"
                        placeholder="Nhập giá tiền"
                        value={ngayKhoiChieu}
                        type="datetime-local"
                        onChange={(e) => setNgayKhoiChieu(e.target.value)}
                    />
                    <div>Mô tả</div>
                    <textarea
                        Label="Mô tả"
                        placeholder="Mô tả cho phim"
                        value={moTa}
                        type="text"
                        onChange={(e) => setMoTa(e.target.value)}
                    />
                    <Input
                        type="file"
                        accept=".jpg, .png"
                        Label="Hình ảnh"
                        name='file'
                        // value={''}
                        onChange={(event) => {
                            console.log('file  hình:', event.target.files);
                            //setHinhAnh(event.target.files[0].name);
                            setFileHinhAnh(event.target.files[0]);
                            console.log('file  hình2 :', filehinhAnh);
                            setHinhAnh(Date.now() + '_' + event.target.files[0].name);
                        }}
                    />
                    <Input
                        Label="Trailer"
                        placeholder=""
                        value={trailer}
                        type="text"
                        onChange={(e) => setTrailer(e.target.value)}
                    />
                </Modal.Body>
                <p style={{ marginLeft: '20px', color: 'red' }}>{error}</p>
                <Modal.Footer>
                    <button className="btn-OK" onClick={addMovie}>
                        Submit
                    </button>
                    <button onClick={() => setIsAdd(false)}>Cancel</button>
                </Modal.Footer>
            </Modal>
            {/* CHỈNH SỬA THÔNG TIN PHIM */}
            <Modal show={isEdit} onHide={() => setIsEdit(false)}>
                <Modal.Header>
                    <Modal.Title>Chỉnh sửa thông tin phim</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Input
                        Label="Tên phim"
                        placeholder="Nhập tên phim"
                        value={movie.tenPhim}
                        type="text"
                        onChange={HandleChange}//{(e) => setTenPhim(e.target.value)}
                        name='tenPhim'
                    />
                    <Input
                        Label="Ngày khởi chiếu"
                        placeholder="Nhập ngày khởi chiếu"
                        value={formatDate(movie.ngayKhoiChieu)}
                        type="text"
                        onChange={HandleChange}//{(e) => setNgayKhoiChieu(e.target.value)}
                        name='ngayKhoiChieu'
                    />
                    <div>Mô tả</div>
                    <textarea
                        Label="Mô tả"
                        placeholder="Mô tả cho phim"
                        value={movie.moTa}
                        type="text"
                        onChange={HandleChange}//{(e) => setMoTa(e.target.value)}
                        name='moTa'
                    />
                    <Input
                        type="file"
                        accept=".jpg, .png"
                        Label="Hình ảnh"
                        name='file'
                        // value={''}
                        onChange={(event) => {
                            console.log('file  hình:', event.target.files);
                            //setHinhAnh(event.target.files[0].name);
                            setFileHinhAnh(event.target.files[0]);
                            console.log('file  hình2 :', filehinhAnh);
                            setHinhAnh(Date.now() + '_' + event.target.files[0].name);
                        }}
                    />
                    <Input
                        Label="Trailer"
                        placeholder=""
                        value={movie.trailer}
                        type="text"
                        onChange={HandleChange}//{(e) => setTrailer(e.target.value)}
                        name='trailer'
                    />
                </Modal.Body>
                <p style={{ marginLeft: '20px', color: 'red' }}>{error}</p>
                <Modal.Footer>
                    <button className="btn-OK" onClick={editMovie}>
                        Submit
                    </button>
                    <button onClick={() => setIsEdit(false)}>Cancel</button>
                </Modal.Footer>
            </Modal>


        </>
    );
}

export default Movie;