import Calculator from '../src/calculator.js'

describe('calculator', () => {
  let calculator
  const ERR_INVALID_INPUT = 'calculator expects two finite numbers'
  beforeEach(() => {
    calculator = Calculator()
  })

  describe('add', () => {
    // invalid input policy
    describe('invalid input', () => {
      it('throws on non-numeric strings', () => {
        expect(() => calculator.add('a', 'b')).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on numeric strings', () => {
        expect(() => calculator.add('1', '2')).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.add(1, '2')).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on null/undefined', () => {
        expect(() => calculator.add(null, 1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.add(1, undefined)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on NaN or infinite values', () => {
        expect(() => calculator.add(NaN, 1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.add(Infinity, 1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.add(-Infinity, 1)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on invalid argument length', () => {
        expect(() => calculator.add(1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.add()).toThrow(ERR_INVALID_INPUT)
      })

      it('throws when too many args', () => {
        expect(() => calculator.add(1, 2, 3)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on boolean values', () => {
        expect(() => calculator.add(true, false)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.add(true, 21)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on objects/arrays', () => {
        expect(() => calculator.add(['fat', 'cat'], ['cat'])).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.add({}, 21)).toThrow(ERR_INVALID_INPUT)
      })
    })

    // happy path & basic shapes
    it('adds two positive integers', () => {
      expect(calculator.add(1, 2)).toBe(3)
    })

    it('adds two negative integers', () => {
      expect(calculator.add(-1, -2)).toBe(-3)
    })

    it('adds mixed signs crossing zero', () => {
      expect(calculator.add(-123, 345)).toBe(222)
    })

    it('respects the additive identity (x + 0 = x)', () => {
      expect(calculator.add(42, 0)).toBe(42)
    })

    it('is commutative (a + b = b + a)', () => {
      expect(calculator.add(5, 7)).toBe(calculator.add(7, 5))
    })

    // floating point
    it('adds floats (with precision tolerance)', () => {
      expect(calculator.add(3.14, 4.13)).toBeCloseTo(7.27, 2)
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3, 10)
    })
  })

  describe('subtract', () => {
    // invalid input policy
    describe('invalid input', () => {
      it('throws on non-numeric strings', () => {
        expect(() => calculator.subtract('cattail', 'cat')).toThrow(
          ERR_INVALID_INPUT
        )
      })

      it('throws on numeric strings', () => {
        expect(() => calculator.subtract('2', '1')).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.subtract(2, '1')).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on null/undefined', () => {
        expect(() => calculator.subtract(1, undefined)).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.subtract(null, 2)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on NaN or infinite values', () => {
        expect(() => calculator.subtract(NaN, 1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.subtract(Infinity, 1)).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.subtract(-Infinity, 1)).toThrow(
          ERR_INVALID_INPUT
        )
      })

      it('throws when too few args', () => {
        expect(() => calculator.subtract(1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.subtract()).toThrow(ERR_INVALID_INPUT)
      })

      it('throws when too many args', () => {
        expect(() => calculator.subtract(3, 2, 1)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on boolean values', () => {
        expect(() => calculator.subtract(true, false)).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.subtract(true, 21)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on objects/arrays', () => {
        expect(() => calculator.subtract(['fat', 'cat'], ['cat'])).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.subtract({}, 21)).toThrow(ERR_INVALID_INPUT)
      })
    })

    // happy path & basic shapes
    it('subtracts two positive integers', () => {
      expect(calculator.subtract(2, 1)).toBe(1)
    })

    it('subtracts two negative integers', () => {
      expect(calculator.subtract(-1, -2)).toBe(1)
    })

    it('subtracts mixed signs', () => {
      expect(calculator.subtract(20, -10)).toBe(30)
      expect(calculator.subtract(-10, 10)).toBe(-20)
    })

    it('respects the subtractive identity (x - 0 = x)', () => {
      expect(calculator.subtract(42, 0)).toBe(42)
    })

    it('is not commutative (a - b !== b - a)', () => {
      expect(calculator.subtract(5, 7)).not.toBe(calculator.subtract(7, 5))
    })

    // floating point
    it('subtracts floats (with precision tolerance)', () => {
      expect(calculator.subtract(3.14, 2.03)).toBeCloseTo(1.11, 2)
    })
  })

  describe('divide', () => {
    const ERR_DIVIDE_BY_ZERO = 'cannot divide by zero'

    // invalid input policy
    describe('invalid input', () => {
      it('throws on non-numeric strings', () => {
        expect(() => calculator.divide('cattail', 'cat')).toThrow(
          ERR_INVALID_INPUT
        )
      })

      it('throws on numeric strings', () => {
        expect(() => calculator.divide('2', '1')).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.divide(2, '1')).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on null/undefined', () => {
        expect(() => calculator.divide(1, undefined)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.divide(null, 2)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on NaN or infinite values', () => {
        expect(() => calculator.divide(NaN, 1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.divide(Infinity, 1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.divide(-Infinity, 1)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws when too few args', () => {
        expect(() => calculator.divide(1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.divide()).toThrow(ERR_INVALID_INPUT)
      })

      it('throws when too many args', () => {
        expect(() => calculator.divide(3, 2, 1)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on boolean values', () => {
        expect(() => calculator.divide(true, false)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.divide(true, 21)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on objects/arrays', () => {
        expect(() => calculator.divide(['fat', 'cat'], ['cat'])).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.divide({}, 21)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on division by zero', () => {
        expect(() => calculator.divide(1, 0)).toThrow(ERR_DIVIDE_BY_ZERO)
      })

      it('throws on division by negative zero', () => {
        expect(() => calculator.divide(1, -0)).toThrow(ERR_DIVIDE_BY_ZERO)
      })
    })

    // happy path & basic shapes
    it('divides positive integers without remainders', () => {
      expect(calculator.divide(10, 2)).toBe(5)
    })

    it('divides positive integers with remainders', () => {
      expect(calculator.divide(3, 2)).toBe(1.5)
      expect(calculator.divide(1, 3)).toBeCloseTo(0.333, 3)
    })

    it('divides negative integers without remainders', () => {
      expect(calculator.divide(-100, -10)).toBe(10)
    })

    it('divides negative integers with remainders', () => {
      expect(calculator.divide(-2, -3)).toBeCloseTo(0.667, 3)
    })

    it('divides mixed signs without remainders', () => {
      expect(calculator.divide(2, -2)).toBe(-1)
      expect(calculator.divide(-10, 2)).toBe(-5)
    })

    it('divides mixed signs with remainders', () => {
      expect(calculator.divide(1, -3)).toBeCloseTo(-0.333, 3)
      expect(calculator.divide(-3, 2)).toBe(-1.5)
    })

    it('respects the multiplicative identity (x / 1 = x)', () => {
      expect(calculator.divide(42, 1)).toBe(42)
    })

    it('respects the multiplicative inverse (x / x = 1)', () => {
      expect(calculator.divide(2, 2)).toBe(1)
    })

    it('is not commutative (a / b !== b / a)', () => {
      expect(calculator.divide(5, 7)).not.toBe(calculator.divide(7, 5))
    })

    it('handles zero numerator (0 / x = 0)', () => {
      expect(calculator.divide(0, 1)).toBe(0)
    })

    // floating point
    it('divides floats (with precision tolerance)', () => {
      expect(calculator.divide(3.14, 2.03)).toBeCloseTo(1.55, 2)
      expect(calculator.divide(-3.14, 2.03)).toBeCloseTo(-1.55, 2)
    })
  })

  describe('multiply', () => {
    // invalid input policy
    describe('invalid input', () => {
      it('throws on non-numeric strings', () => {
        expect(() => calculator.multiply('cattail', 'cat')).toThrow(
          ERR_INVALID_INPUT
        )
      })

      it('throws on numeric strings', () => {
        expect(() => calculator.multiply('2', '1')).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.multiply(2, '1')).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on null/undefined', () => {
        expect(() => calculator.multiply(1, undefined)).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.multiply(null, 2)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on NaN or infinite values', () => {
        expect(() => calculator.multiply(NaN, 1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.multiply(Infinity, 1)).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.multiply(-Infinity, 1)).toThrow(
          ERR_INVALID_INPUT
        )
      })

      it('throws when too few args', () => {
        expect(() => calculator.multiply(1)).toThrow(ERR_INVALID_INPUT)
        expect(() => calculator.multiply()).toThrow(ERR_INVALID_INPUT)
      })

      it('throws when too many args', () => {
        expect(() => calculator.multiply(3, 2, 1)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on boolean values', () => {
        expect(() => calculator.multiply(true, false)).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.multiply(true, 21)).toThrow(ERR_INVALID_INPUT)
      })

      it('throws on objects/arrays', () => {
        expect(() => calculator.multiply(['fat', 'cat'], ['cat'])).toThrow(
          ERR_INVALID_INPUT
        )
        expect(() => calculator.multiply({}, 21)).toThrow(ERR_INVALID_INPUT)
      })
    })

    // happy path & basic shapes
    it('multiplies positive integers', () => {
      expect(calculator.multiply(1, 2)).toBe(2)
    })

    it('multiplies negative integers', () => {
      expect(calculator.multiply(-1, -2)).toBe(2)
    })

    it('multiplies mixed signs', () => {
      expect(calculator.multiply(-1, 2)).toBe(-2)
      expect(calculator.multiply(1, -2)).toBe(-2)
    })

    it('respects the multiplicative identity (x * 1 = x)', () => {
      expect(calculator.multiply(42, 1)).toBe(42)
    })

    it('respects the multiplicative inverse (x * 1/x = 1)', () => {
      expect(calculator.multiply(7, 1 / 7)).toBeCloseTo(1, 2)
    })

    it('is commutative (a * b === b * a)', () => {
      expect(calculator.multiply(5, 7)).toBe(calculator.multiply(7, 5))
      expect(calculator.multiply(-3, 4)).toBe(calculator.multiply(4, -3))
    })

    // floating point
    it('multiplies floats (with precision tolerance)', () => {
      expect(calculator.multiply(3.14, 2.03)).toBeCloseTo(6.3742, 2)
      expect(calculator.multiply(-3.14, 2.03)).toBeCloseTo(-6.3742, 2)
    })
  })
})
