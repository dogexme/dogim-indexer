// MaxRetriesReachedError.js
class MaxRetriesReachedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MaxRetriesReachedError'
  }
}

module.exports = MaxRetriesReachedError
