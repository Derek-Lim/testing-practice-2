import capitalize from './capitalize.js'

describe('capitalize', () => {
  it('capitalizes first character', () => {
    expect(capitalize('cat')).toBe('Cat')
  })

  it('leaves the rest unchanged', () => {
    expect(capitalize('cAt')).toBe('CAt')
  })

  it('handles empty strings', () => {
    expect(capitalize('')).toBe('')
  })

  it('handles single character inputs', () => {
    expect(capitalize('c')).toBe('C')
  })

  it('keeps already capitalized words as-is', () => {
    expect(capitalize('Cat')).toBe('Cat')
  })

  it('handles leading non-letter', () => {
    expect(capitalize(' cat')).toBe(' cat')
    expect(capitalize('1cat')).toBe('1cat')
    expect(capitalize('🐱cat')).toBe('🐱cat')
    expect(capitalize('!cat')).toBe('!cat')
    expect(capitalize('\tcat')).toBe('\tcat')
  })

  it('throws on invalid inputs', () => {
    expect(() => capitalize(123)).toThrow('capitalize expects a string')
    expect(() => capitalize(null)).toThrow('capitalize expects a string')
    expect(() => capitalize(undefined)).toThrow('capitalize expects a string')
    expect(() => capitalize([])).toThrow('capitalize expects a string')
    expect(() => capitalize({})).toThrow('capitalize expects a string')
    expect(() => capitalize(true)).toThrow('capitalize expects a string')
  })

  it('handles non-ASCII characters', () => {
    expect(capitalize('çat')).toBe('Çat')
    expect(capitalize('çÀŤ')).toBe('ÇÀŤ')
  })
})
