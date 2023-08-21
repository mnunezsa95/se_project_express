class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = ValidationError;
    this.statusCode = 400;
    this.message = "Invalid User";
  }
}

module.exports = { ValidationError };