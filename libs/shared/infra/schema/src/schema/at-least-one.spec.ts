import { Validator } from '../validation/validator'
import { TAtLeastOne } from './at-least-one.schema'

describe('Validator.validate', () => {
  it('should return true if array contains at least one truthy value', () => {
    expect(
      Validator.validate(TAtLeastOne, [false, '', null, undefined, 'test']),
    ).toBeTruthy()
    expect(Validator.validate(TAtLeastOne, [{}, false, ''])).toBeTruthy()
    expect(Validator.validate(TAtLeastOne, ['', true])).toBeTruthy()
    expect(Validator.validate(TAtLeastOne, [undefined, null])).toBeFalsy()
  })

  it('will read from any value, even false, null, or undefined', () => {
    expect(Validator.validate(TAtLeastOne, [false, '', null, undefined])).toBe(
      true,
    )
    expect(Validator.validate(TAtLeastOne, [])).toBeFalsy()
  })
})

describe('assertContainsAtLeastOne', () => {
  it('should not throw an error if array contains at least one truthy value', () => {
    expect(() =>
      Validator.asserts(TAtLeastOne, [false, '', null, 'test']),
    ).not.toThrow()
    expect(() => Validator.asserts(TAtLeastOne, [{}, false, ''])).not.toThrow()
  })

  it('should throw an error with custom message if provided', () => {
    const customMessage = 'Custom error message'

    expect(() =>
      Validator.asserts(TAtLeastOne, [], { message: customMessage }),
    ).toThrow(customMessage)
  })
})
