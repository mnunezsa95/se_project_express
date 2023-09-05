/* eslint-disable camelcase */

// ErrorCodes
const ERROR_404 = 404;
const ERROR_401 = 401;
const ERROR_409 = 409;
const ERROR_400 = 400;
const ERROR_403 = 403;
const ERROR_500 = 500;

const throwDuplicateError = () => {
  const DuplicateEmailError = new Error("email already exists");
  DuplicateEmailError.name = "DuplicateEmailError";
  throw DuplicateEmailError;
};

module.exports = {
  ERROR_404,
  ERROR_401,
  ERROR_409,
  ERROR_400,
  ERROR_403,
  ERROR_500,
  throwDuplicateError,
};
