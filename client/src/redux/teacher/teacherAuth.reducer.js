import { SET_CURRENT_TEACHER, TEACHER_LOADING } from "./teacher.types";
import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  teacher: {},
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TEACHER:
      console.log("action: ", action);
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        teacher: action.payload,
      };
    case TEACHER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
