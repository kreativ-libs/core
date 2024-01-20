type AnyFunction = (...args: any[]) => any

export const is = {
  function: <T extends AnyFunction = AnyFunction>(value: unknown): value is T => {
    return typeof value === 'function'
  },
  string: (value: unknown): value is string => {
    return typeof value === 'string'
  },
  object: (value: unknown): value is object => {
    return value != null && typeof value === 'object' && !Array.isArray(value)
  },
  array: (value: unknown): value is unknown[] => {
    return Array.isArray(value)
  },
}
