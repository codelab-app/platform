import Ajv from 'ajv'
import { TypeSchemaFactory } from '../../interface-form/type-schema.factory'
import {
  interfaceWithUnionExpectedSchema,
  unionTypeExpectedSchema,
} from './schema.data'
import { interfaceWithUnionField, unionType } from './setup-store'

const ajv = new Ajv({ allErrors: true, useDefaults: true, strict: false })

describe('Type tree to json schema', () => {
  const transformer = new TypeSchemaFactory()

  it('should transform union type', () => {
    const jsonSchema = transformer.transform(unionType)

    expect(jsonSchema).toEqual(unionTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform interface with nested types', () => {
    const jsonSchema = transformer.transform(interfaceWithUnionField)

    expect(jsonSchema).toEqual(interfaceWithUnionExpectedSchema)

    ajv.compile(jsonSchema)
  })
})
