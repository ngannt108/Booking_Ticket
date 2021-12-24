import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieAction,
  getListMoviePageAction,
} from "../../store/actions/adminAction";
import { Image, Modal } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import { Cancel, EditRounded } from "@material-ui/icons";
import "./Movie.css";
import { Input } from "../Input";
import {
  addNewMovieAction,
  updateMovieAction,
} from "../../store/actions/adminAction";
import { getMovieDetailAction } from "../../store/actions/movieAction";

export const Movie = () => {
  const formatDate = (date) => {
    if (date) {
      const d = new Date(date); //d.toLocaleString("en-AU")//
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
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
              className="image-item"
              src={`http://localhost:5000/uploads/${tableMeta.rowData[3]}`}
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
          return <div style={{ width: "340px" }}>{value}</div>;
        },
      },
    },
    {
      name: "ngayKhoiChieu",
      label: "Ngày khởi chiếu",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => <span>{formatDate(value)}</span>,
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
              <EditRounded
                onClick={() => (
                  setIsEdit(true),
                  setError(""),
                  getDetail(tableMeta.rowData[1]),
                  setHinhAnh(tableMeta.rowData[3]),
                  setXemAnh(
                    `http://localhost:5000/uploads/${tableMeta.rowData[3]}`
                  )
                )}
              ></EditRounded>
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
    filterType: "checkbox",
    selectableRows: false, // tắt ô checkbox row
  };
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.admin.listMovie);
  const [ID, setID] = useState("");
  const [biDanh, setBiDanh] = useState("");
  const [tenPhim, setTenPhim] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [movie, setMovie] = useState("");
  const movieDetail = useSelector((state) => state.movieList.movieDetail);

  const [ngayKhoiChieu, setNgayKhoiChieu] = useState("");
  const [hinhAnh, setHinhAnh] = useState("");
  const [filehinhAnh, setFileHinhAnh] = useState(null);
  const [xemAnh, setXemAnh] = useState(null);
  const [moTa, setMoTa] = useState("");
  const [trailer, setTrailer] = useState("");
  const [thoiLuong, setThoiLuong] = useState("");
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const setInitialData = () => {
    setTenPhim("");
    setNgayKhoiChieu("");
    setHinhAnh("");
    setTrailer("");
    setThoiLuong("");
    setMoTa("");
    setIsAdd(false);
    setError("");
    setXemAnh("");
  };

  const getDetail = (biDanh) => {
    setBiDanh(biDanh);
    dispatch(getMovieDetailAction(biDanh, setMovie));
    //setMovie(movieDetail[0])

    console.log("chi tiết phim", movie);
  };
  useEffect(() => {
    dispatch(getListMoviePageAction());
  }, []);
  const addMovie = (e) => {
    e.preventDefault();
    const newmovie = {
      tenPhim,
      hinhAnh,
      trailer: "https://www.youtube.com/embed/" + trailer,
      ngayKhoiChieu,
      moTa,
      thoiLuong,
    };

    console.log(">>phim mới:", newmovie);
    //const update = JSON.stringify(updatebook)
    //await setHinhAnh(ramdom+'_'+hinhAnh)
    const fd = new FormData();
    if (filehinhAnh != null) fd.append("file", filehinhAnh, hinhAnh);
    dispatch(addNewMovieAction(newmovie, fd, setError, setIsAdd));
    setXemAnh("");
  };
  const uploadImage = async (event) => {
    //console.log("file  hình2 :", fd.event.target.files[0]);
    if (event.target.files[0] != null) {
      //
      let time = Date.now();
      setFileHinhAnh(event.target.files[0]);
      setHinhAnh(time + "_" + event.target.files[0].name);
      let url = URL.createObjectURL(event.target.files[0]);
      setXemAnh(url);
      setMovie({ ...movie, hinhAnh: time + "_" + event.target.files[0].name });
      //}
    }
  };
  const HandleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });

    //{
    //     ...book,
    //     [e.target.name]: e.target.value,
    //     //hinhAnh: e.target.name.hinhAnh.files[0].name
    // }
    console.log("hình ảnh vừa đổi", hinhAnh);
  };

  const editMovie = async (e) => {
    e.preventDefault();

    // const updatemovie = {
    //     movie
    // }

    console.log(">>phim sau khi update:", movie);
    const fd = new FormData();
    if (filehinhAnh != null) fd.append("file", filehinhAnh, hinhAnh);
    dispatch(updateMovieAction(biDanh, movie, fd, setError, setIsEdit));
  };

  useEffect(() => {
    dispatch(getListMoviePageAction());
    console.log(isOpen);
  }, [isOpen]);
  const confirmDelete = async () => {
    const bidanh = biDanh;
    dispatch(deleteMovieAction(bidanh, setIsOpen));
  };
  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="list">
        <div>
          <button
            onClick={(setInitialData, () => setIsAdd(true))}
            className="btn btn-success"
          >
            Thêm phim{" "}
          </button>
          {/* <NavLink to='/admin/movie/add'> </NavLink> */}
        </div>
        <MUIDataTable
          title={"Danh sách phim"}
          data={Array.isArray(movies) ? movies : []}
          columns={columns}
          options={options}
        />
      </div>
      <div className="model">
        <Modal show={isOpen} onHide={hideModal}>
          <Modal.Header>
            <Modal.Title>Xóa thông tin phim</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc muốn xóa phim {tenPhim} không?</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-warning" onClick={confirmDelete}>
              Xóa
            </button>
            <button className="btn btn-danger" onClick={hideModal}>
              Hủy
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* THÊM THÔNG TIN PHIM */}
      <Modal show={isAdd} onHide={setInitialData}>
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
            placeholder=""
            value={ngayKhoiChieu}
            type="date"
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
            type="file" //file" text
            accept=".jpg, .png"
            Label="Hình ảnh"
            name="file" //"file" hinhAnh
            // value={hinhAnh}
            onChange={
              uploadImage
              //setHinhAnh(event.target.value);
              // console.log("file  hình:", event.target.files);
              //setHinhAnh(event.target.files[0].name);
              //    setFileHinhAnh(event.target.files[0]);
              // console.log("file  hình2 :", filehinhAnh);
              //    setHinhAnh(Date.now() + "_" + event.target.files[0].name);
            }
          />
          {/* <Image className="preview-img"

            src={`${xemAnh}`}
          //onChange={(e)}
          /> */}
          <div
            className="preview-img"
            style={{ backgroundImage: `url(${xemAnh})` }}
          ></div>
          <Input
            Label="Trailer"
            placeholder="Nhập mã đường liên kết"
            value={trailer}
            type="text"
            onChange={(e) => setTrailer(e.target.value)}
          />
          <Input
            Label="ThoiLuong"
            placeholder=""
            value={thoiLuong}
            type="number"
            onChange={(e) => setThoiLuong(e.target.value)}
          />
        </Modal.Body>
        <p style={{ marginLeft: "20px", color: "red" }}>{error}</p>
        <Modal.Footer>
          <button className="btn btn-success" onClick={addMovie}>
            Xác nhận
          </button>
          <button className="btn btn-danger" onClick={() => setIsAdd(false)}>
            Hủy
          </button>
        </Modal.Footer>
      </Modal>
      {/* CHỈNH SỬA THÔNG TIN PHIM  () => setIsEdit(false)*/}
      <Modal show={isEdit} onHide={setInitialData}>
        <Modal.Header>
          <Modal.Title>Chỉnh sửa thông tin phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            Label="Tên phim"
            placeholder="Nhập tên phim"
            value={movie.tenPhim}
            type="text"
            onChange={HandleChange} //{(e) => setTenPhim(e.target.value)}
            name="tenPhim"
            disabled={true}
          />
          <Input
            Label="Ngày khởi chiếu"
            placeholder="Nhập ngày khởi chiếu"
            value={formatDate(movie.ngayKhoiChieu)}
            type="text"
            name="ngayKhoiChieu"
            // onChange={HandleChange}//{(e) => setNgayKhoiChieu(e.target.value)}
            //name='ngayKhoiChieu'
            disabled={true}
          />
          <div>Mô tả</div>
          <textarea
            Label="Mô tả"
            placeholder="Mô tả cho phim"
            value={movie.moTa}
            type="text"
            onChange={HandleChange} //{(e) => setMoTa(e.target.value)}
            name="moTa"
          />
          <Input
            type="file" //file"
            accept=".jpg, .png"
            Label="Hình ảnh"
            name="file" //"file"
            onChange={uploadImage}
            // onChange={(event) => {

            // console.log("file  hình:", event.target.files);
            // //setHinhAnh(event.target.files[0].name);
            // setFileHinhAnh(event.target.files[0]);
            // console.log("file  hình2 :", filehinhAnh);
            // setHinhAnh(Date.now() + "_" + event.target.files[0].name);
            // }}
          />
          <Image
            className="preview-img"
            style={xemAnh ? { backgroundImage: `url(${xemAnh})` } : ""}
          />
          {/* src={`http://localhost:5000/uploads/${hinhAnh}`} /> */}

          <Input
            Label="Trailer"
            placeholder=""
            value={movie.trailer}
            type="text"
            onChange={HandleChange} //{(e) => setTrailer(e.target.value)}
            name="trailer"
          />
        </Modal.Body>
        <p style={{ marginLeft: "20px", color: "red" }}>{error}</p>
        <Modal.Footer>
          <button className="btn btn-success" onClick={editMovie}>
            Xác nhận
          </button>
          <button className="btn btn-danger" onClick={() => setIsEdit(false)}>
            Hủy
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
