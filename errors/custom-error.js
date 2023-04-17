class CustomAPIError extends Error {
    constructor(statusCode, message) {
        this.statusCode = statusCode
        super(message)
    }
}

module.exports = CustomAPIError