import { combineReducers } from "redux";
import authReducer from "./teacher/teacherAuth.reducer";
import errorReducer from "./teacher/teacherError.reducer";

export default combineReducers({
  teacherAuth: authReducer,
  teacherErrors: errorReducer,
});
