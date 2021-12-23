import React, { memo, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  CardMedia,
  Typography,
  InputBase,
  IconButton,
} from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "black",
    position: "relative",
    padding: "20px 0",
    zIndex: 1,
  },
  backgroudBlack: {
    display: "block",
    position: "absolute",
    width: "50%",
    height: "50%",
    backgroundColor: "#f6f6f6",
    top: 0,
    left: 0,
    zIndex: -1,
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      borderBottomLeftRadius: "50%",
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      top: 0,
      left: 0,
      zIndex: -1,
    },
  },
  backgroudWhite: {
    display: "block",
    position: "absolute",
    borderTopRightRadius: "50%",
    width: "100%",
    height: "50%",
    backgroundColor: "#f6f6f6",
    bottom: 0,
    zIndex: -1,
  },
  content: {
    width: "90%",
    maxWidth: 1200,
    margin: "0 auto",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingBottom: "2vw",
    borderRadius: 10,
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentLeft: {
    padding: 10,
  },
  h1: {
    fontSize: "5vw",
    [theme.breakpoints.up("760")]: {
      fontSize: 30,
    },
    color: "white",
    textTransform: "uppercase",
    paddingLeft: 10,
    fontWeight: "bold",
  },
  text: {
    color: "#31d7a9",
    fontSize: "4vw",
    [theme.breakpoints.up("760")]: {
      fontSize: "1rem",
    },
  },
  contentRight: {
    display: "none",
    padding: "10px 15px",
    marginRight: 20,
    backgroundImage:
      "linear-gradient(169deg, #ff4343 0%, #aa52a1 37%, #5560ff 83%)",
    borderRadius: "50% 0",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  h2: {
    color: "white",
    textTransform: "uppercase",
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: "4vw",
    [theme.breakpoints.up("760")]: {
      fontSize: "20",
    },
  },
  searchField: {
    width: "95%",
    margin: "0 auto",
    boxShadow: "0px 5px 15px 0px rgb(44 41 157 / 50%)",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    position: "relative",
    background: "transperant",
    borderRadius: 5,
  },
  search: {
    position: "relative",
    color: "white  !important",
    borderRadius: theme.shape.borderRadius,
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      // justifyContent: "center",
    },
  },
  inputSetting: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    cursor: "pointer",
  },
  inputInput: {
    color: "black",
    flexGrow: 1,
    borderBottom: "1px solid black",
    paddingRight: 10,
  },
  btnSearch: {
    borderBottom: "1px solid black",
    color: "black",
    transition: "all 0.5s",
    "&:hover": {
      transform: "scale(0.9)",
    },
  },
  icon: {
    width: 30,
  },
  paper: {
    zIndex: 1,
    color: "black",
  },
  ul: {
    listStyle: "none",
    background: "white",
    width: 200,
    maxHeight: 200,
    margin: 0,
    padding: 5,
    overflowY: "scroll",
    border: "1px solid black",
    borderRadius: "0 0 10px 10px",
  },
  li: {
    cursor: "pointer",
    padding: 5,
  },
}));

const initialSearchList = {
  name: "",
  biDanh: "",
};
const today = new Date();

function SearchMovie() {
  const classes = useStyles();
  const [searchList, setSearchList] = useState(initialSearchList);
  const history = useHistory();
  const movieList = useSelector((state) => state.movieList.movieListNowShowing);
  const ref = useRef();
  const [open, setOpen] = useState(false);

  console.log("searchlist: ", searchList);
  console.log("movie ", movieList);

  const handleChange = (id, event) => {
    const value = event.target.value;
    if (value) setOpen(true);
    setSearchList({ ...searchList, [id]: value });
  };

  const handlePopperClick = (tenPhim, biDanh) => {
    setSearchList({ ...searchList, name: tenPhim, biDanh });
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchList(initialSearchList);
    const { biDanh } = searchList;
    if (!biDanh || biDanh === "") {
      alert("Vui lòng chọn phim");
      return;
    }
    history.push({
      pathname: `/movie-detail/${biDanh}`,
    });
  };

  const renderPopper = () => {
    if (!searchList.name || !isNaN(searchList.name)) return;
    let body = [];
    body = movieList.filter((v) => {
      const index = v.tenPhim
        .toLowerCase()
        .indexOf(searchList.name.toLowerCase());
      return index > -1;
    });

    return (
      <Popper
        anchorEl={ref.current}
        open={open}
        className={classes.paper}
        placement="bottom-start"
      >
        <ul className={classes.ul}>
          {body.map((v) => (
            <li
              key={v.tenPhim}
              className={classes.li}
              onClick={() => handlePopperClick(v.tenPhim, v.biDanh)}
            >
              {v.tenPhim}
            </li>
          ))}
        </ul>
      </Popper>
    );
  };

  const renderSearch = () => {
    return (
      <form className={classes.searchField} onSubmit={handleSubmit}>
        {/* <div className={classes.searchBG}></div> */}
        <Grid container className={classes.search}>
          <Grid
            item
            xs={12}
            md={6}
            lg={12}
            xl={3}
            className={classes.inputSetting}
          >
            <InputBase
              placeholder="Điền tên phim bạn muốn xem..."
              className={classes.inputInput}
              type="search"
              ref={ref}
              value={searchList.name || ""}
              onChange={(event) => handleChange("name", event)}
            />
            {renderPopper()}
            <IconButton type="submit" className={classes.btnSearch}>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <div className={classes.root}>
      <CardMedia className={classes.content}>
        <div className={classes.top}>
          <div className={classes.contentLeft}>
            <Typography className={classes.text}>
              Chào mừng bạn đến với trang đặt vé online
            </Typography>
            <Typography className={classes.h1}>
              Bạn đang tìm kiếm phim gì?
            </Typography>
          </div>
          <div className={classes.contentRight}>
            <CardMedia
              component="img"
              src="http://pixner.net/boleto/demo/assets/images/ticket/ticket-tab01.png"
            />
            <Typography className={classes.h2}>Phim</Typography>
          </div>
        </div>
        {renderSearch()}
      </CardMedia>
      <div className={classes.backgroudWhite}></div>
      <div className={classes.backgroudBlack}></div>
    </div>
  );
}

export default memo(SearchMovie);
