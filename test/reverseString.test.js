import reverseString from "../src/reverseString.js"

describe('reverseString', () => {
  // Happy path & basic shapes
  it('reverses a simple word', () => {
    expect(reverseString('cat')).toBe('tac')
  })

  it('reverses an all-caps word', () => {
    expect(reverseString('DOG')).toBe('GOD')
  })

  it('returns the same string for a single character', () => {
    expect(reverseString('a')).toBe('a')
  })

  it('returns the same string for a palindrome', () => {
    expect(reverseString('aba')).toBe('aba')
  })

  // Content variety
  describe('preserves non-letter content and spacing', () => {
    it('reverses punctuation', () => {
      expect(reverseString('!&?')).toBe('?&!')
    })

    it('reverses digits', () => {
      expect(reverseString('123')).toBe('321')
    })

    it('reverses a sentence with spaces and punctuation', () => {
      expect(reverseString('Hi there!')).toBe('!ereht iH')
    })

    it('preserves internal and leading/trailing whitespace', () => {
      expect(reverseString('c a t')).toBe('t a c')
      expect(reverseString('  cat  ')).toBe('  tac  ')
    })

    it('reverses standalone emoji (non-ZMJ)', () => {
      expect(reverseString('🙈🙉🙊')).toBe('🙊🙉🙈')
    })
  })

  // Internationalization sanity
  describe('Unicode letters', () => {
    it('reverses non-ASCII letters without alteration', () => {
      expect(reverseString('ña')).toBe('añ')
    })
  })

  // Error handling
  describe('invalid input', () => {
    const MSG = 'reverseString expects a string'

    it('throws on number', () => {
      expect(() => reverseString(123)).toThrow(MSG)
    })

    it('throws on null', () => {
      expect(() => reverseString(null)).toThrow(MSG)
    })
  })
})