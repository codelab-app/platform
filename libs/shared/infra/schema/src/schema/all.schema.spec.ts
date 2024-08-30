import { Validator } from '../validation/validation.service'
import { TAll } from './all.schema'

describe('All Schema', () => {
  it('should validate an array with at least one non-undefined value', () => {
    expect(Validator.validate(TAll, [1])).toBe(true)
    expect(Validator.validate(TAll, ['test', 2, true])).toBe(true)
  })

  it('should not validate an empty array', () => {
    expect(Validator.validate(TAll, [])).toBe(false)
  })

  it('should not validate an array containing undefined values', () => {
    expect(Validator.validate(TAll, [undefined])).toBe(false)
    expect(Validator.validate(TAll, [1, undefined, 'test'])).toBe(false)
  })
})
