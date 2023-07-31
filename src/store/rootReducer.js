import { combineReducers } from "redux";
import listMovieReducer from "pages/HomeTemplate/ListMoviePage/duck/reducer";
import detailMovieReducer from "pages/HomeTemplate/DetailMoviePage/duck/reducer";
import authReducer from "pages/AdminTemplate/AuthPage/duck/reducer";
import addUserReducer from "pages/AdminTemplate/AddUser/duck/reducer";

const rootReducer = combineReducers({
  //child reducer
  listMovieReducer,
  detailMovieReducer,
  authReducer,
  addUserReducer,
});

export default rootReducer;
