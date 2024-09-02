import { Validator } from '../validation/validator'
import { TAtMostOne } from './at-most-one.schema'

describe('AtMostOne Schema', () => {
  it('should validate an empty array', () => {
    expect(Validator.validate(TAtMostOne, [])).toBeTruthy()
    expect(() => Validator.asserts(TAtMostOne, [])).not.toThrow()
  })

  it('should validate an array with one defined value', () => {
    expect(Validator.validate(TAtMostOne, [1])).toBeTruthy()
    expect(Validator.validate(TAtMostOne, ['test'])).toBeTruthy()
    expect(Validator.validate(TAtMostOne, [true])).toBeTruthy()
    expect(() => Validator.asserts(TAtMostOne, [1])).not.toThrow()
    expect(() => Validator.asserts(TAtMostOne, ['test'])).not.toThrow()
    expect(() => Validator.asserts(TAtMostOne, [true])).not.toThrow()
  })

  it('should validate an array with one defined value and undefined or null values', () => {
    expect(Validator.validate(TAtMostOne, [1, undefined, null])).toBeTruthy()
    expect(
      Validator.validate(TAtMostOne, [undefined, 'test', null]),
    ).toBeTruthy()
    expect(Validator.validate(TAtMostOne, [null, true, undefined])).toBeTruthy()
    expect(() =>
      Validator.asserts(TAtMostOne, [1, undefined, null]),
    ).not.toThrow()
    expect(() =>
      Validator.asserts(TAtMostOne, [undefined, 'test', null]),
    ).not.toThrow()
    expect(() =>
      Validator.asserts(TAtMostOne, [null, true, undefined]),
    ).not.toThrow()
  })

  it('should not validate an array with more than one defined value', () => {
    expect(Validator.validate(TAtMostOne, [1, 2])).toBeFalsy()
    expect(Validator.validate(TAtMostOne, ['test', true, 3])).toBeFalsy()
    expect(() =>
      Validator.asserts(TAtMostOne, [1, 2], {
        message: 'At most one',
      }),
    ).toThrow('At most one')
    expect(() => Validator.asserts(TAtMostOne, ['test', true, 3])).toThrow()
  })

  it('should validate an array with only undefined and null values', () => {
    expect(Validator.validate(TAtMostOne, [undefined, null, undefined])).toBe(
      true,
    )
    expect(Validator.validate(TAtMostOne, [null, undefined, null])).toBeTruthy()
    expect(() =>
      Validator.asserts(TAtMostOne, [undefined, null, undefined]),
    ).not.toThrow()
    expect(() =>
      Validator.asserts(TAtMostOne, [null, undefined, null]),
    ).not.toThrow()
  })
})
