import type { IUpdateComponentData } from '@codelab/frontend/abstract/core'
import { getSelectElementComponent } from '@codelab/frontend/domain/type'
import { idSchema, nonEmptyString } from '@codelab/frontend/view/components'
import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const updateComponentSchema: JSONSchemaType<IUpdateComponentData> = {
  properties: {
    ...idSchema,
    childrenContainerElement: {
      label: '',
      properties: {
        id: {
          label: 'Container for component children',
          type: 'string',
          uniforms: {
            component: getSelectElementComponent(ElementTypeKind.AllElements),
          },
        },
      },
      required: ['id'],
      type: 'object',
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
  },
  required: ['name', 'childrenContainerElement'],
  title: 'Update Component Input',
  type: 'object',
}
