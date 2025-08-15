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
    })
  })
})