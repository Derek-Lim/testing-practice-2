const validateArgs = (...args) => {
  const INVALID_INPUT_ERROR = 'analyzeArray expects an array of numbers'
  const [arr] = [...args]

  if (args.length !== 1 || !Array.isArray(arr) || arr.length < 1) {
    throw new TypeError(INVALID_INPUT_ERROR)
  }

  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr) || typeof arr[i] !== 'number' || !Number.isFinite(arr[i])) {
      throw new TypeError(INVALID_INPUT_ERROR)
    }
  }

  return arr
}

export default function analyzeArray(...args) {
  const arr = validateArgs(...args)

  const normalizeZero = (n) => (Object.is(n, -0) ? 0 : n)

  const length = arr.length
  const average = arr.reduce((total, cur) => total + cur, 0) / length
  const min = arr.reduce((a, b) => (b < a ? b : a), arr[0])
  const max = arr.reduce((a, b) => (b > a ? b : a), arr[0])

  return {
    average,
    min: normalizeZero(min),
    max: normalizeZero(max),
    length,
  }
}
