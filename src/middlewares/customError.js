
class CustomAPIError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

class BadRequestError extends CustomAPIError {
    constructor (message){
        super(message)
        this.statusCode = 400
    }
}

class UnauthorizedError extends CustomAPIError {
    constructor (message) {
        super(message) 
        this.statusCode = 401
    }
}

class ForbiddenError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 403
    }
}

class NotFoundError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 404
    }
}

class InternalServerError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 500
    }
}

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError
}