import { describe, expect, test } from 'vitest'
import { toSortedArray } from './array'

describe('toSortedArray', () => {
  test('can sort by the value directly', () => {
    const values = [
      10, //
      3,
      12,
    ]

    const sorted = toSortedArray(values, (it) => it)
    expect(sorted).toStrictEqual([3, 10, 12])
  })

  test('does not modify the original array', () => {
    const values = [
      10, //
      3,
      12,
    ]

    const sorted = toSortedArray(values, (it) => it)
    expect(sorted).not.toBe(values)
  })

  test('can sort by multiple properties', () => {
    const values = [
      10, //
      3,
      12,
    ]

    const sorted = toSortedArray(
      values,
      (it) => it % 2,
      (it) => it,
    )
    expect(sorted).toStrictEqual([10, 12, 3])
  })

  test('sorts by the value passed if no property is included', () => {
    const values = [
      10, //
      3,
      12,
    ]

    const sorted = toSortedArray(values)
    expect(sorted).toStrictEqual([3, 10, 12])
  })
})
