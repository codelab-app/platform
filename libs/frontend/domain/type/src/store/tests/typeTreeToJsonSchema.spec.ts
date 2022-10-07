import Ajv from 'ajv'
import { objectMap } from 'mobx-keystone'
import { TypeSchemaFactory } from '../../interface-form/type-schema.factory'
import { AnyTypeModel } from '../models'
import { TypeService } from '../type.service'
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
new TypeService({
  types: objectMap([
    [unionType.id, unionType as AnyTypeModel],
    [interfaceWithUnionField.id, interfaceWithUnionField],
    [intType.id, intType],
    [stringType.id, stringType],
  ]),
})

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
