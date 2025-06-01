import type { IPageUpdateFormData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  appSchema,
  idSchema,
} from '@codelab/frontend-presentation-components-form/schema'
import { getSelectElementComponent } from '@codelab/frontend-presentation-components-interface-form'
import { IPageKind } from '@codelab/shared-abstract-core'
import { ElementTypeKind } from '@codelab/shared-infra-gqlgen'

import { UrlPatternField } from '../../components'

// pageContentContainer is not required in interface, but is required for _app page
export const schema = (kind: IPageKind): JSONSchemaType<IPageUpdateFormData> =>
  ({
    properties: {
      ...idSchema(),
      ...appSchema,
      name: { disabled: kind !== IPageKind.Regular, type: 'string' },
      pageContentContainer: {
        label: '',
        nullable: true,
        properties: {
          ...idSchema({
            label: 'Page Content Container',
            component: getSelectElementComponent(ElementTypeKind.AllElements),
          }),
        },
        required: ['id'],
        type: 'object',
      },
      urlPattern: {
        type: 'string',
        label: 'Deployed Page URL',
        help: 'Use / for "Home" page',
        uniforms: {
          component: UrlPatternField,
        },
      },
    },
    required: ['name', 'app'],
    type: 'object',
  } as const)
