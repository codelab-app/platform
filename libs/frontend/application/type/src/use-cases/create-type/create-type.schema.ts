import type { ICreateTypeDto } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
} from '@codelab/frontend-presentation-components-form/schema'
import {
  IElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { CodeMirrorLanguage } from '@codelab/shared/infra/gql'

import { TypeSelect } from '../select-types/TypeSelect'

/**
 * We favor type safety over re-usability in this case
 *
 * https://github.com/ajv-validator/ajv/issues/1838
 */
export const createTypeSchema: JSONSchemaType<ICreateTypeDto> = {
  properties: {
    ...idSchema(),
    allowedValues: {
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
    arrayTypeId: { nullable: true, type: 'string' },
    elementKind: {
      enum: Object.values(IElementTypeKind),
      nullable: true,
      type: 'string',
    },
    kind: { enum: Object.values(ITypeKind), type: 'string' },
    language: {
      enum: Object.values(CodeMirrorLanguage),
      nullable: true,
      type: 'string',
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    primitiveKind: {
      enum: Object.values(IPrimitiveTypeKind),
      nullable: true,
      type: 'string',
    },
    unionTypeIds: {
      isUnionTypeInput: true,
      items: {
        isUnionTypeInput: true,
        type: 'string',
      },
      label: 'Types',
      nullable: true,
      type: 'array',
      uniforms: { component: TypeSelect, isUnionTypeInput: true },
    },
  },
  required: ['kind', 'name'],
  title: 'Create Type Input',
  type: 'object',
}
