import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { bookReducer } from "./book.service";

export default combineReducers({
    users: userReducer,
    book:bookReducer
  });