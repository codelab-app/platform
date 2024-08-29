import { Typebox } from '@codelab/shared/abstract/typebox'
import { v4 } from 'uuid'
import { Validator } from './validation.service'

describe('Ref validation', () => {
  it('should validate with validation provider', () => {
    expect(Validator.validate(Typebox.TRef, { id: 2 })).toBeFalsy()
    expect(Validator.validate(Typebox.TRef, { id: v4() })).toBeTruthy()
  })

  it('should throw with assert', () => {
    expect(() => Validator.asserts(Typebox.TRef, { id: 2 })).toThrow()
    expect(() => Validator.asserts(Typebox.TRef, { id: v4() })).not.toThrow()
  })
})
