import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import {
  ElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
  IUpdateTypeDTO,
} from '@codelab/shared/abstract/core'
import { hideField } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { TypeSelect } from '../../../shared'

export const updateTypeSchema: JSONSchemaType<IUpdateTypeDTO> = {
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
      enum: Object.values(ElementTypeKind),
    },
    language: {
      type: 'string',
      nullable: true,
      enum: Object.values(CodeMirrorLanguage),
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
          name: { type: 'string', nullable: true },
          value: { type: 'string' },
        },
        required: ['id', 'value'],
      },
    },
    arrayTypeId: { type: 'string', nullable: true },
  },
  required: ['name'],
}
