import { Type } from '@sinclair/typebox'

import { TDefined } from '../schema'
import { Validator } from './validator.facade'

describe('Validator', () => {
  it('should throw an error with the correct message for invalid values', () => {
    expect(() =>
      Validator.asserts(TDefined, undefined, { message: 'Should be defined!' }),
    ).toThrow('Should be defined!')
  })

  it('should support custom validation through schema validate function', () => {
    // Create a schema with custom validation
    const EmailSchema = Type.String({
      format: 'email',
      validate: (value: string) => {
        return value.includes('@company.com')
      },
    })

    // Should pass for valid company email
    expect(() =>
      Validator.asserts(EmailSchema, 'test@company.com'),
    ).not.toThrow()

    // Should throw for non-company email
    expect(() =>
      Validator.asserts(EmailSchema, 'test@other.com', {
        message: 'Must be a company email',
      }),
    ).toThrow('Must be a company email')
  })
})
