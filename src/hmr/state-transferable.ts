/**
 * Symbol for a method that transfers state from an old instance of an object to a new instance.
 * The primary use case for this method is hot-reloading during development.
 */
export const stateTransfer: unique symbol = Symbol()

/**
 * Convenience interface for an object which can transfer state.
 */
export interface StateTransferable {
  [stateTransfer](other: this): void
}

/**
 * True if the given object participates in state transferring
 */
export function isStateTransferable<T extends object>(value: T): value is T & StateTransferable {
  return stateTransfer in value
}

/**
 * Transfer state from the oldInstance to the newInstance if newInstance[stateTransfer] exists
 */
export function transferState<T extends object>(oldInstance: T, newInstance: T) {
  if (stateTransfer in newInstance) {
    ;(newInstance[stateTransfer] as any)(oldInstance)
  }
}
