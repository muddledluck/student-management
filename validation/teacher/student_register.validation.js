import Validator from "validator";
import isEmpty from "is-empty";
import mongodb from "mongodb";

const validateStudentRegisterInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
  data.teacherId = !isEmpty(data.teacherId) ? data.teacherId : "";
  data.department = !isEmpty(data.department) ? data.department : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is requried";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isEmpty(data.dateOfBirth)) {
    errors.dateOfBirth = "Date of Birth is required";
  } else if (!Validator.isDate(data.dateOfBirth)) {
    errors.dateOfBirth = "Invalid Date of Birth";
  }

  if (Validator.isEmpty(data.teacherId)) {
    errors.teacherId = "teacherId is required";
  } else if (!Validator.isMongoId(data.teacherId)) {
    errors.teacherId = "Invalid teacherId";
  }

  if (Validator.isEmpty(data.department)) {
    errros.department = "Department is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateStudentRegisterInput;
