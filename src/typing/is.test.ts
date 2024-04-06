import { describe, expect, test } from 'vitest'
import { is } from './is'

type ValueType = 'number' | 'array' | 'string' | 'object' | 'function' | 'promise' | 'other'

const useCases: Array<[unknown, ValueType, ...rest: ValueType[]]> = [
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
  [Promise.resolve(4), 'promise', 'object'],
  [
    {
      then: () => {},
      catch: () => {},
    },
    'promise',
    'object',
  ],
]

function getUseCases(type: ValueType) {
  const matching = []
  const notMatching = []

  for (const item of useCases) {
    const [data, ...types] = item
    if (types.includes(type)) {
      matching.push(data)
    } else {
      notMatching.push(data)
    }
  }
  return { matching, notMatching }
}

const checks: Array<[(value: unknown) => boolean, ValueType]> = [
  [is.object, 'object'],
  [is.string, 'string'],
  [is.function, 'function'],
  [is.array, 'array'],
  [is.promise, 'promise'],
]

for (const [callback, type] of checks) {
  describe(`is.${type}`, () => {
    const { matching, notMatching } = getUseCases(type)

    for (const value of notMatching) {
      test(`returns false correctly (${value})`, () => {
        expect(callback(value)).toBe(false)
      })
    }

    for (const value of matching) {
      test(`returns true correctly (${value})`, () => {
        expect(callback(value)).toBe(true)
      })
    }
  })
}
