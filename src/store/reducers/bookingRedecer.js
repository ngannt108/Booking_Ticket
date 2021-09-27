import {
  CHOICE_CHAIR,
  DAT_VE_THANH_CONG,
  GET_CHAIR_LIST,
  SET_LOADING,
  SET_BTN_LOADING,
} from '../const/bookingConst';

const initialState = {
  thongTinPhim: [],
  listChair: [],
  isLoading: false,
  isBtnLoading: false,
};

export const bookingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CHAIR_LIST:
      state.thongTinPhim = payload;
      state.listChair = payload.danhSachGhe;
      return { ...state };
    case CHOICE_CHAIR:
      let listChair = [...state.listChair];
      // tìm vị trí của ghế đang chọn
      const index = listChair.findIndex(
        (chair) => chair.maGhe === payload.maGhe
      );

      // cập nhật thuộc tính đang chọn chog ghế
      if (index !== -1) {
        let oldChair = listChair[index];
        let newChair = { ...oldChair, dangChon: !oldChair.dangChon };
        listChair[index] = newChair;
        state.listChair = listChair;
      }
      return { ...state };
    case DAT_VE_THANH_CONG: {
      state.listChair = [];
      return { ...state };
    }
    case SET_LOADING:
      return { ...state, isLoading: payload };
    case SET_BTN_LOADING:
      return { ...state, isBtnLoading: payload };
    default:
      return { ...state };
  }
};
