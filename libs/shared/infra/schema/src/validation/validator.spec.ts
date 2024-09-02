import { TDefined } from '../schema'
import { Validator } from './validator'

describe('Validator', () => {
  it('should throw an error with the correct message for invalid values', () => {
    expect(() =>
      Validator.asserts(TDefined, undefined, { message: 'Should be defined!' }),
    ).toThrow('Should be defined!')
  })
})
