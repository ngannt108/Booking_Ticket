import React, { useEffect } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../store/actions/popupAction';

function VideoPopup() {
  let videoRef = useRef();
  const props = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  const handleClose = () => {
    const newProps = {
      isOpen: false,
      link: '',
    };

    const action = closePopup(newProps);
    dispatch(action);
  };

  // Click bên ngoài video để tắt popup
  useEffect(() => {
    if (props.isOpen) {
      const handlClick = (e) => {
        if (!videoRef.current.contains(e.target)) {
          handleClose();
        }
      };
      document.addEventListener('mousedown', handlClick);
      return () => document.removeEventListener('mousedown', handlClick);
    }
  });

  return props.isOpen ? (
    <PopupContainer>
      <PopupContent ref={videoRef}>
        <IframeBlock
          width="640"
          height="360"
          src={props.link}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></IframeBlock>
        <CloseBtn>
          <CloseIcon onClick={() => handleClose()} />
        </CloseBtn>
      </PopupContent>
    </PopupContainer>
  ) : (
    ''
  );
}

const PopupContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;
const PopupContent = styled.div`
  position: relative;
  @media (max-width: 800px) {
    max-width: 90%;
  }
`;

const IframeBlock = styled.iframe`
  position: relative;
  outline: none;
  @media (max-width: 800px) {
    max-width: 100%;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  color: white;
  top: -25px;
  right: -5px;
  cursor: pointer;
`;

export default VideoPopup;
