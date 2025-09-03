const { NOT } = require("sequelize/lib/deferrable");
const { HTTP_RESPONSE_STATUS_CODES } = require("../httpResponseStatusCode");
const { ERRORS_MESSAGES, ERRORS_NAMES } = require("../response_msg");

const CONFLICT_REQUEST_MESSAGES = [
  ERRORS_NAMES.SequelizeUniqueConstraintError,
  ERRORS_MESSAGES.project.user_already_assigned,
];

const BAD_REQUEST_MESSAGES = [
  ERRORS_MESSAGES.validation_errors.invalid_pagination_limit_format,
  ERRORS_MESSAGES.validation_errors.invalid_pagination_page_format,
  ERRORS_MESSAGES.validation_errors.project_image_required,
  ERRORS_MESSAGES.validation_errors.project_description_required,
  ERRORS_MESSAGES.validation_errors.project_name_required,
  ERRORS_MESSAGES.validation_errors.invalid_project_id_format,
  ERRORS_MESSAGES.validation_errors.invalid_users_get_limit_format,
  ERRORS_MESSAGES.project.not_project_manager,
  ERRORS_MESSAGES.project.project_assign_to_which_users,
];

const NOT_FOUND_REQUEST_MESSAGES = [
  ERRORS_MESSAGES.project.projects_not_found,
  ERRORS_MESSAGES.project.project_not_found,
  ERRORS_MESSAGES.user.user_not_found,
  ERRORS_MESSAGES.project.project_has_no_developer,
];

class giveProjectErrors {
  createProjectError = (error) => {
    let err;
    let statusCode;
    if (CONFLICT_REQUEST_MESSAGES.includes(error.name)) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.conflict;
      err = ERRORS_MESSAGES.project.project_already_exists;
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

  findProjectsError = (error) => {
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
      const errorResponse = SHOWN_ERRORS_Of_Project.unexpectedError();

      return errorResponse;
    }
  };

  findProjectError = (error) => {
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

  updateProjectError = (error) => {
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

  deleteProjectError = (error) => {
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
  assignProjectError = (error) => {
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
    } else if (
      error instanceof Error &&
      CONFLICT_REQUEST_MESSAGES.includes(error.message)
    ) {
      statusCode = HTTP_RESPONSE_STATUS_CODES.conflict;
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
  findUsersDevsError = (error) => {
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
  isProjectManagerError = (error) => {
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

const giveProjectError = new giveProjectErrors();
module.exports = {
  giveProjectError,
};
