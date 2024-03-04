import { describe, expectTypeOf, test } from 'vitest'
import { Newable } from './types'
import { noop } from '../noop'

describe('Newable', () => {
  test('succeeds on a constructable type', () => {
    function aFunction<T>(constructor: Newable<T, any[]>): T {
      return new constructor()
    }

    class Constructable {
      constructor() {}
    }

    expectTypeOf(aFunction<Constructable>).returns.toEqualTypeOf<Constructable>()
  })

  test('fails on a non-constructable type', () => {
    class Cat {
      private constructor() {}
    }

    function aFunction<T>(constructor: Newable<T, any[]>): T {
      return new constructor()
    }

    // @ts-expect-error "is not assignable"
    expectTypeOf(aFunction<Cat>(Cat))

    // @ts-expect-error "is not assignable"
    expectTypeOf(aFunction('Cat'))
  })

  test('params must match', () => {
    class Cat {
      public constructor(age: number) {
        noop(age)
      }
    }

    function aFunction<T, TArg>(constructor: Newable<T, [TArg]>): T {
      return new constructor({} as any as TArg)
    }

    expectTypeOf(aFunction<Cat, number>(Cat))

    // @ts-expect-error TS2345
    expectTypeOf(aFunction<Cat, string>(Cat))
  })
})
