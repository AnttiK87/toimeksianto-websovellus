// src/errors/AppError.ts

// Custom application-specific error class.
// Extends the built-in Error and includes:
// - message for error message
// - HTTP status code
// - isOperational flag to indicate whether the error is safe to show to end users.

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public message: string;

  constructor(message: string, statusCode = 500, isOperational = false) {
    super(message || 'Unknown error');
    this.name = 'AppError';
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}
