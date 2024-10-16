import Ajv from 'ajv'

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
  richTextTypeExpectedSchema,
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
  richTextType,
  stringType,
  unionType,
} from './setup-store'

const ajv = new Ajv({ allErrors: true, strict: false, useDefaults: true })

describe('Type tree to json schema', () => {
  it('should transform AppType', () => {
    const jsonSchema = appType.toJsonSchema({})

    expect(jsonSchema).toEqual(appTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform PageType', () => {
    const jsonSchema = pageType.toJsonSchema({})

    expect(jsonSchema).toEqual(pageTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform RenderPropType', () => {
    const jsonSchema = renderPropType.toJsonSchema({})

    expect(jsonSchema).toEqual(renderPropTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform RichTextType', () => {
    const jsonSchema = richTextType.toJsonSchema({})

    expect(jsonSchema).toEqual(richTextTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform ActionType', () => {
    const jsonSchema = actionType.toJsonSchema({})

    expect(jsonSchema).toEqual(actionTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform UnionType', () => {
    const jsonSchema = unionType.toJsonSchema({})

    expect(jsonSchema).toEqual(unionTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform interface with nested types', () => {
    const jsonSchema = interfaceWithUnionField.toJsonSchema({})

    expect(jsonSchema).toEqual(interfaceWithUnionExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform string type', () => {
    const jsonSchema = stringType.toJsonSchema({})

    expect(jsonSchema).toEqual(stringTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform int type', () => {
    const jsonSchema = intType.toJsonSchema({})

    expect(jsonSchema).toEqual(intTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform boolean type', () => {
    const jsonSchema = booleanType.toJsonSchema({})

    expect(jsonSchema).toEqual(booleanTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform ReactNodeType', () => {
    const jsonSchema = reactNodeType.toJsonSchema({})

    expect(jsonSchema).toEqual(reactNodeTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform CodeMirrorType', () => {
    const jsonSchema = codeMirrorType.toJsonSchema({})

    expect(jsonSchema).toEqual(codeMirrorTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform ElementType', () => {
    const jsonSchema = elementType.toJsonSchema({})

    expect(jsonSchema).toEqual(elementTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform EnumType', () => {
    const jsonSchema = enumType.toJsonSchema({})

    expect(jsonSchema).toEqual(enumTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform ArrayType', () => {
    const jsonSchema = arrayType.toJsonSchema({})

    expect(jsonSchema).toEqual(arrayTypeExpectedSchema)

    ajv.compile(jsonSchema)
  })

  it('should transform InterfaceType with required and default field values', () => {
    const jsonSchema = interfaceWithRequiredAndDefaultFieldValues.toJsonSchema(
      {},
    )

    expect(jsonSchema).toEqual(
      interfaceWithRequiredDefaultFieldValuesExpectedSchema,
    )

    ajv.compile(jsonSchema)
  })
})
