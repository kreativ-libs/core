import { Logger, LoggingLevel, LoggingSink } from './logger'

type ConsoleInfo = { style: string; prefix: string; target: (...args: any[]) => void }

const mapping: Record<LoggingLevel, ConsoleInfo> = {
  [LoggingLevel.debug]: {
    style: 'color: gray',
    prefix: 'VBS',
    target: console.log,
  },

  [LoggingLevel.info]: {
    style: '',
    prefix: 'INF',
    target: console.log,
  },

  [LoggingLevel.warn]: {
    style: 'color: yellow',
    prefix: 'WRN',
    target: console.warn,
  },

  [LoggingLevel.error]: {
    style: 'color: red',
    prefix: 'ERR',
    target: console.error,
  },

  [LoggingLevel.fault]: {
    style: 'color: red; font-size: 1.3em',
    prefix: 'FLT',
    target: console.error,
  },
}

/**
 * A logger sink that outputs all logs to the console.
 */
export const consoleSink: LoggingSink = {
  logItem(logger: Logger, level: LoggingLevel, message: string | Error, extra?: unknown): void {
    const info = mapping[level]
    info.target(`%c[${info.prefix}] [${logger.name}] ${message}`, info.style, extra)
    if (message instanceof Error) {
      info.target(message)
    }
  },
}
