import {
  CHOICE_CHAIR,
  DAT_VE_THANH_CONG,
  GET_CHAIR_LIST, //
  GET_CHAIR_BOOKED_LIST, //
  GET_INFO_MOVIE, //
  SET_LOADING,
  SET_BTN_LOADING,
} from "../const/bookingConst";

const initialState = {
  thongTinPhim: [],
  listChair: [],
  listChairBooked: [],
  listChairSelected: [],
  ticketPrize: 0,
  isLoading: false,
  isBtnLoading: false,
};

export const bookingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CHAIR_LIST:
      // state.thongTinPhim = payload;
      state.listChair = payload.ghe;
      return { ...state };
    case GET_CHAIR_BOOKED_LIST:
      state.listChairBooked = payload;
      return { ...state };
    case GET_INFO_MOVIE:
      state.thongTinPhim = payload;
      return { ...state };
    case CHOICE_CHAIR:
      state.listChairSelected = [payload];
      // let listChair = [...state.listChair];
      // // tìm vị trí của ghế đang chọn
      // const index = listChair.findIndex(
      //   (chair) => chair === payload//.maGhe
      // );

      // // cập nhật thuộc tính đang chọn chog ghế
      // if (index !== -1) {
      //   let oldChair = listChair[index];
      //   let newChair = { ...oldChair, dangChon: !oldChair.dangChon };
      //   listChair[index] = newChair;
      //   state.listChair = listChair;
      // }
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
