import axios from "axios";
import setAuthToken from "../../utils/setAuthToken.utils";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  TEACHER_LOADING,
  SET_CURRENT_TEACHER,
  CHANGE_PROFILE_IMAGE,
  POST_ASSIGNMENT,
} from "./teacher.types";

// Register User
export const registerTeacher = (teacherData, history) => (dispatch) => {
  axios
    .post("/api/teacher/teacher-register", teacherData)
    .then((res) => {
      history.push("/teacher-login"); // redirect to login page
    })
    .catch((error) => {
      console.log("error registerTeacher: ", error);
      return dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

// Set Logged in teacher
export const setCurrentTeacher = (decoded) => {
  return {
    type: SET_CURRENT_TEACHER,
    payload: decoded,
  };
};

// Login -> get Teacher token
export const loginTeacher = (teacherData) => (dispatch) => {
  axios
    .post("/api/teacher/teacher-login", teacherData)
    .then((res) => {
      // Save to localStorage
      // Set token to loacalStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get teacher data
      const decoded = jwt_decode(token);
      console.log("decode: ", decoded, "res: ", res);
      // Set current teacher
      dispatch(setCurrentTeacher(decoded));
    })
    .catch((error) => {
      return dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

// Logout Teacher
export const logoutTeacher = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentTeacher({}));
};

// User loading
export const setTeacherLoading = () => {
  return {
    type: TEACHER_LOADING,
  };
};

// Change Profile Image
export const changeProfileImage = (file) => (dispatch) => {
  //LoggedUser
  axios
    .post("api/teacher/upload-image", file)
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("jwtToken", res.data.token);
        return dispatch({
          type: CHANGE_PROFILE_IMAGE,
          payload: res.data.teacher,
        });
      }
    })
    .catch((err) => console.log("actionERR: ", err));
};

// Post Assignment
export const postAssignment = (details) => (dispatch) => {
  axios
    .post("/api/teacher/post-assignment", details)
    .then((res) => {
      localStorage.setItem("jwtToken", res.data.token);
      const payload = {
        teacher: res.data.teacher,
        success: res.data.success,
      };
      return dispatch({
        type: POST_ASSIGNMENT,
        payload: payload,
      });
    })
    .catch((error) =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      })
    );
};
