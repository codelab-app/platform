import { getSelectElementComponent } from '@codelab/frontend/application/type'
import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import type { IUpdateComponentData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const updateComponentSchema: JSONSchemaType<IUpdateComponentData> = {
  properties: {
    ...idSchema(),
    childrenContainerElement: {
      label: '',
      properties: {
        ...idSchema(),
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
      type: 'string',
      autoFocus: true,
      ...titleCaseValidation,
    },
  },
  required: ['name', 'childrenContainerElement'],
  title: 'Update Component Input',
  type: 'object',
}
