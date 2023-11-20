import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import {
  actionTypeSchema,
  appTypeSchema,
  arrayTypeSchema,
  codeMirrorTypeSchema,
  elementTypeSchema,
  enumTypeSchema,
  IElementTypeKind,
  interfaceTypeSchema,
  IPrimitiveTypeKind,
  ITypeKind,
  lambdaTypeSchema,
  pageTypeSchema,
  primitiveTypeSchema,
  reactNodeTypeSchema,
  renderPropTypeSchema,
  unionTypeSchema,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import merge from 'lodash/merge'

export const createRjsfTypeSchema: JSONSchemaType<{
  typeSelection: ITypeKind
}> = {
  type: 'object',
  properties: {
    typeSelection: {
      title: 'Select Type',
      type: 'string',
      enum: Object.values(ITypeKind),
      default: ITypeKind.PrimitiveType,
    },
  },
  dependencies: {
    typeSelection: {
      oneOf: [
        merge(primitiveTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.PrimitiveType] },
            primitiveKind: {
              enum: Object.values(IPrimitiveTypeKind),
              nullable: true,
              type: 'string',
              title: 'Primitive Kind',
            },
          },
        }),
        merge(interfaceTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.InterfaceType] },
          },
        }),
        merge(elementTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.ElementType] },
            elementKind: {
              title: 'Element Kind',
              type: 'string',
              enum: Object.values(IElementTypeKind),
            },
          },
        }),
        merge(unionTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.UnionType] },
          },
        }),
        merge(actionTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.ActionType] },
          },
        }),
        merge(appTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.AppType] },
          },
        }),
        merge(arrayTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.ArrayType] },
          },
        }),
        merge(lambdaTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.LambdaType] },
          },
        }),
        merge(pageTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.PageType] },
          },
        }),
        merge(reactNodeTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.ReactNodeType] },
          },
        }),
        merge(renderPropTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.RenderPropType] },
          },
        }),
        merge(codeMirrorTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.CodeMirrorType] },
            language: {
              title: 'Language',
              type: 'string',
              enum: Object.values(CodeMirrorLanguage),
            },
          },
        }),
        merge(enumTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.EnumType] },
            allowedValues: {
              title: 'Allowed Values',
              items: {
                properties: {
                  id: {
                    type: 'string',
                    uniforms: {
                      component: () => null,
                    },
                  },
                  key: { type: 'string' },
                  value: { type: 'string' },
                },
                required: [
                  // Does not submit for because ref not updated
                  // 'id',
                  'key',
                  'value',
                ],
                type: 'object',
              },
              nullable: true,
              type: 'array',
            },
          },
        }),
      ],
    },
  },
  required: ['typeSelection'],
}
