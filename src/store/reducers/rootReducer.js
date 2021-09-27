import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { authReducer } from "./authReducer";
import { bookingReducer } from "./bookingRedecer";
import { cinemaReducer } from "./cinemaReducer";

import { movieReducer } from "./movieReducer";
import { popupReducer } from "./popupReducer";
import { profileReducer } from "./profileReducer";

export const rootReducer = combineReducers({
  popup: popupReducer,
  movieList: movieReducer,
  cinema: cinemaReducer,
  auth: authReducer,
  profile: profileReducer,
  booking: bookingReducer,
  admin: adminReducer,
});
