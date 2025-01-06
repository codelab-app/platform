import { Validator } from '../validation/validator.facade'
import { TAllOrNone } from './all-or-none.schema'

describe('AllOrNone Schema', () => {
  it('should validate an empty array', () => {
    expect(Validator.validate(TAllOrNone, [])).toBeTruthy()
  })

  it('should validate an array with all defined values', () => {
    expect(Validator.validate(TAllOrNone, [1, 'test', true])).toBeTruthy()
  })

  it('should not validate an array with mixed defined and undefined values', () => {
    expect(Validator.validate(TAllOrNone, [1, undefined, 'test'])).toBeFalsy()
  })

  it('should not validate an array with mixed defined and null values', () => {
    expect(Validator.validate(TAllOrNone, [1, null, 'test'])).toBeFalsy()
  })

  it('should assert an array with all defined values', () => {
    expect(() =>
      Validator.asserts(TAllOrNone, [1, 'test', undefined]),
    ).toThrow()
  })

  it('should assert an array with null values', () => {
    expect(() => Validator.asserts(TAllOrNone, [1, 'test', null])).toThrow()
  })
})
