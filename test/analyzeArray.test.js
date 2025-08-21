import analyzeArray from '../src/analyzeArray.js'

describe('analyzeArray', () => {
  const INVALID_INPUT_ERROR = 'analyzeArray expects an array of numbers'
  // invalid input policy
  describe('invalid input', () => {
    describe('arity', () => {
      it('throws when no args', () => {
        expect(() => analyzeArray()).toThrow(INVALID_INPUT_ERROR)
      })
      it('throws when too many args', () => {
        expect(() => analyzeArray([1, 2, 3], [4, 5])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([1, 2], [3], [])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([1, 2, 3], true)).toThrow(INVALID_INPUT_ERROR)
      })
    })
  
    describe('non-array inputs', () => {
      it('throws on string', () => {
        expect(() => analyzeArray('cat')).toThrow(INVALID_INPUT_ERROR)
      })
    
      it('throws on number', () => {
        expect(() => analyzeArray(1)).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray(-1)).toThrow(INVALID_INPUT_ERROR)
      })
    
      it('throws on undefined/null', () => {
        expect(() => analyzeArray(undefined)).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray(null)).toThrow(INVALID_INPUT_ERROR)
      })
    
      it('throws on object', () => {
        expect(() => analyzeArray({})).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray({'num': 1})).toThrow(INVALID_INPUT_ERROR)
      })
    
      it('throws on boolean', () => {
        expect(() => analyzeArray(true)).toThrow(INVALID_INPUT_ERROR)
      })
    })
  
    describe('invalid array', () => {
      it('throws on empty array', () => {
        expect(() => analyzeArray([])).toThrow(INVALID_INPUT_ERROR)
      })
  
      it('throws when strings are in the array', () => {
        expect(() => analyzeArray(['cat'])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([1, '2'])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray(['', 2])).toThrow(INVALID_INPUT_ERROR)
      })
  
      it('throws when booleans are in the array', () => {
        expect(() => analyzeArray([true])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([1, false])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([true, 2])).toThrow(INVALID_INPUT_ERROR)
      })
  
      it('throws when undefined/null is in the array', () => {
        expect(() => analyzeArray([undefined])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([null])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([undefined, 2])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([1, null])).toThrow(INVALID_INPUT_ERROR)
      })
  
      it('throws when array/object is in the array', () => {
        expect(() => analyzeArray([[]])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([[1]])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([{}])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([{'num': 1}])).toThrow(INVALID_INPUT_ERROR)
      })
  
      it('throws when array contains Infinity or -Infinity', () => {
        expect(() => analyzeArray([Infinity])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([-Infinity])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([1, Infinity])).toThrow(INVALID_INPUT_ERROR)
      })
  
      it('throws when array contains NaN', () => {
        expect(() => analyzeArray([NaN])).toThrow(INVALID_INPUT_ERROR)
        expect(() => analyzeArray([1, NaN])).toThrow(INVALID_INPUT_ERROR)
      })
  
      it('throws on sparse arrays (holes)', () => {
        expect(() => analyzeArray([ , ])).toThrow(INVALID_INPUT_ERROR)
      })
    })
  })

  // happy path and basic shapes
  describe('happy path and basic shapes', () => {
    describe('array containing one number', () => {
      it('handles positive integer', () => {
        expect(analyzeArray([1])).toEqual(
          {
            average: 1,
            min: 1,
            max: 1,
            length: 1
          }
        )
      })
      
      it('handles zero', () => {
        expect(analyzeArray([0])).toEqual(
          {
            average: 0,
            min: 0,
            max: 0,
            length: 1
          }
        )
      })
    
      it('handles negative integer', () => {
        expect(analyzeArray([-2])).toEqual(
          {
            average: -2,
            min: -2,
            max: -2,
            length: 1
          }
        )
      })
  
      it('handles positive float', () => {
        expect(analyzeArray([3.14])).toEqual(
          {
            average: 3.14,
            min: 3.14,
            max: 3.14,
            length: 1
          }
        )
      })
  
      it('handles negative float', () => {
        expect(analyzeArray([-3.14])).toEqual(
          {
            average: -3.14,
            min: -3.14,
            max: -3.14,
            length: 1
          }
        )
      })
  
      it('handles super long float', () => {
        expect(analyzeArray([0.00000000000000001])).toEqual(
          {
            average: 0.00000000000000001,
            min: 0.00000000000000001,
            max: 0.00000000000000001,
            length: 1
          }
        )
      })
  
      it('handles super long negative float', () => {
        expect(analyzeArray([-0.00000000000000001])).toEqual(
          {
            average: -0.00000000000000001,
            min: -0.00000000000000001,
            max: -0.00000000000000001,
            length: 1
          }
        )
      })
    })
  
    describe('array containing multiple numbers; all metrics integers', () => {
      it('handles positive integers', () => {
        expect(analyzeArray([1,8,3,4,2,6])).toEqual(
          {
            average: 4,
            min: 1,
            max: 8,
            length: 6
          }
        )
      })
  
      it('handles negative integers', () => {
        expect(analyzeArray([-1,-8,-3,-4,-2,-6])).toEqual(
          {
            average: -4,
            min: -8,
            max: -1,
            length: 6
          }
        )
      })
  
      it('handles mixed integers', () => {
        expect(analyzeArray([2, -2, 4, -4])).toEqual(
          {
            average: 0,
            min: -4,
            max: 4,
            length: 4
          }
        )
      })
    })

    describe('array containing floats', () => {
      it('handles positive floats', () => {
        expect(analyzeArray([3.14, 4.13])).toEqual(
          {
            average: 3.635,
            min: 3.14,
            max: 4.13,
            length: 2
          }
        )
      })

      it('handles negative floats', () => {
        expect(analyzeArray([-3.14, -4.13])).toEqual(
          {
            average: -3.635,
            min: -4.13,
            max: -3.14,
            length: 2
          }
        )
      })

      it('handles mixed floats', () => {
        const r = analyzeArray([3.14, -4.13])

        expect(r.average).toBeCloseTo(-0.495, 10)
        expect(r.min).toBe(-4.13)
        expect(r.max).toBe(3.14)
        expect(r.length).toBe(2)
      })

      it('handles mixed floats mixed with integers', () => {
        const r = analyzeArray([3.14, 3, -4.13, -13])

        expect(r.average).toBeCloseTo(-2.7475, 10)
        expect(r.min).toBe(-13)
        expect(r.max).toBe(3.14)
        expect(r.length).toBe(4)
      })
    })
  })

  describe('unhappy path and advanced shapes', () => {
    it('normalizes -0 to 0 ', () => {
      expect(analyzeArray([-0])).toEqual(
        {
          average: 0,
          min: 0,
          max: 0,
          length: 1
        }
      )
    })
  })


})
