import { Duration } from './time/duration'

/**
 * Return a promise that resolves in the given amount of time
 */
export function delay(duration: Duration) {
  return new Promise((resolve) => setTimeout(resolve, duration.toMilliseconds()))
}
