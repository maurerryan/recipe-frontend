import validator from 'validator';

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

class ValidateFields {
  /*
   * A method that takes in the email
   * Validates it
   * Returns the response either error or false if there is no error
   */
  validateEmail(email) {
    if (validator.isEmpty(email)) {
      return 'Email is required';
    } else if (!validator.isEmail(email)) {
      return 'Invalid Email';
    }
    return false;
  }

  validateString(string, field) {
    string = string.trim();
    if (validator.isEmpty(string)) {
      return 'Please enter a valid ' + field;
    }
    // } else if (!validator.isLength(string, { min: 8 })) {
    //   return 'Password should be minimum 8 characters';
    // }
    return false;
  }

  validateInt(int, field) {
    if (validator.isInt(int)) {
      return 'Please enter a valid ' + field;
    }
    // else if (!validator.isLength(string, { min: 8 })) {
    //   return 'Password should be minimum 8 characters';
    // }
    return false;
  }
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };