import { CLOSE_POPUP, OPEN_POPUP } from "../const/popupConst";

export const openPopup = (props) => {
  return {
    type: OPEN_POPUP,
    payload: props,
  };
};

export const closePopup = (props) => {
  return {
    type: CLOSE_POPUP,
    payload: props,
  };
};
