import Validator from "validator";
import isEmpty from "is-empty";
import mongodb from "mongodb";

const ObjectId = mongodb.ObjectID;

const validateTeacherPostAssignmentInput = (data, file) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.endDate = !isEmpty(data.endDate) ? data.endDate : "";
  const path = file ? file.path : "";
  data.LoggedUser = !isEmpty(data.LoggedUser) ? data.LoggedUser : "";

  // title check
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is Required";
  }

  // endDate check
  if (Validator.isEmpty(data.endDate)) {
    errors.endDate = "End Date is Required";
  }

  // questionPDF check
  if (Validator.isEmpty(path)) {
    errors.assignment = "Assignment is required";
  }

  // LoggedUesr check
  if (Validator.isEmpty(data.LoggedUser)) {
    errors.LoggedUser = "LoggedUser is required";
  } else if (!ObjectId.isValid(data.LoggedUser)) {
    errors.LoggedUser = "Invalid LoggedUser";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateTeacherPostAssignmentInput;
