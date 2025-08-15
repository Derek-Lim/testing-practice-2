export default function Calculator() {
  const MSG = 'calculator expects two finite numbers'

  function add(a, b) {
    if (arguments.length !== 2) throw new TypeError(MSG)

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new TypeError(MSG)
    }

    return a + b
  }

  function subtract(a, b) {
    if (arguments.length !== 2) throw new TypeError(MSG)

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new TypeError(MSG)
    }

    return a - b
  }

  function divide(a, b) {
    const ZERO = 'cannot divide by zero'

    if (arguments.length !== 2) throw new TypeError(MSG)

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new TypeError(MSG)
    }

    if (b === 0) throw new TypeError(ZERO)

    return a / b
  }

  function multiply(a, b) {
    if (arguments.length !== 2) throw new TypeError(MSG)

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new TypeError(MSG)
    }

    return a * b
  }

  return { add, subtract, divide, multiply }
}