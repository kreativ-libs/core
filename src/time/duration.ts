/**
 * Strongly typed class to represent an amount of time
 */
export class Duration {
  private constructor(private ms: number) {}

  static fromMilliseconds(ms: number) {
    return new Duration(ms)
  }

  static fromSeconds(seconds: number) {
    return new Duration(seconds * 1000)
  }

  static fromMinutes(minutes: number) {
    return new Duration(minutes * 60 * 1000)
  }

  public toMilliseconds() {
    return this.ms
  }

  public toSeconds() {
    return this.ms / 1000
  }
}
