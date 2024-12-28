import { Validator } from '../validator/validator'
import { TAll } from './all.schema'

describe('All Schema', () => {
  it('should validate an array with at least one non-undefined value', () => {
    expect(Validator.validate(TAll, [1])).toBeTruthy()
    expect(Validator.validate(TAll, ['test', 2, true])).toBeTruthy()
  })

  it('should not validate an empty array', () => {
    expect(Validator.validate(TAll, [])).toBeFalsy()
  })

  it('should not validate an array containing undefined values', () => {
    expect(Validator.validate(TAll, [undefined])).toBeFalsy()
    expect(Validator.validate(TAll, [1, undefined, 'test'])).toBeFalsy()
  })
})
