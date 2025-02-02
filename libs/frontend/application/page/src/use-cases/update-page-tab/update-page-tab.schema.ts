import type { IPageUpdateFormData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

import { getSelectElementComponent } from '@codelab/frontend/presentation/components/interface-form'
import {
  appSchema,
  idSchema,
  pageUrlSchema,
} from '@codelab/frontend-presentation-components-form/schema'
import { IPageKind } from '@codelab/shared/abstract/core'
import { ElementTypeKind } from '@codelab/shared/infra/gqlgen'

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
      ...pageUrlSchema,
    },
    required: ['name', 'app'],
    type: 'object',
  }) as const
