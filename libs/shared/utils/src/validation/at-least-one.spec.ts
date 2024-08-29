import {
  assertContainsAtLeastOne,
  containsAtLeastOne,
} from './at-least-one.validation'

describe('containsAtLeastOne', () => {
  it('should return true if array contains at least one truthy value', () => {
    expect(containsAtLeastOne([false, '', null, undefined, 'test'])).toBe(true)
    expect(containsAtLeastOne([{}, false, ''])).toBe(true)
    expect(containsAtLeastOne(['', true])).toBe(true)
  })

  it('will read from any value, even false, null, or undefined', () => {
    expect(containsAtLeastOne([false, '', null, undefined])).toBe(true)
    expect(containsAtLeastOne([])).toBe(false)
  })
})

describe('assertContainsAtLeastOne', () => {
  it('should not throw an error if array contains at least one truthy value', () => {
    expect(() =>
      assertContainsAtLeastOne([false, '', null, 'test']),
    ).not.toThrow()
    expect(() => assertContainsAtLeastOne([{}, false, ''])).not.toThrow()
  })

  it('should throw an error with custom message if provided', () => {
    const customMessage = 'Custom error message'

    expect(() =>
      assertContainsAtLeastOne([], { message: customMessage }),
    ).toThrow(customMessage)
  })
})
