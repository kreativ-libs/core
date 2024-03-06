import { afterEach, beforeEach, describe, expect, test, vi, vitest } from 'vitest'
import { DebounceTimer } from './debounce-timer'
import { Duration } from './duration'
import { delay } from '../async'

describe('debounce-timer', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  function createTimer(duration: Duration, timercallback = () => {}) {
    const callback = vi.fn(timercallback)

    const timer: DebounceTimer = new DebounceTimer(callback, duration)
    timer.retrigger()

    afterEach(() => {
      timer.dispose()
    })

    return { timer, callback }
  }

  test('invokes callback after elapsed time', () => {
    const duration = Duration.fromSeconds(1)
    const { callback } = createTimer(duration)

    vitest.advanceTimersByTime(duration.toMilliseconds())

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('does not invoke before elapsed time', () => {
    const duration = Duration.fromSeconds(1)
    const { callback } = createTimer(duration)

    vitest.advanceTimersByTime(duration.toMilliseconds() - 1)

    expect(callback).toHaveBeenCalledTimes(0)

    vitest.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('calling retrigger() debounced the timer', () => {
    const duration = Duration.fromSeconds(1)
    const { callback, timer } = createTimer(duration)

    vitest.advanceTimersByTime(duration.toMilliseconds() - 1)
    timer.retrigger()

    vitest.advanceTimersByTime(duration.toMilliseconds() - 1)
    expect(callback).toHaveBeenCalledTimes(0)

    vitest.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('retriggering can be done from the callback (sync)', () => {
    const duration = Duration.fromSeconds(1)
    const { callback, timer } = createTimer(duration, () => {
      if (callback.mock.calls.length == 1) {
        timer.retrigger()
      }
    })

    vitest.advanceTimersByTime(duration.toMilliseconds())
    expect(callback).toHaveBeenCalledTimes(1)
    expect(timer.isPendingExecution).toBeTruthy()

    vitest.advanceTimersByTime(duration.toMilliseconds())
    expect(callback).toHaveBeenCalledTimes(2)
    expect(timer.isPendingExecution).toBeFalsy()
  })

  test('retriggering can be done from the callback (async)', async () => {
    const duration = Duration.fromSeconds(1)
    const { callback, timer } = createTimer(duration, async () => {
      if (callback.mock.calls.length == 1) {
        await delay(Duration.fromMilliseconds(1))
        timer.retrigger()
      }
    })

    await vitest.advanceTimersByTimeAsync(duration.toMilliseconds())
    expect(callback).toHaveBeenCalledTimes(1)
    expect(timer.isPendingExecution).toBeFalsy()

    await vitest.advanceTimersByTimeAsync(1)
    expect(timer.isPendingExecution).toBeTruthy()

    await vitest.advanceTimersByTimeAsync(duration.toMilliseconds())
    expect(callback).toHaveBeenCalledTimes(2)
    expect(timer.isPendingExecution).toBeFalsy()
  })
})
