import { v4 } from 'uuid'
import { refValidation } from './ref.validation'

describe('Ref validation', () => {
  it('should validate with validation provider', () => {
    expect(refValidation.validate({ id: 2 })).toBeFalsy()
    expect(refValidation.validate({ id: v4() })).toBeTruthy()
  })

  it('should throw with assert', () => {
    expect(() => refValidation.asserts({ id: 2 })).toThrow()
    expect(() => refValidation.asserts({ id: v4() })).not.toThrow()
  })
})
