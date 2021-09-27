import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import data from '../sliderData.json';
import VideoPopup from './VideoPopup';
import './MovieSlider.css';
import { useDispatch } from 'react-redux';
import { openPopup } from '../store/actions/popupAction';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  slider: {
    height: '100%',
  },
  slideItem: {
    position: 'relative',
    cursor: 'pointer',
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      background:
        'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(251,251,251,0) 100%)',
    },
    '&:hover > $playButton': {
      opacity: 1,
    },
  },
  slideImage: {
    width: '100%',
  },
  playButton: {
    position: 'absolute',
    opacity: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 80,
    height: 80,
    zIndex: 1,
    color: '#f4f4f4',
    border: '1px solid rgb(255,255,255)',
    borderRadius: '50%',
    padding: 20,
    backgroundColor: 'rgba(255,255,255, .1)',
    cursor: 'pointer',
    transition: 'all 0.3s',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255, .2)',
    },
  },
}));

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        right: '50px',
      }}
      onClick={onClick}
    />
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        left: '50px',
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
};
export default function MovieSlider() {
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: true,
    variablesWidth: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  // const [isOpen, setIsOpen] = useState(false);
  // const [popupVideoLink, setPopupVideoLink] = useState('');
  const dispatch = useDispatch();

  const handleOpen = (link) => {
    const newProps = {
      isOpen: true,
      link: link,
    };

    const action = openPopup(newProps);
    dispatch(action);
  };

  return (
    <>
      <div className={classes.toolbar}></div>
      <Slider {...settings} className={classes.slider}>
        {data.map((item, index) => (
          <div className={classes.slideItem} key={index}>
            <img src={item.url} className={classes.slideImage} />
            <PlayArrowRoundedIcon
              className={classes.playButton}
              onClick={() => handleOpen(item.trailer)}
            />
          </div>
        ))}
      </Slider>
      <VideoPopup />
    </>
  );
}

// isOpen={isOpen} setIsOpen={setIsOpen} link={popupVideoLink}
