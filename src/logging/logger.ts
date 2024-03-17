/**
 * An object which can be used to record data about ongoing operations
 */
export interface Logger {
  // The associated name of the logger
  readonly name: string

  // Adds a new log entry at the debug level
  debug(message: string, extra?: unknown): void

  // Adds a new log entry at the info level
  info(message: string, extra?: unknown): void

  // Adds a new log entry at the warn level
  warn(message: string, extra?: unknown): void

  // Adds a new log entry at the error level
  error(message: string | Error, extra?: unknown): void

  // Adds a new log entry at the fault level
  fault(message: string | Error, extra?: unknown): void
}

// Numeric representation of a log entry
export const enum LoggingLevel {
  // Chatty, lowest level of logging. Useful to debug issues but will often overwhelm with the # of messages
  debug,
  // Informational messages, useful for recording the progress of an operation
  info,
  // Warnings are useful for recording situations where something unexpected happened, but the application should continue
  warn,
  // Errors are useful for recording situations where something unexpected happened, and the user may encounter visible
  // problems if the application continues
  error,
  // Faults are useful for recording situations where something unexpected happened, and the application
  // should stop immediately.
  fault,
}

/**
 * Represents an implementation of a logger that takes some action upon the logs, such as outputting them.
 */
export interface LoggingSink {
  logItem(logger: Logger, level: LoggingLevel, message: string | Error, extra?: unknown): void
}
