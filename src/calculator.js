export default function Calculator() {
  const validate = (...args) => {
    const ERR_INVALID_INPUT = 'calculator expects two finite numbers'
    if (args.length !== 2) throw new TypeError(ERR_INVALID_INPUT)
    const [a, b] = args
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new TypeError(ERR_INVALID_INPUT)
    }
    return [a, b]
  }

  const add = (...args) => {
    const [a, b] = validate(...args)
    return a + b
  }

  const subtract = (...args) => {
    const [a, b] = validate(...args)
    return a - b
  }

  const divide = (...args) => {
    const [a, b] = validate(...args)
    const ERR_DIVIDE_BY_ZERO = 'cannot divide by zero'
    if (b === 0) throw new TypeError(ERR_DIVIDE_BY_ZERO)
    return a / b
  }

  const multiply = (...args) => {
    const [a, b] = validate(...args)
    return a * b
  }

  return { add, subtract, divide, multiply }
}
