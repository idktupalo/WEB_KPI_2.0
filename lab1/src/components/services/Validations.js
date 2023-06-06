export default class Validations {
  static checkEmail(email) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    }
    return false;
  }

  static checkUsername(username) {
    // Regular expression pattern for valid username format
    const usernamePattern = /^[a-zA-Z0-9_]{3,16}$/;

    if (!usernamePattern.test(username)) {
      // Invalid username format
      return true;
    }

    // Valid username format
    return false;
  }

  static checkPassword(password) {
    // Regular expression pattern for valid password format
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordPattern.test(password)) {
      // Invalid password format
      return false;
    }

    // Valid password format
    return true;
  }

  static minLength(name, minLength) {
    if (name.length < minLength) {
      return false;
    }
    return true;
  }
}
