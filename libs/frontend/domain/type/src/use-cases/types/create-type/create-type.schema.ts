import {
  ElementTypeKind,
  ICreateTypeDTO,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/frontend/abstract/core'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
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
          key: { type: 'string' },
          value: { type: 'string' },
        },
        required: [
          // Does not submit for because ref not updated
          // 'id',
          'value',
        ],
      },
    },
    arrayTypeId: { type: 'string', nullable: true },
  },
  required: ['kind', 'name', 'auth0Id'],
}
