import Validations from "./Validations";

export default class SignupValidations {
  constructor(email, username, birthday, sex, password) {
    this.email = email;
    this.username = username;
    this.birthday = birthday;
    this.sex = sex;
    this.password = password;
  }

  checkValidations() {
    if (
      Validations.validEmail(this.email) &&
      Validations.validPassword(this.password) &&
      Validations.validDate(this.birthday) &&
      Validations.validSex(this.sex) &&
      Validations.validUsername(this.username)
    ) {
      return true;
    }

    return false;
  }

  static getErrorMessageFromCode(errorCode) {
    switch (errorCode) {
      case "EMAIL_EXISTS":
        return "Email already exists";
      case "EMAIL_NOT_FOUND":
        return "Email Not Found";
      case "INVALID_PASSWORD":
        return "Invalid Password";
      default:
        return "Unexpected error occurred. Please try again";
    }
  }
}
