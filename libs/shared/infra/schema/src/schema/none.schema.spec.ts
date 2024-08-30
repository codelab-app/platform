import { Validator } from '../validation/validation.service'
import { TNone } from './none.schema'

describe('None Schema', () => {
  it('should validate an empty array', () => {
    expect(Validator.validate(TNone, [])).toBe(true)
  })

  it('should validate an array with only undefined values', () => {
    expect(Validator.validate(TNone, [undefined, undefined])).toBe(true)
  })

  it('should not validate an array with any defined values', () => {
    expect(Validator.validate(TNone, [undefined, null])).toBe(false)
    expect(Validator.validate(TNone, [undefined, 'test'])).toBe(false)
    expect(Validator.validate(TNone, [1, undefined])).toBe(false)
  })
})
