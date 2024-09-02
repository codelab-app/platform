import { Validator } from '../validation/validator'
import { TNone } from './none.schema'

describe('None Schema', () => {
  it('should validate an empty array', () => {
    expect(Validator.validate(TNone, [])).toBeTruthy()
  })

  it('should validate an array with only undefined values', () => {
    expect(Validator.validate(TNone, [undefined, undefined])).toBeTruthy()
    expect(Validator.validate(TNone, [null, null])).toBeTruthy()
    expect(Validator.validate(TNone, [undefined, null])).toBeTruthy()
  })

  it('should not validate an array with any defined values', () => {
    expect(Validator.validate(TNone, [undefined, 'test'])).toBeFalsy()
    expect(Validator.validate(TNone, [1, undefined])).toBeFalsy()
    expect(Validator.validate(TNone, [true, null])).toBeFalsy()
  })
})
