import { Validator } from '../validation/validation.service'
import { TExactlyOne } from './exactly-one.schema'

describe('ExactlyOne Schema', () => {
  it('should validate an array with exactly one non-undefined value', () => {
    expect(Validator.validate(TExactlyOne, [1])).toBe(true)
    expect(Validator.validate(TExactlyOne, ['test'])).toBe(true)
    expect(Validator.validate(TExactlyOne, [true])).toBe(true)
  })

  it('should not validate an empty array', () => {
    expect(Validator.validate(TExactlyOne, [])).toBe(false)
  })

  it('should not validate an array with more than one value', () => {
    expect(Validator.validate(TExactlyOne, [1, 2])).toBe(false)
    expect(Validator.validate(TExactlyOne, ['test', 'another'])).toBe(false)
  })

  it('should not validate an array with undefined value', () => {
    expect(Validator.validate(TExactlyOne, [undefined])).toBe(false)
  })

  it('should not validate an array with mixed defined and undefined values', () => {
    expect(Validator.validate(TExactlyOne, [1, undefined])).toBe(true)
  })
})
