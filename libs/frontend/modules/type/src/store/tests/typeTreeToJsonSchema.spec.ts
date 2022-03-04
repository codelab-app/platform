import Ajv from 'ajv'
import { objectMap } from 'mobx-keystone'
import { JsonSchemaTransformer } from '../JsonSchemaTransformer'
import { TypeModelAny } from '../models'
import { TypeStore } from '../typeStore'
import {
  interfaceWithUnionExpectedSchema,
  interfaceWithUnionField,
  intType,
  stringType,
  unionType,
  unionTypeExpectedSchema,
} from './typeTreeToJsonSchemaTestData'

const ajv = new Ajv({ allErrors: true, useDefaults: true, strict: false })

// Need a root store for references to be resolved
new TypeStore({
  types: objectMap([
    [unionType.id, unionType as TypeModelAny],
    [interfaceWithUnionField.id, interfaceWithUnionField],
    [intType.id, intType],
    [stringType.id, stringType],
  ]),
})

describe('Type tree to json schema', function () {
  const transformer = new JsonSchemaTransformer()

  it('should transform union type', function () {
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
