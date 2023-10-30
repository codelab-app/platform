import Ajv from 'ajv'
import { TypeSchemaFactory } from '../type-schema.factory'
import { getUiProperties } from '../ui-properties'
import {
  actionTypeExpectedSchema,
  appTypeExpectedSchema,
  arrayTypeExpectedSchema,
  booleanTypeExpectedSchema,
  codeMirrorTypeExpectedSchema,
  elementTypeExpectedSchema,
  enumTypeExpectedSchema,
  interfaceWithRequiredDefaultFieldValuesExpectedSchema,
  interfaceWithUnionExpectedSchema,
  intTypeExpectedSchema,
  pageTypeExpectedSchema,
  reactNodeTypeExpectedSchema,
  renderPropTypeExpectedSchema,
  stringTypeExpectedSchema,
  unionTypeExpectedSchema,
} from './schema.data'
import {
  actionType,
  appType,
  arrayType,
  booleanType,
  codeMirrorType,
  elementType,
  enumType,
  interfaceWithRequiredAndDefaultFieldValues,
  interfaceWithUnionField,
  intType,
  pageType,
  reactNodeType,
  renderPropType,
  stringType,
  unionType,
} from './setup-store'

const ajv = new Ajv({ allErrors: true, strict: false, useDefaults: true })

describe('Type tree to json schema', () => {
  const transformer = new TypeSchemaFactory({
    extraProperties: getUiProperties,
  })

  it('should transform AppType', () => {
    const jsonSchema = transformer.transform(appType)

    expect(jsonSchema).toEqual(appTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform PageType', () => {
    const jsonSchema = transformer.transform(pageType)

    expect(jsonSchema).toEqual(pageTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform RenderPropType', () => {
    const jsonSchema = transformer.transform(renderPropType)

    expect(jsonSchema).toEqual(renderPropTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform ActionType', () => {
    const jsonSchema = transformer.transform(actionType)

    expect(jsonSchema).toEqual(actionTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform UnionType', () => {
    const jsonSchema = transformer.transform(unionType)

    expect(jsonSchema).toEqual(unionTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform interface with nested types', () => {
    const jsonSchema = transformer.transform(interfaceWithUnionField)

    expect(jsonSchema).toEqual(interfaceWithUnionExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform string type', () => {
    const jsonSchema = transformer.transform(stringType)

    expect(jsonSchema).toEqual(stringTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform int type', () => {
    const jsonSchema = transformer.transform(intType)

    expect(jsonSchema).toEqual(intTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform boolean type', () => {
    const jsonSchema = transformer.transform(booleanType)

    expect(jsonSchema).toEqual(booleanTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform ReactNodeType', () => {
    const jsonSchema = transformer.transform(reactNodeType)

    expect(jsonSchema).toEqual(reactNodeTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform CodeMirrorType', () => {
    const jsonSchema = transformer.transform(codeMirrorType)

    expect(jsonSchema).toEqual(codeMirrorTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform ElementType', () => {
    const jsonSchema = transformer.transform(elementType)

    expect(jsonSchema).toEqual(elementTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform EnumType', () => {
    const jsonSchema = transformer.transform(enumType)

    expect(jsonSchema).toEqual(enumTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform ArrayType', () => {
    const jsonSchema = transformer.transform(arrayType)

    expect(jsonSchema).toEqual(arrayTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform InterfaceType with required and default field values', () => {
    const jsonSchema = transformer.transform(
      interfaceWithRequiredAndDefaultFieldValues,
    )

    expect(jsonSchema).toEqual(
      interfaceWithRequiredDefaultFieldValuesExpectedSchema,
    )

    ajv.compile(jsonSchema)
  })
})
