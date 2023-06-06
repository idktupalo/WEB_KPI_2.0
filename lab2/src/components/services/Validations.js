export default class Validations {
  static validPassword(password) {
    if (password.length > 7) {
      return true;
    }
    return false;
  }
  static validEmail(email) {
    var re = /(.+)@(.+){2,}\.(.+){2,}/;
    if (re.test(email.toLowerCase())) {
      return true;
    }
    return false;
  }

  static validUsername(username) {
    if (username && /^[A-Za-z\s]+$/.test(username)) {
      return true;
    }
    return false;
  }

  static validDate(date) {
    const currentDate = new Date();
    const inputDate = new Date(date);

    return date && !isNaN(inputDate.getTime()) && inputDate <= currentDate;
  }

  static validSex(gender) {
    return !!gender;
  }
}
