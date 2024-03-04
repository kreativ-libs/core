/**
 * A constructor for a specific type and specific arguments.
 */
export type Newable<T, TArgs extends any[]> = {
  new (...args: TArgs): T
}

/**
 * Represents an object that needs explicit cleanup when the object is no longer needed.
 */
export type Releasable = {
  /**
   * Cleans up the resources in this object.
   */
  dispose(): void
}
