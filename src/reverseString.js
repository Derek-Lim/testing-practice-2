export default function reverseString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('reverseString expects a string')
  }

  return [...input].reverse().join('')
}