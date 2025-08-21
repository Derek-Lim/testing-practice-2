import caesarCipher from '../src/caesarCipher.js'

describe('caesarCipher', () => {
  // Invalid input policy
  describe('invalid input', () => {
    const INVALID_INPUT_ERROR = 'caesarCipher expects (string, integer)'

    describe('arity', () => {
      it('throws when no arguments', () => {
        expect(() => caesarCipher()).toThrow(INVALID_INPUT_ERROR)
      })

      it('throws when second argument missing', () => {
        expect(() => caesarCipher('abc')).toThrow(INVALID_INPUT_ERROR)
      })

      it('throws when too many arguments', () => {
        expect(() => caesarCipher('abc', 1, 2)).toThrow(INVALID_INPUT_ERROR)
      })
    })

    describe('first argument (string)', () => {
      it('throws when first argument is integer', () => {
        expect(() => caesarCipher(1, 2)).toThrow(INVALID_INPUT_ERROR)
      })

      it('throws when first argument is undefined/null', () => {
        expect(() => caesarCipher(undefined, 1)).toThrow(INVALID_INPUT_ERROR)
        expect(() => caesarCipher(null, 1)).toThrow(INVALID_INPUT_ERROR)
      })

      it('throws when first argument is object/array/boolean', () => {
        expect(() => caesarCipher([], 2)).toThrow(INVALID_INPUT_ERROR)
        expect(() => caesarCipher({}, 2)).toThrow(INVALID_INPUT_ERROR)
        expect(() => caesarCipher(true, 2)).toThrow(INVALID_INPUT_ERROR)
      })
    })

    describe('second argument (integer)', () => {
      it('throws when second argument is string', () => {
        expect(() => caesarCipher('abc', 'def')).toThrow(INVALID_INPUT_ERROR)
      })

      it('throws when second argument is NaN', () => {
        expect(() => caesarCipher('abc', NaN)).toThrow(INVALID_INPUT_ERROR)
      })

      it('throws when second argument is Infinity or -Infinity', () => {
        expect(() => caesarCipher('abc', Infinity)).toThrow(INVALID_INPUT_ERROR)
        expect(() => caesarCipher('abc', -Infinity)).toThrow(
          INVALID_INPUT_ERROR
        )
      })

      it('throws when second argument is decimal', () => {
        expect(() => caesarCipher('abc', 1.5)).toThrow(INVALID_INPUT_ERROR)
      })

      it('throws when second argument is undefined/null', () => {
        expect(() => caesarCipher('def', undefined)).toThrow(
          INVALID_INPUT_ERROR
        )
        expect(() => caesarCipher('abc', null)).toThrow(INVALID_INPUT_ERROR)
      })

      it('throws when second argument is object/array/boolean', () => {
        expect(() => caesarCipher(2, [])).toThrow(INVALID_INPUT_ERROR)
        expect(() => caesarCipher(2, {})).toThrow(INVALID_INPUT_ERROR)
        expect(() => caesarCipher(2, true)).toThrow(INVALID_INPUT_ERROR)
      })
    })
  })

  // Happy path and basic shapes
  describe('happy path and basic shapes', () => {
    describe('lowercase letters', () => {
      it('shifts one lowercase letter forward', () => {
        expect(caesarCipher('a', 1)).toBe('b')
      })

      it('shifts multiple lowercase letters forward', () => {
        expect(caesarCipher('abcdefg', 3)).toBe('defghij')
      })

      it('wraps one lowercase letter', () => {
        expect(caesarCipher('z', 1)).toBe('a')
      })

      it('wraps multiple lowercase letters', () => {
        expect(caesarCipher('xyz', 1)).toBe('yza')
        expect(caesarCipher('xyz', 3)).toBe('abc')
      })

      it('does not change one lowercase letter if shift is 0', () => {
        expect(caesarCipher('a', 0)).toBe('a')
      })

      it('supports negative shift on lowercase letter', () => {
        expect(caesarCipher('b', -1)).toBe('a')
      })

      it('wraps lowercase letter on negative shift', () => {
        expect(caesarCipher('a', -1)).toBe('z')
      })

      it('works if lowercase letter if shift is multiple of 26', () => {
        expect(caesarCipher('abc', 26)).toBe('abc')
        expect(caesarCipher('abc', -52)).toBe('abc')
      })
    })

    describe('uppercase letters', () => {
      it('shifts one uppercase letter forward', () => {
        expect(caesarCipher('A', 1)).toBe('B')
      })

      it('shifts multiple uppercase letters forward', () => {
        expect(caesarCipher('ABCDEFG', 3)).toBe('DEFGHIJ')
      })

      it('wraps one uppercase letter', () => {
        expect(caesarCipher('Z', 1)).toBe('A')
      })

      it('wraps multiple uppercase letters', () => {
        expect(caesarCipher('XYZ', 1)).toBe('YZA')
        expect(caesarCipher('XYZ', 3)).toBe('ABC')
      })

      it('does not change one uppercase letter if shift is 0', () => {
        expect(caesarCipher('X', 0)).toBe('X')
      })

      it('supports negative shift on uppercase letter', () => {
        expect(caesarCipher('B', -1)).toBe('A')
      })

      it('wraps uppercase letter on negative shift', () => {
        expect(caesarCipher('A', -1)).toBe('Z')
      })

      it('works if uppercase letter if shift is multiple of 26', () => {
        expect(caesarCipher('ABC', 26)).toBe('ABC')
        expect(caesarCipher('ABC', -52)).toBe('ABC')
      })
    })

    describe('non-letters', () => {
      it('leaves punctuation and spaces unchanged', () => {
        expect(caesarCipher('! & ?', 5)).toBe('! & ?')
      })

      it('leaves emojis unchanged', () => {
        expect(caesarCipher('😂', 20)).toBe('😂')
      })

      it('handles mixed case with punctuation', () => {
        expect(caesarCipher('Hello, World!😂', 3)).toBe('Khoor, Zruog!😂')
      })
    })

    it('returns empty string when given empty string', () => {
      expect(caesarCipher('', 5)).toBe('')
    })
  })

  // Sad path and advanced shapes
  describe('shift value more than 26 or less than -26', () => {
    it('handles shift more than 26 on lowercase letters', () => {
      expect(caesarCipher('xyz', 29)).toBe('abc')
    })

    it('handles negative shift less than -26 on lowercase letter', () => {
      expect(caesarCipher('a', -28)).toBe('y')
    })

    it('handles shift more than 26 on uppercase letter', () => {
      expect(caesarCipher('Z', 100)).toBe('V')
    })

    it('handles negative shift less than -26 on uppercase letter', () => {
      expect(caesarCipher('A', -28)).toBe('Y')
    })
  })
})
