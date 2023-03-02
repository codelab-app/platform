import type { ICreateTypeDTO } from '@codelab/frontend/abstract/core'
import {
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import {
  IElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import { TypeSelect } from '../../../shared'

/**
 * We favor type safety over re-usability in this case
 *
 * https://github.com/ajv-validator/ajv/issues/1838
 */
export const createTypeSchema: JSONSchemaType<ICreateTypeDTO> = {
  title: 'Create Type Input',
  type: 'object',
  properties: {
    auth0Id: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
    id: {
      type: 'string',
      disabled: true,
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
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
          key: { type: 'string' },
          value: { type: 'string' },
        },
        required: [
          // Does not submit for because ref not updated
          // 'id',
          'key',
          'value',
        ],
      },
    },
    arrayTypeId: { type: 'string', nullable: true },
  },
  required: ['kind', 'name', 'auth0Id'],
}
