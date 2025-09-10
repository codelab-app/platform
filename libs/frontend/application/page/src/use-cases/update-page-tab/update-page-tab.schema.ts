import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { IPageUpdateFormData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'
import { IPageKind } from '@codelab/shared-abstract-core'
import { HiddenField, SelectField } from 'uniforms-antd'

import { UrlPatternField } from '../../components'

// pageContentContainer is not required in interface, but is required for _app page
export const schema = (
  kind: IPageKind,
  elements: Array<SelectOption>,
): JSONSchemaType<IPageUpdateFormData> =>
  ({
    properties: {
      ...idSchema,
      ...refSchema('app', 'App'),
      name: { disabled: kind !== IPageKind.Regular, type: 'string' },
      pageContentContainer: {
        label: '',
        nullable: true,
        properties: {
          id: {
            label: 'Page Content Container',
            type: 'string',
            uniforms: {
              component:
                kind === IPageKind.Provider ? SelectField : HiddenField,
              options: elements,
            },
          },
        },
        required: ['id'],
        type: 'object',
      },
      urlPattern: {
        type: 'string',
        label: 'Deployed Page URL',
        extra: 'Use / for "Home" page',
        uniforms: {
          component: UrlPatternField,
        },
      },
    },
    required: ['name', 'app'],
    type: 'object',
  } as const)
