class CustomAPIError extends Error {
    constructor(statusCode, message) {
        this.statusCode = statusCode
        super(message)
    }
}

const createCustomError = (statusCode, msg) => {
    return new CustomAPIError(statusCode, msg)
}

module.exports = { createCustomError,CustomAPIError }