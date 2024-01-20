/**
 * Escapes the characters of string to that it is safe to add to append to a regex
 * @param str the string value to escape
 */
export function escapeRegex(str: string) {
  // https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
  return str.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
}
