class UserError extends Error {
  constructor(message, status, extraDetails) {
    super(message);
    this.status = status;
    this.extraDetails = extraDetails;
  }
}

module.exports = UserError;
