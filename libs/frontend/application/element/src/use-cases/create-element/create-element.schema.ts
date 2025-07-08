'use client'

import type { IElementDto } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  minLengthMsg,
  requiredMsg,
  titleCasePatternMsg,
} from '@codelab/frontend/shared/utils'
import {
  idSchema,
  nonEmptyString,
  showFieldOnDev,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import { IElementRenderTypeKind } from '@codelab/shared-abstract-core'
import { SelectField } from 'uniforms-antd'

export type ICreateElementDto = Pick<
  IElementDto,
  | 'id'
  | 'name'
  | 'parentElement'
  | 'postRenderActions'
  | 'preRenderActions'
  | 'props'
  | 'renderType'
  | 'style'
  | 'tailwindClassNames'
>

export const createElementSchema: JSONSchemaType<ICreateElementDto> = {
  properties: {
    ...idSchema(),
    name: {
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    style: {
      nullable: true,
      type: 'string',
    },
    tailwindClassNames: {
      nullable: true,
      type: 'array',
      items: {
        type: 'string',
      },
    },
    parentElement: {
      nullable: true,
      properties: {
        ...idSchema({
          component: SelectField,
          disabled: false,
          label: 'Parent element',
        }),
      },
      required: ['id'],
      type: 'object',
    },
    postRenderActions: {
      nullable: true,
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...idSchema({
            disabled: false,
            component: SelectField,
            label: 'Post Render action',
          }),
        },
        required: [],
      },
    },
    preRenderActions: {
      nullable: true,
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...idSchema({
            disabled: false,
            component: SelectField,
            label: 'Pre Render action',
          }),
        },
        required: [],
      },
    },
    props: {
      label: '',
      properties: {
        ...idSchema(),
        api: {
          type: 'object',
          properties: {
            id: {
              disabled: true,
              type: 'string',
              ...showFieldOnDev(),
            },
          },
          required: ['id'],
          nullable: true,
        },
        data: {
          label: 'Props Data',
          type: 'string',
          // TODO: add json validation
        },
      },
      type: 'object',
      required: ['id'],
    },
    renderType: {
      label: 'Render Type',
      oneOf: [
        {
          properties: {
            id: {
              type: 'string',
            },
            __typename: {
              enum: [IElementRenderTypeKind.Component],
              type: 'string',
            },
          },
          required: ['id'],
          type: 'object',
        },
        {
          properties: {
            id: {
              type: 'string',
            },
            __typename: {
              enum: [IElementRenderTypeKind.Atom],
              type: 'string',
            },
          },
          required: ['id'],
          type: 'object',
        },
      ],
    },
  },
  errors: {
    name: {
      required: requiredMsg('Element name'),
      minLength: minLengthMsg('Element name', 1),
      pattern: titleCasePatternMsg('Element name'),
    },
  },
  required: ['name', 'id'],
  title: 'Create Element Input',
  type: 'object',
}
