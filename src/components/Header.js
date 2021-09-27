import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch } from 'react-redux';
import { signOutActions } from '../store/actions/authAction';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { animateScroll as scroll } from 'react-scroll';
import { HashLink as LinkH } from 'react-router-hash-link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    zIndex: 10,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    // flexGrow: 1,
    cursor: 'pointer',
    fontWeight: '700',
  },
  appbar: {
    background: 'white',
    color: '#b4b4b4',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    color: '#b4b4b4',
    margin: '0 10px',
    fontSize: 15,
    textDecoration: 'none',
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
    width: 15,
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const userName = JSON.parse(localStorage.getItem('taiKhoan'));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuItems = [
    {
      title: 'Lịch chiếu',
      path: '/#lich-chieu',
    },
    {
      title: 'Cụm rạp',
      path: '/#cum-rap',
    },
    {
      title: 'Tin tức',
      path: '/#tin-tuc',
    },
    {
      title: 'Ứng dụng',
      path: '/#ung-dung',
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    dispatch(signOutActions(history));
  };

  const handleProfile = () => {
    setAnchorEl(null);
    history.push('/profile');
  };

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    let yOffset;
    isMobile ? (yOffset = -60) : (yOffset = -80);
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => {
              history.push('/');
              scroll.scrollToTop();
            }}
          >
            HD08
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {userName ? (
                  <Accordion style={{ color: 'black' }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Button onClick={handleClick}>
                        <Avatar style={{ marginRight: 5 }}>
                          {userName.charAt(0)}
                        </Avatar>
                        <span style={{ color: '#b4b4b4' }}>{userName}</span>
                      </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                      <MenuItem onClick={handleProfile}>Profile</MenuItem>
                      <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <MenuItem
                    style={{ color: 'black' }}
                    component="button"
                    underline="none"
                    className={classes.menuItem}
                    onClick={() => history.push('/sign-in')}
                  >
                    Đăng nhập
                    <ArrowForwardIosIcon className={classes.arrowIcon} />
                  </MenuItem>
                )}
                <MenuItem
                  style={{ color: 'black' }}
                  component="button"
                  underline="none"
                >
                  <LinkH
                    onClick={() => {
                      history.push('/');
                      handleClose();
                    }}
                    className={classes.menuItem}
                    to="/#lich-chieu"
                    scroll={(el) => scrollWithOffset(el)}
                  >
                    Lịch Chiếu
                  </LinkH>
                </MenuItem>
                <MenuItem
                  component="button"
                  underline="none"
                  className={classes.menuItem}
                  onClick={() => history.push('/rap-chieu-mobile')}
                >
                  Cụm Rạp
                </MenuItem>
                <MenuItem
                  style={{ color: 'black' }}
                  component="button"
                  underline="none"
                >
                  <LinkH
                    to="/#tin-tuc"
                    smooth={true}
                    offset={-60}
                    onClick={() => {
                      history.push('/');
                      handleClose();
                    }}
                    className={classes.menuItem}
                    scroll={(el) => scrollWithOffset(el)}
                  >
                    Tin Tức
                  </LinkH>
                </MenuItem>
                <MenuItem
                  style={{ color: 'black' }}
                  component="button"
                  underline="none"
                >
                  <LinkH
                    to="/#ung-dung"
                    smooth={true}
                    onClick={() => {
                      history.push('/');
                      handleClose();
                    }}
                    className={classes.menuItem}
                    scroll={(el) => scrollWithOffset(el)}
                  >
                    Ứng Dụng
                  </LinkH>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <div>
                {menuItems.map((item, index) => (
                  <Link
                    style={{ color: 'black' }}
                    key={index}
                    component="button"
                    underline="none"
                  >
                    <LinkH
                      className={classes.menuItem}
                      to={item.path}
                      scroll={(el) => scrollWithOffset(el)}
                    >
                      {item.title}
                    </LinkH>
                  </Link>
                ))}
              </div>
              {userName ? (
                <>
                  <Button onClick={handleClick}>
                    <Avatar style={{ marginRight: 5 }}>
                      {userName.charAt(0)}
                    </Avatar>
                    <span>{userName}</span>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => history.push('/sign-in')}
                >
                  Đăng nhập
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
