import {
  SET_CURRENT_TEACHER,
  TEACHER_LOADING,
  CHANGE_PROFILE_IMAGE,
  POST_ASSIGNMENT,
  STUDENT_REGISTRATION,
} from "./teacher.types";
import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  teacher: {},
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TEACHER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        LoggedUser: action.payload._id,
        teacher: action.payload,
      };
    case TEACHER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PROFILE_IMAGE:
      return {
        ...state,
        teacher: action.payload,
      };
    case POST_ASSIGNMENT:
      return {
        ...state,
        teacher: action.payload.teacher,
        successAssigment: action.payload.success,
      };
    case STUDENT_REGISTRATION:
      return {
        ...state,
        teacher: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
