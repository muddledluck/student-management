import Validator from "validator";
import isEmpty from "is-empty";

const validateAdminApproveOrDeleteTeacherInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator
  data.adminId = !isEmpty(data.adminId) ? data.adminId : "";
  data.teacherId = !isEmpty(data.teacherId) ? data.teacherId : "";

  // adminId check
  if (Validator.isEmpty(data.adminId)) {
    errors.adminId = "adminId field is required";
  } else if (!Validator.isMongoId(data.adminId)) {
    errors.adminId = "Invalid adminId";
  }

  // teacherId check
  if (Validator.isEmpty(data.teacherId)) {
    errors.teacherId = "teacherId field is required";
  } else if (!Validator.isMongoId(data.teacherId)) {
    errors.teacherId = "Invalid teacherId";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAdminApproveOrDeleteTeacherInput;
