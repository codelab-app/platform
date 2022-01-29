import Ajv from 'ajv'
import { TypeTree } from '../TypeTree'
import {
  interfaceWithUnionExpectedSchema,
  interfaceWithUnionGraph,
  unionGraph,
  unionTypeExpectedSchema,
} from './typeTreeToJsonSchemaTestData'

const ajv = new Ajv({ allErrors: true, useDefaults: true, strict: false })

describe('Type tree to json schema', function () {
  it('should transform union type', function () {
    const tree = new TypeTree(unionGraph)
    const jsonSchema = tree.toJsonSchema()

    expect(jsonSchema).toEqual(unionTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform interface with nested types', function () {
    const tree = new TypeTree(interfaceWithUnionGraph)
    const jsonSchema = tree.toJsonSchema()

    expect(jsonSchema).toEqual(interfaceWithUnionExpectedSchema)

    ajv.compile(jsonSchema)
  })
})
