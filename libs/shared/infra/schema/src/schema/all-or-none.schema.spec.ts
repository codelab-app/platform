import { Validator } from '../validation/validation.service'
import { TAllOrNone } from './all-or-none.schema'

describe('AllOrNone Schema', () => {
  it('should validate an empty array', () => {
    expect(Validator.validate(TAllOrNone, [])).toBe(true)
  })

  it('should validate an array with all defined values', () => {
    expect(Validator.validate(TAllOrNone, [1, 'test', true])).toBe(true)
  })

  it('should not validate an array with mixed defined and undefined values', () => {
    expect(Validator.validate(TAllOrNone, [1, undefined, 'test'])).toBe(false)
  })

  it('should assert an array with all defined values', () => {
    expect(() =>
      Validator.asserts(TAllOrNone, [1, 'test', undefined]),
    ).toThrow()
  })
})
