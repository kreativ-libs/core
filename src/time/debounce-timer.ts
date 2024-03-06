import { Duration } from './duration'
import { Releasable } from '../typing/types'

/**
 * A timer that invokes the given callback a fixed amount of time after the last
 * invocation to retrigger(). Invoking retrigger() resets amount of time until the
 * callback is invoked.
 */
export class DebounceTimer implements Releasable {
  private readonly timeInMs: number

  private timerId = 0 as any

  private isDirty = false
  private isExecuting = false

  constructor(
    private callback: () => any | Promise<any>,
    time: Duration,
  ) {
    this.timeInMs = time.toMilliseconds()
  }

  /**
   * True if the timer needs to be executed
   */
  public get isPendingExecution() {
    return this.isDirty && this.timerId
  }

  /**
   * Stops the timer from running, if it is queued to run
   */
  public dispose() {
    this.stop()
  }

  /**
   * Stops the timer from running, if it is queued to run
   */
  public stop() {
    clearTimeout(this.timerId)
    this.timerId = 0 as any
    this.isDirty = false
  }

  /**
   * Trigger the timer to run after the pre-specified delay of time
   */
  public retrigger() {
    this.isDirty = true

    // reset the timer if we're not currently executing
    if (!this.isExecuting) {
      this.restartTimer()
    }
  }

  private async execute() {
    try {
      this.isExecuting = true
      this.stop()

      const value = this.callback()
      // todo extract to helper
      if (value && 'then' in value) {
        await value
      }
    } finally {
      this.isExecuting = false

      if (this.isDirty) {
        this.restartTimer()
      }
    }
  }

  private restartTimer() {
    this.stop()
    this.timerId = setTimeout(() => this.execute(), this.timeInMs)
    this.isDirty = true
  }
}
