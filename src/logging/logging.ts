import { Logger, LoggingLevel, LoggingSink } from './logger'
import { consoleSink } from './console-sink'

class DefaultLoggerSink implements LoggingSink {
  private sink: LoggingSink = consoleSink

  logItem(logger: Logger, level: LoggingLevel, message: string | Error, extra?: unknown): void {
    this.sink.logItem(logger, level, message, extra)
  }

  setSink(sink: LoggingSink): void {
    if (sink == this || sink instanceof DefaultLoggerSink) {
      throw new Error('Cannot set default sink to itself or a DefaultLoggerSink')
    }

    this.sink = sink
  }
}

/**
 * The default logging sink to use when one is not explicitly specified when making a new logger. By
 * default it forwards all messages to the console.
 *
 * Although this is an implementation of a logging sink, it acts as a forwarding sink - that is all
 * log entries are passed into another. The sink that it forwards to can be changed by invoking the
 * `setSink` method.  This will affect all loggers using the sink, both existing and new loggers.
 */
type DefaultLoggingSink = LoggingSink & {
  setSink(sink: LoggingSink): void
}

export const defaultSink: DefaultLoggingSink = new DefaultLoggerSink()
