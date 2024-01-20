import { describe, expect, test } from 'vitest'
import { is } from './is'

type ValueType = 'number' | 'array' | 'string' | 'object' | 'function' | 'other'

const useCases: Array<[unknown, ValueType]> = [
  [0, 'number'],
  [1, 'number'],
  [Number.NaN, 'number'],
  [[], 'array'],
  [[1], 'array'],
  ['aString', 'string'],
  ['', 'string'],
  [{}, 'object'],
  [null, 'other'],
  [() => 4, 'function'],
  [
    function () {
      return 4
    },
    'function',
  ],
  [(arg: string) => arg, 'function'],
]

function getUseCases(type: ValueType) {
  const matching = useCases.filter((it) => it[1] == type).map((it) => it[0])
  const notMatching = useCases.filter((it) => it[1] != type).map((it) => it[0])

  return { matching, notMatching }
}

const checks: Array<[(value: unknown) => boolean, ValueType]> = [
  [is.object, 'object'],
  [is.string, 'string'],
  [is.function, 'function'],
  [is.array, 'array'],
]

for (const [callback, type] of checks) {
  describe(`is.${type}`, () => {
    const { matching, notMatching } = getUseCases(type)

    test('returns false correctly', () => {
      for (const value of notMatching) {
        expect(callback(value)).toBe(false)
      }
    })

    test('returns true correctly', () => {
      for (const value of matching) {
        expect(callback(value)).toBe(true)
      }
    })
  })
}
