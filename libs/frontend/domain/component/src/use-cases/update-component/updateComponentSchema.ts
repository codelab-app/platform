import type { IUpdateComponentData } from '@codelab/frontend/abstract/core'
import { getSelectElementComponent } from '@codelab/frontend/domain/type'
import { idSchema } from '@codelab/frontend/shared/domain'
import { nonEmptyString } from '@codelab/frontend/shared/utils'
import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const updateComponentSchema: JSONSchemaType<IUpdateComponentData> = {
  title: 'Update Component Input',
  type: 'object',
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    childrenContainerElementId: {
      type: 'string',
      label: 'Container for component children',
      uniforms: {
        component: getSelectElementComponent(ElementTypeKind.AllElements),
      },
    },
  },
  required: ['name', 'childrenContainerElementId'],
}
