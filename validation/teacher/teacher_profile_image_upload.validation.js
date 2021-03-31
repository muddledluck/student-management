import Validator from "validator";
import isEmpty from "is-empty";

const validateTeacherProfileImageUpload = (data) => {
  let errors = {};

  data.LoggedUser = !isEmpty(data.LoggedUser) ? data.LoggedUser : "";
  if (Validator.isEmpty(data.LoggedUser)) {
    errors.LoggedUser = "LoggedUser can't be empty";
  } else if (!Validator.isMongoId(data.LoggedUser)) {
    errors.LoggedUser = "Invalid LoggedUser";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateTeacherProfileImageUpload;
