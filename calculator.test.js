import Calculator from './calculator.js'

describe('calculator', () => {
  let calculator
  const MSG = 'calculator expects two finite numbers'
  beforeEach(() => {
    calculator = Calculator()
  })

  describe('add', () => {
    // invalid input policy
    describe('invalid input', () => {
      it('throws on non-numeric strings', () => {
        expect(() => calculator.add('a', 'b')).toThrow(MSG)
      })

      it('throws on numeric strings', () => {
        expect(() => calculator.add('1', '2')).toThrow(MSG)
        expect(() => calculator.add(1, '2')).toThrow(MSG)
      })

      it('throws on null/undefined', () => {
        expect(() => calculator.add(null, 1)).toThrow(MSG)
        expect(() => calculator.add(1, undefined)).toThrow(MSG)
      })

      it('throws on NaN or infinite values', () => {
        expect(() => calculator.add(NaN, 1)).toThrow(MSG)
        expect(() => calculator.add(Infinity, 1)).toThrow(MSG)
        expect(() => calculator.add(-Infinity, 1)).toThrow(MSG)
      })

      it('throws on invalid argument length', () => {
        expect(() => calculator.add(1)).toThrow(MSG)
        expect(() => calculator.add()).toThrow(MSG)
      })

      it('throws when too many args', () => {
        expect(() => calculator.add(1, 2, 3)).toThrow(MSG)
      })

      it('throws on boolean values', () => {
        expect(() => calculator.add(true, false)).toThrow(MSG)
        expect(() => calculator.add(true, 21)).toThrow(MSG)
      })

      it('throws on objects/arrays', () => {
        expect(() => calculator.add(['fat', 'cat'], ['cat'])).toThrow(MSG)
        expect(() => calculator.add({}, 21)).toThrow(MSG)
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
        expect(() => calculator.subtract('cattail', 'cat')).toThrow(MSG)
      })

      it('throws on numeric strings', () => {
        expect(() => calculator.subtract('2', '1')).toThrow(MSG)
        expect(() => calculator.subtract(2, '1')).toThrow(MSG)
      })

      it('throws on null/undefined', () => {
        expect(() => calculator.subtract(1, undefined)).toThrow(MSG)
        expect(() => calculator.subtract(null, 2)).toThrow(MSG)
      })

      it('throws on NaN or infinite values', () => {
        expect(() => calculator.subtract(NaN, 1)).toThrow(MSG)
        expect(() => calculator.subtract(Infinity, 1)).toThrow(MSG)
        expect(() => calculator.subtract(-Infinity, 1)).toThrow(MSG)
      })

      it('throws when too few args', () => {
        expect(() => calculator.subtract(1)).toThrow(MSG)
        expect(() => calculator.subtract()).toThrow(MSG)
      })

      it('throws when too many args', () => {
        expect(() => calculator.subtract(3, 2, 1)).toThrow(MSG)
      })

      it('throws on boolean values', () => {
        expect(() => calculator.subtract(true, false)).toThrow(MSG)
        expect(() => calculator.subtract(true, 21)).toThrow(MSG)
      })

      it('throws on objects/arrays', () => {
        expect(() => calculator.subtract(['fat', 'cat'], ['cat'])).toThrow(MSG)
        expect(() => calculator.subtract({}, 21)).toThrow(MSG)
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
})