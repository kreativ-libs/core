import { describe, expect, test } from 'vitest'
import { isStateTransferable, stateTransfer, StateTransferable, transferState } from './state-transferable'

class ExampleTransferable implements StateTransferable {
  constructor(public value: number) {}

  [stateTransfer](other: this): void {
    this.value = other.value
  }
}

class NotTransferable {
  constructor(public value: number) {}
}

describe('state transfer', () => {
  test('isStateTransferable returns true when it is transferable', () => {
    expect(isStateTransferable(new ExampleTransferable(3))).toBe(true)
  })

  test('isStateTransferable returns false when it is not transferable', () => {
    expect(isStateTransferable(new NotTransferable(3))).toBe(false)
  })

  test('transferState transfers', () => {
    const oldItem = new ExampleTransferable(1)
    const newItem = new ExampleTransferable(4)

    transferState(oldItem, newItem)

    expect(newItem.value).toBe(1)
  })

  test('transferState does transfer non-transferable items', () => {
    const oldItem = new NotTransferable(1)
    const newItem = new NotTransferable(4)

    transferState(oldItem, newItem)

    expect(newItem.value).toBe(4)
  })
})
