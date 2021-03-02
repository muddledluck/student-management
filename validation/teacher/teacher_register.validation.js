import Validator from "validator";
import isEmpty from "is-empty";

const validateTeacherRegisterInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.department = !isEmpty(data.department) ? data.department : "";

  // Name check
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email check
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password check
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // department check
  if (Validator.isEmpty(data.department)) {
    errors.department = "Department is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateTeacherRegisterInput;
