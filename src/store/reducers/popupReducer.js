import { CLOSE_POPUP, OPEN_POPUP } from "../const/popupConst";

const initialState = {
  isOpen: false,
  link: '',
};

export const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP: {
      state = action.payload;
      return {...state};
    }
    case CLOSE_POPUP: {
      state = action.payload;
      return {...state};
    }
    default:
      return {...state};
  }
};

