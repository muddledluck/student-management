import Validator from 'validator';
import isEmpty from 'is-empty';

const validateLoginInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email Check
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field cannot be empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password check
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field cannot be empty"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateLoginInput;