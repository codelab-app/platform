import type { IUpdateComponentDTO } from '@codelab/frontend/abstract/core'
import { getSelectElementComponent } from '@codelab/frontend/domain/type'
import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const updateComponentSchema: JSONSchemaType<IUpdateComponentDTO> = {
  title: 'Update Component Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      type: 'string',
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
