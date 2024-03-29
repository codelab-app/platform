import {
  interfaceTypeSchema,
  ITypeKind,
  primitiveTypeSchema,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import merge from 'lodash/merge'
import { extractUiSchema } from './extract-ui-schema'

interface DemoType {
  hiddenField: string
  visibleField: string
}

describe('extractUiSchema', () => {
  it('should extract ui:widget attributes into a uiSchema object', () => {
    const jsonSchema: JSONSchemaType<DemoType> = {
      properties: {
        hiddenField: {
          type: 'string',
          'ui:widget': 'hidden',
        },
        visibleField: {
          type: 'string',
        },
      },
      required: ['hiddenField', 'visibleField'],
      type: 'object',
    }

    const uiSchema = extractUiSchema(jsonSchema)

    expect(uiSchema).toEqual({
      hiddenField: {
        'ui:widget': 'hidden',
      },
    })
  })

  it('should return an empty object when no ui:widget attributes are present', () => {
    const jsonSchema = {
      properties: {
        hiddenField: {
          type: 'string',
        },
        visibleField: {
          type: 'string',
        },
      },
      required: ['hiddenField', 'visibleField'],
      type: 'object',
    } as const

    const uiSchema = extractUiSchema(jsonSchema)

    expect(uiSchema).toEqual({})
  })

  it('should throw an error if jsonSchema is null or undefined', () => {
    expect(() => extractUiSchema(null)).toThrow()
    expect(() => extractUiSchema(undefined)).toThrow()
  })

  it('should handle schemas with oneOf correctly', () => {
    const jsonSchema = {
      oneOf: [primitiveTypeSchema, interfaceTypeSchema],
      type: 'object',
    }

    const uiSchema = extractUiSchema(jsonSchema)

    expect(uiSchema).toEqual({
      __typename: { 'ui:widget': 'hidden' },
      id: { 'ui:widget': 'hidden' },
      kind: { 'ui:widget': 'hidden' },
    })
  })

  it('should handle dependencies with oneOf correctly', () => {
    const jsonSchema: JSONSchemaType<{ typeSelection: ITypeKind }> = {
      dependencies: {
        typeSelection: {
          oneOf: [
            merge({}, primitiveTypeSchema, {
              properties: {
                typeSelection: { enum: [ITypeKind.PrimitiveType] },
              },
            }),
            merge({}, interfaceTypeSchema, {
              properties: {
                typeSelection: { enum: [ITypeKind.InterfaceType] },
              },
            }),
          ],
        },
      },
      properties: {
        typeSelection: {
          default: ITypeKind.PrimitiveType,
          enum: Object.values(ITypeKind),
          title: 'Select Type',
          type: 'string',
        },
      },
      required: ['typeSelection'],
      type: 'object',
    }

    // Extract the uiSchema from the JSON schema
    const uiSchema = extractUiSchema(jsonSchema)

    // Define the expected UI schema based on the structure of your type schemas
    // The expected UI schema here is a placeholder - you'll need to replace it with the actual expected UI schema
    const expectedUiSchema = {
      __typename: {
        'ui:widget': 'hidden',
      },
      id: {
        'ui:widget': 'hidden',
      },
      kind: {
        'ui:widget': 'hidden',
      },
    }

    expect(uiSchema).toEqual(expectedUiSchema)
  })
})
