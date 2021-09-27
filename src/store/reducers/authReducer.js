import { SIGN_IN, SIGN_UP, SIGN_OUT } from "../const/authConst";

const initialState = {
  authSignIn: {},
  authSignUp: {},
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN: {
      state.authSignIn = payload;
      return { ...state };
    }
    case SIGN_UP: {
      state.authSignUp = payload;
      return { ...state };
    }
    case SIGN_OUT: {
      state.authSignIn = {};
      state.authSignUp = {};
      return { ...state };
    }
    default:
      return { ...state };
  }
};
