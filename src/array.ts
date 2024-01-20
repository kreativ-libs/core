/**
 * Returns a new array that is sorted by the provided properties
 * @param arr the array to sort
 * @param properties the properties of T to sort by
 */
export function toSortedArray<T>(arr: T[], ...properties: Array<(item: T) => number | string>) {
  if (properties.length == 0) {
    properties = [(it) => it as any]
  }

  const copy = [...arr]
  copy.sort((a, b) => {
    for (const property of properties) {
      const left = property(a)
      const right = property(b)

      if (left < right) {
        return -1
      } else if (left > right) {
        return 1
      }
    }

    return 0
  })
  return copy
}
