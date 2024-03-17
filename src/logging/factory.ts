import { Logger, LoggingLevel, LoggingSink } from './logger'
import { defaultSink } from './logging'

/**
 * Implementation of Logger which delegates all functionality a logging sink
 */
class LoggerImplementation implements Logger {
  constructor(
    public readonly name: string,
    private readonly sink: LoggingSink,
  ) {}

  private logItem(level: LoggingLevel, message: string | Error, extra?: unknown): void {
    this.sink.logItem(this, level, message, extra)
  }

  public debug(message: string | Error, extra?: unknown): void {
    this.logItem(LoggingLevel.debug, message, extra)
  }

  public info(message: string | Error, extra?: unknown): void {
    this.logItem(LoggingLevel.info, message, extra)
  }

  public warn(message: string | Error, extra?: unknown): void {
    this.logItem(LoggingLevel.warn, message, extra)
  }

  public error(message: string | Error, extra?: unknown): void {
    this.logItem(LoggingLevel.error, message, extra)
  }

  public fault(message: string | Error, extra?: unknown): void {
    this.logItem(LoggingLevel.fault, message, extra)
  }
}

/**
 * Creates a new logger with the given name, redirecting all logs to the given sink.
 * @param name the name of hte logger, used when outputting information
 * @param sink the destination to which all logged entries go into
 */
export function makeLogger(name: string, sink: LoggingSink = defaultSink) {
  return new LoggerImplementation(name, sink)
}
