const { HTTP_RESPONSE_STATUS_CODES } = require("../httpResponseStatusCode");
const { ERRORS_MESSAGES, ERRORS_NAMES } = require("../response_msg");

const CONFLICT_REQUEST_MESSAGES = [ERRORS_NAMES.SequelizeUniqueConstraintError];

const BAD_REQUEST_MESSAGES = [
  ERRORS_MESSAGES.validation_errors.bugs_types_invalid,
  ERRORS_MESSAGES.project.QA_not_assign_to_project,
  ERRORS_MESSAGES.validation_errors.feature_status_invalid,
  ERRORS_MESSAGES.validation_errors.bug_status_invalid,
  ERRORS_MESSAGES.validation_errors.bug_title_required,
  ERRORS_MESSAGES.validation_errors.bug_des_required,
  ERRORS_MESSAGES.validation_errors.bug_type_required,
  ERRORS_MESSAGES.validation_errors.bug_deadline_required,
  ERRORS_MESSAGES.validation_errors.bug_members_required,
  ERRORS_MESSAGES.validation_errors.invalid_project_id_format,
  ERRORS_MESSAGES.validation_errors.invalid_bug_id_format,
  ERRORS_MESSAGES.validation_errors.invalid_pagination_limit_format,
  ERRORS_MESSAGES.validation_errors.invalid_pagination_page_format,
  ERRORS_MESSAGES.bug.not_QA_of_task,
];

const NOT_FOUND_REQUEST_MESSAGES = [
  ERRORS_MESSAGES.project.project_not_found,
  ERRORS_MESSAGES.bug.task_not_found,
  ERRORS_MESSAGES.bug.tasks_not_found,
];

class giveBugErrors {
  createBugError = (error) => {
    let err;
    let statusCode;

    if (CONFLICT_REQUEST_MESSAGES.includes(error.name)) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.conflict;
      err = ERRORS_MESSAGES.bug.task_already_exists;
    } else if (
      error instanceof Error &&
      BAD_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.bad_request;
      err = error.message;
    } else if (
      error instanceof Error &&
      NOT_FOUND_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.not_found;
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

  editBugError = (error) => {
    let err;
    let statusCode;
    if (CONFLICT_REQUEST_MESSAGES.includes(error.name)) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.conflict;
      err = ERRORS_MESSAGES.bug.task_already_exists;
    } else if (
      error instanceof Error &&
      BAD_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.bad_request;
      err = error.message;
    } else if (
      error instanceof Error &&
      NOT_FOUND_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.not_found;
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

  deleteBugError = (error) => {
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
      NOT_FOUND_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.not_found;
      err = error.message;
    }
  };

  findBugsError = (error) => {
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

  findBugError = (error) => {
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

  changeBugStatusError = (error) => {
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
      NOT_FOUND_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.not_found;
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

  isQABelongToProjectError = (error) => {
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
      NOT_FOUND_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.not_found;
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

  isQABelongToBugError = (error) => {
    if (
      error instanceof Error &&
      BAD_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.bad_request;
      err = error.message;
    } else if (
      error instanceof Error &&
      NOT_FOUND_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.not_found;
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

const giveBugError = new giveBugErrors();
module.exports = { giveBugError };
