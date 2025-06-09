import type { IUpdateBaseElementData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import { IElementRenderTypeKind } from '@codelab/shared-abstract-core'
import { SelectField } from 'uniforms-antd'
import {
  minLengthMsg,
  requiredMsg,
  titleCasePatternMsg,
} from '@codelab/frontend-shared-utils'
import { PropKeyField } from '../../components/PropKeyField'

export const updateElementSchema: JSONSchemaType<IUpdateBaseElementData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    tailwindClassNames: {
      nullable: true,
      type: 'array',
      items: {
        type: 'string',
      },
    },
    postRenderActions: {
      nullable: true,
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...idSchema({
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
            component: SelectField,
            label: 'Pre Render action',
          }),
        },
        required: [],
      },
    },
    childMapperComponent: {
      nullable: true,
      properties: {
        ...idSchema({
          disabled: false,
          label: 'Component',
          component: SelectField,
          extra:
            'The component to render based on the length of the data source',
        }),
      },
      required: [],
      type: 'object',
    },
    childMapperPreviousSibling: {
      nullable: true,
      properties: {
        ...idSchema({
          disabled: false,
          component: SelectField,
          label: 'Render next to',
          extra: 'Component instances will be rendered next to this element',
        }),
        // extra: 'testing testing testing',
      },
      required: [],
      type: 'object',
    },
    childMapperPropKey: {
      label: 'Prop Key',
      nullable: true,
      type: 'string',
      uniforms: {
        component: PropKeyField,
      },
      extra:
        'The key used to get the data from state e.g. `state.products`, `rootState.products`. Data source needs to be an array',
    },
    renderForEachPropKey: {
      label: 'Render for each',
      nullable: true,
      type: 'string',
    },
    renderIfExpression: {
      label: 'Render if',
      nullable: true,
      type: 'string',
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
    // renderType: {
    //   label: 'Render Type',
    //   properties: {
    //     id: {
    //       type: 'string',
    //     },
    //     __typename: {
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       enum: Object.values(IElementRenderTypeKind),
    //       nullable: true,
    //       label: 'Render Type',
    //       type: 'string',
    //     },
    //   },
    //   required: ['id'],
    //   type: 'object',
    // },
  },
  errors: {
    name: {
      required: requiredMsg('Element name'),
      minLength: minLengthMsg('Element name', 1),
      pattern: titleCasePatternMsg('Element name'),
    },
  },
  required: ['name', 'renderType'],
  title: 'Update Element Input',
  type: 'object',
} as const
