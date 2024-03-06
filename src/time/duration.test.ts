import { describe, expect, test } from 'vitest'
import { Duration } from './duration'

describe('Duration', () => {
  type TestCase = [keyof typeof Duration, value: number, expectedMs: number]

  // noinspection PointlessArithmeticExpressionJS
  const testCases: Array<TestCase> = [
    ['fromMilliseconds', 100, 100],
    ['fromMilliseconds', 10, 10],
    ['fromSeconds', 1, 1 * 1000],
    ['fromSeconds', 1.5, 1.5 * 1000],
    ['fromSeconds', -100, -100 * 1000],
    ['fromMinutes', 5, 5 * 60 * 1000],
  ]

  test.each(testCases)('%s(%d).toMilliseconds() == %d', (method, value, expected) => {
    const callback = Duration[method] as (value: number) => Duration

    expect(callback(value).toMilliseconds()).toBe(expected)
  })

  test.each(testCases)('%s(%d).toSeconds() == %d', (method, value, expected) => {
    const callback = Duration[method] as (value: number) => Duration

    expect(callback(value).toSeconds()).toBe(expected / 1000)
  })
})
