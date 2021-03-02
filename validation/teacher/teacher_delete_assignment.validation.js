import Validator from "validator";
import isEmpty from "is-empty";
import mongodb from "mongodb";

const validateTeacherDeleteAssignmentInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.LoggedUser = !isEmpty(data.LoggedUser) ? data.LoggedUser : "";
  data.assignmentId = !isEmpty(data.assignmentId) ? data.assignmentId : "";

  // LoggedUser check
  if (Validator.isEmpty(data.LoggedUser)) {
    errors.LoggedUser = "LoggedUser is required";
  } else if (!Validator.isMongoId(data.LoggedUser)) {
    errors.LoggedUser = "Invalid LoggedUser";
  }

  // assignmentID check
  if (Validator.isEmpty(data.assignmentId)) {
    errors.assignmentId = "assignmentID is required";
  } else if (!Validator.isMongoId(data.assignmentId)) {
    errors.assignmentId = "Invalid assignmentID";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateTeacherDeleteAssignmentInput;
