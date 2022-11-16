class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}

class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message, 401);
    }
}

class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, 403);
    }
}

class InternalServerError extends CustomError {
    constructor(message) {
        super(message, 500);
    }
}

module.exports = {
    CustomError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    InternalServerError
}
