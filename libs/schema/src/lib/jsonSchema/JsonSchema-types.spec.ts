import { JSONSchema7Definition } from 'json-schema'
import { getRef, isEnum, isRef } from './JsonSchema-types'

describe('Schema guards & helper methods', () => {
  const enumProperty: JSONSchema7Definition = {
    enum: ['boolean', 'string', 'number'],
  }
  const refProperty: JSONSchema7Definition = {
    type: 'array',
    items: {
      $ref: '#/definitions/prop',
    },
  }

  it('parses $ref', () => {
    expect(getRef(refProperty)).toBe('prop')
  })

  it('checks if property is enum type', () => {
    expect(isEnum(enumProperty)).toBeTruthy()
    expect(isEnum(refProperty)).toBeFalsy()
  })

  it('checks if property is ref type', () => {
    expect(isRef(refProperty)).toBeTruthy()
    expect(isRef(enumProperty)).toBeFalsy()
  })
})
