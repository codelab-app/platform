import { IUpdateTypeDTO } from '@codelab/frontend/abstract/core'
import {
  ICodeMirrorLanguage,
  IElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { hideField } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { TypeSelect } from '../../../shared'

export const updateTypeSchema: JSONSchemaType<
  Omit<IUpdateTypeDTO, 'defaultValue'>
> = {
  title: 'Update Type Input',
  type: 'object',
  properties: {
    // Base types
    id: {
      type: 'string',
      disabled: true,
    },
    interfaceDefaults: {
      nullable: true,
      type: 'object',
      ...hideField,
      required: [],
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
    kind: { type: 'string', enum: Object.values(ITypeKind) },
    unionTypeIds: {
      type: 'array',
      nullable: true,
      label: 'Types',
      isUnionTypeInput: true,
      items: {
        type: 'string',
        isUnionTypeInput: true,
      },
      uniforms: { component: TypeSelect, isUnionTypeInput: true },
    },
    primitiveKind: {
      type: 'string',
      nullable: true,
      enum: Object.values(IPrimitiveTypeKind),
    },
    elementKind: {
      type: 'string',
      nullable: true,
      enum: Object.values(IElementTypeKind),
    },
    language: {
      type: 'string',
      nullable: true,
      enum: Object.values(ICodeMirrorLanguage),
    },
    allowedValues: {
      type: 'array',
      nullable: true,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            nullable: true,
            uniforms: {
              component: () => null,
            },
          },
          key: { type: 'string' },
          value: { type: 'string' },
        },
        required: ['id', 'value'],
      },
    },
    arrayTypeId: { type: 'string', nullable: true },
  },
  required: ['name'],
}
