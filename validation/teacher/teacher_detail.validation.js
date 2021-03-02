import Validator from "validator";
import isEmpty from "is-empty";
import mongodb from "mongodb";

const ObjectId = mongodb.ObjectID;

const validateGetTeacherDetailInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.LoggedUser = !isEmpty(data.LoggedUser) ? data.LoggedUser : "";

  // id check
  if (Validator.isEmpty(data.LoggedUser)) {
    errors.LoggedUser = "LoggedUser ID is required";
  } else if (!ObjectId.isValid(data.LoggedUser)) {
    errors.LoggedUser = "Invalid LoggedUser";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateGetTeacherDetailInput;
