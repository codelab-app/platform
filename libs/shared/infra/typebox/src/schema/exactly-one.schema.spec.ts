import { Validator } from '../validation/validator.facade'
import { TExactlyOne } from './exactly-one.schema'

describe('ExactlyOne Schema', () => {
  it('should validate an array with exactly one non-undefined value', () => {
    expect(Validator.validate(TExactlyOne, [1])).toBeTruthy()
    expect(Validator.validate(TExactlyOne, ['test'])).toBeTruthy()
    expect(Validator.validate(TExactlyOne, [true])).toBeTruthy()
  })

  it('should not validate an empty array', () => {
    expect(Validator.validate(TExactlyOne, [])).toBeFalsy()
  })

  it('should not validate an array with more than one value', () => {
    expect(Validator.validate(TExactlyOne, [1, 2])).toBeFalsy()
    expect(Validator.validate(TExactlyOne, ['test', 'another'])).toBeFalsy()
  })

  it('should not validate an array with undefined value', () => {
    expect(Validator.validate(TExactlyOne, [undefined])).toBeFalsy()
  })

  it('should not validate an array with mixed defined and undefined values', () => {
    expect(Validator.validate(TExactlyOne, [1, undefined])).toBeTruthy()
  })
})
