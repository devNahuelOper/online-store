const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateRegisterInputs(data) {
  data.name = validText(data.name) ? data.name : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.name)) {
    return { message: "Name field is required", isValid: false };
  }

  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { message: "Email field is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
    return {
      message: "Password must be between 8 and 32 characters",
      isValid: false,
    };
  }

  return {
    message: "",
    isValid: true,
  };
};
