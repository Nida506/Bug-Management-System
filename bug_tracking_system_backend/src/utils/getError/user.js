const { HTTP_RESPONSE_STATUS_CODES } = require("../httpResponseStatusCode");
const { ERRORS_MESSAGES, ERRORS_NAMES } = require("../response_msg");

const CONFLICT_REQUEST_MESSAGES = [ERRORS_NAMES.SequelizeUniqueConstraintError];
const BAD_REQUEST_MESSAGES = [
  ERRORS_MESSAGES.validation_errors.name_required,
  ERRORS_MESSAGES.validation_errors.email_required,

  ERRORS_MESSAGES.validation_errors.user_type_required,

  ERRORS_MESSAGES.validation_errors.mobile_number_required,
  ERRORS_MESSAGES.validation_errors.user_type_invalid,
  ERRORS_MESSAGES.validation_errors.password_not_strong,
  ERRORS_MESSAGES.validation_errors.password_required,
  ERRORS_MESSAGES.validation_errors.user_type_invalid,
  ERRORS_MESSAGES.validation_errors.invalid_user_id_format,
  ERRORS_MESSAGES.user.password_not_editable,
  ERRORS_MESSAGES.validation_errors.invalid_users_get_limit_format,
];
const NOT_FOUND_REQUEST_MESSAGES = [];
const UNAUTHORIZED_REQUSET_MESSAGES = [
  ERRORS_MESSAGES.user.unauthorized_user,
  ERRORS_MESSAGES.user.user_not_found,
  ERRORS_MESSAGES.user.own_profile_edit,
  ERRORS_MESSAGES.user.delete_user,
  ERRORS_MESSAGES.user.users_not_found,
];

class giveUserErrors {
  createUserError = (error) => {
    let err;
    let statusCode;

    if (error.name === ERRORS_NAMES.SequelizeValidationError) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.bad_request;
      err = ERRORS_MESSAGES.user.invalid_email_format;
    } else if (CONFLICT_REQUEST_MESSAGES.includes(error.name)) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.conflict;
      err = ERRORS_MESSAGES.user.user_confict;
    } else if (
      error instanceof Error &&
      BAD_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.bad_request;
      err = error.message;
    } else {
      statusCode = HTTP_RESPONSE_STATUS_CODES.internal_server_error;
      err = ERRORS_MESSAGES.unexpected_error;
    }

    const errorResponse = {
      statusCode: statusCode,
      err: err,
    };
    return errorResponse;
  };

  findUserError = (error) => {
    let err;
    let statusCode;

    if (
      error instanceof Error &&
      UNAUTHORIZED_REQUSET_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.unauthorized;
      err = error.message;
    } else {
      statusCode = HTTP_RESPONSE_STATUS_CODES.internal_server_error;
      err = ERRORS_MESSAGES.unexpected_error;
    }

    const errorResponse = {
      statusCode: statusCode,
      err: err,
    };
    return errorResponse;
  };
  getUserError = (error) => {
    let err;
    let statusCode;
    if (
      error instanceof Error &&
      NOT_FOUND_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.not_found;
      err = error.message;
    } else if (
      error instanceof Error &&
      BAD_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.bad_request;
      err = error.message;
    } else {
      statusCode = HTTP_RESPONSE_STATUS_CODES.internal_server_error;
      err = ERRORS_MESSAGES.unexpected_error;
    }

    const errorResponse = {
      statusCode: statusCode,
      err: err,
    };
    return errorResponse;
  };
  editUserError = (error) => {
    let err;
    let statusCode;
    if (
      error instanceof Error &&
      BAD_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.bad_request;
      err = error.message;
    } else if (
      error instanceof Error &&
      UNAUTHORIZED_REQUSET_MESSAGES(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.unauthorized;
      err = error.message;
    } else {
      statusCode = HTTP_RESPONSE_STATUS_CODES.internal_server_error;
      err = ERRORS_MESSAGES.unexpected_error;
    }
    const errorResponse = {
      statusCode: statusCode,
      err: err,
    };
    return errorResponse;
  };
  deleteUserError = (error) => {
    let err;
    let statusCode;
    if (
      error instanceof Error &&
      UNAUTHORIZED_REQUSET_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.unauthorized;
      err = error.message;
    } else if (
      error instanceof Error &&
      BAD_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.bad_request;
      err = error.message;
    } else {
      statusCode = HTTP_RESPONSE_STATUS_CODES.internal_server_error;
      err = ERRORS_MESSAGES.unexpected_error;
    }

    const errorResponse = {
      statusCode: statusCode,
      err: err,
    };
    return errorResponse;
  };
  getUsersError = (error) => {
    let err;
    let statusCode;
    if (
      error instanceof Error &&
      NOT_FOUND_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.not_found;
      err = error.message;
    } else if (
      error instanceof Error &&
      BAD_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.bad_request;
      err = error.message;
    } else {
      statusCode = HTTP_RESPONSE_STATUS_CODES.internal_server_error;
      err = ERRORS_MESSAGES.unexpected_error;
    }

    const errorResponse = {
      statusCode: statusCode,
      err: err,
    };
    return errorResponse;
  };
}

const giveUserError = new giveUserErrors();
module.exports = {
  giveUserError,
};
