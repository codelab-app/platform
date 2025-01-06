import { v4 } from 'uuid'

import { TRef } from '../schema/ref'
import { Validator } from './validator.facade'

describe('Ref validation', () => {
  it('should validate with validation provider', () => {
    expect(Validator.validate(TRef, { id: 2 })).toBeFalsy()
    expect(Validator.validate(TRef, { id: v4() })).toBeTruthy()
  })

  it('should throw with assert', () => {
    expect(() => Validator.asserts(TRef, { id: 2 })).toThrow()
    expect(() => Validator.asserts(TRef, { id: v4() })).not.toThrow()
  })
})
