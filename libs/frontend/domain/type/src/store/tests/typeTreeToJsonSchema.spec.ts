import Ajv from 'ajv'
import { TypeSchemaFactory } from '../../interface-form/type-schema.factory'
import {
  interfaceWithUnionExpectedSchema,
  interfaceWithUnionField,
  unionType,
  unionTypeExpectedSchema,
} from './typeTreeToJsonSchemaTestData'

const ajv = new Ajv({ allErrors: true, useDefaults: true, strict: false })

describe('Type tree to json schema', () => {
  const transformer = new TypeSchemaFactory()

  it('should transform union type', () => {
    const jsonSchema = transformer.transform(unionType)

    expect(jsonSchema).toEqual(unionTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform interface with nested types', function () {
    const jsonSchema = transformer.transform(interfaceWithUnionField)

    expect(jsonSchema).toEqual(interfaceWithUnionExpectedSchema)

    ajv.compile(jsonSchema)
  })
})
